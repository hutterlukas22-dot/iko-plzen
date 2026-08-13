/* IKO — units: marketplace filters, floor selector, unit-detail page, comparator, news filter. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var ST = { available: 'Volný', reserved: 'Rezervováno', sold: 'Prodáno' };
  function fmtPrice(n) { return n ? (Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Kč') : 'Cena na vyžádání'; }
  function areaTxt(a) { return String(a).replace('.', ',') + ' m²'; }
  function pill(s) { return '<span class="spill spill--' + s + '"><span class="dot"></span>' + (ST[s] || s) + '</span>'; }
  // '3.NP' -> '2. patro' — mirrors floorLabel() in data/units.js
  function floorTxt(code) {
    var m = /^(\d)\.(NP|PP)$/.exec(code || '');
    if (!m) return code || '';
    if (m[2] === 'PP') return 'Suterén';
    return m[1] === '1' ? 'Přízemí' : (Number(m[1]) - 1) + '. patro';
  }
  // scale icon, mirrored from lib/util.js for the client-rendered cards
  var SCALE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>' +
    '<path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>';

  var brand = $('.brand[href]');
  var PREFIX = brand ? brand.getAttribute('href') : './';
  function rel(p) { return p && p.charAt(0) === '/' ? PREFIX + p.slice(1) : p; }
  function telHref() { var a = $('a[href^="tel:"]'); return a ? a.getAttribute('href') : 'tel:'; }
  function detailHref(id) { return rel('/jednotka/') + '?id=' + encodeURIComponent(id); }

  var UNITS = {};
  $$('script[type="application/json"][data-units]').forEach(function (s) {
    try { var o = JSON.parse(s.textContent); for (var k in o) UNITS[k] = o[k]; } catch (e) {}
  });

  /* ---------- Comparator (localStorage) ---------- */
  var CKEY = 'iko:compare';
  function getC() { try { return JSON.parse(localStorage.getItem(CKEY)) || []; } catch (e) { return []; } }
  function setC(a) { try { localStorage.setItem(CKEY, JSON.stringify(a)); } catch (e) {} updateCompareUI(); }
  function inC(id) { return getC().indexOf(id) >= 0; }
  function toggleC(id) { var a = getC(); var i = a.indexOf(id); if (i >= 0) a.splice(i, 1); else a.push(id); setC(a); return a.indexOf(id) >= 0; }
  // One delegated handler for every compare control on the page (rows, tiles,
  // detail). Cards are clickable, so stop the click reaching the stretched link.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-compare-toggle]');
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    var id = btn.getAttribute('data-id') || window.__unitId;
    if (id) toggleC(id);
  });

  function updateCompareUI() {
    var n = getC().length;
    $$('[data-compare-count]').forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
    $$('[data-compare-toggle]').forEach(function (btn) {
      var id = btn.getAttribute('data-id') || (window.__unitId || '');
      var on = inC(id);
      btn.classList.toggle('is-active', on);
      var lbl = $('[data-compare-label]', btn); if (lbl) lbl.textContent = on ? 'V porovnání' : 'Porovnat';
    });
    if (typeof renderCompare === 'function') renderCompare();
  }

  /* ---------- Marketplace ---------- */
  $$('[data-marketplace]').forEach(function (root) {
    var state = { project: 'vse', disp: 'vse', status: 'vse', areaMin: null, areaMax: null, sort: 'num', view: 'list' };
    var rowsBox = $('[data-rows]', root), tilesBox = $('[data-view-tiles]', root);
    var rows = $$('.urow', rowsBox), tiles = $$('.ucard', tilesBox);
    var listWrap = $('[data-view-list]', root), emptyEl = $('[data-empty]', root), countEl = $('[data-count]', root);
    rows.forEach(function (el, i) { el.dataset.i = i; }); tiles.forEach(function (el, i) { el.dataset.i = i; });
    // Controls may sit outside .mkt (projects page renders the filter bar in its
    // own blue section), so fall back to a document-wide lookup.
    var c1 = function (sel) { return $(sel, root) || $(sel); };
    var cA = function (sel) { var r = $$(sel, root); return r.length ? r : $$(sel); };
    function match(el) {
      var d = el.dataset;
      if (state.project !== 'vse' && d.project !== state.project) return false;
      if (state.disp !== 'vse' && d.disp !== state.disp) return false;
      if (state.status !== 'vse' && d.status !== state.status) return false;
      var a = parseFloat(d.area);
      if (state.areaMin != null && a < state.areaMin) return false;
      if (state.areaMax != null && a > state.areaMax) return false;
      return true;
    }
    function cmp(a, b) {
      var s = state.sort;
      if (s === 'price-asc') return (+a.dataset.price || 0) - (+b.dataset.price || 0);
      if (s === 'price-desc') return (+b.dataset.price || 0) - (+a.dataset.price || 0);
      if (s === 'area-asc') return (+a.dataset.area) - (+b.dataset.area);
      if (s === 'area-desc') return (+b.dataset.area) - (+a.dataset.area);
      return (+a.dataset.i) - (+b.dataset.i);
    }
    function apply() {
      var shown = 0;
      [[rows, rowsBox], [tiles, tilesBox]].forEach(function (pair) {
        pair[0].slice().sort(cmp).forEach(function (el) {
          var ok = match(el); el.style.display = ok ? '' : 'none'; if (pair[1] === rowsBox && ok) shown++; pair[1].appendChild(el);
        });
      });
      if (countEl) countEl.innerHTML = '<b>' + shown + '</b> ' + (shown === 1 ? 'jednotka' : (shown >= 2 && shown <= 4 ? 'jednotky' : 'jednotek'));
      if (emptyEl) emptyEl.hidden = shown !== 0;
      listWrap.style.display = (state.view === 'list' && shown) ? '' : 'none';
      tilesBox.style.display = (state.view === 'tiles' && shown) ? 'grid' : 'none';
    }
    cA('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var g = btn.getAttribute('data-filter'); state[g] = btn.getAttribute('data-value');
        cA('[data-filter="' + g + '"]').forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected'); apply();
      });
    });
    var projSel = c1('[data-filter-select="project"]');
    if (projSel) projSel.addEventListener('change', function () { state.project = projSel.value; apply(); });
    var aMin = c1('[data-filter-min="area"]'), aMax = c1('[data-filter-max="area"]');
    if (aMin) aMin.addEventListener('input', function () { state.areaMin = aMin.value ? parseFloat(aMin.value) : null; apply(); });
    if (aMax) aMax.addEventListener('input', function () { state.areaMax = aMax.value ? parseFloat(aMax.value) : null; apply(); });
    var sortSel = c1('[data-sort]');
    if (sortSel) sortSel.addEventListener('change', function () { state.sort = sortSel.value; apply(); });
    cA('[data-view-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.view = btn.getAttribute('data-view-btn');
        cA('[data-view-btn]').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active'); apply();
      });
    });
    var reset = c1('[data-reset]');
    if (reset) reset.addEventListener('click', function () {
      state.project = 'vse'; state.disp = 'vse'; state.status = 'vse'; state.areaMin = null; state.areaMax = null; state.sort = 'num';
      cA('[data-filter]').forEach(function (b) { b.classList.toggle('is-selected', b.getAttribute('data-value') === 'vse'); });
      if (projSel) projSel.value = 'vse'; if (aMin) aMin.value = ''; if (aMax) aMax.value = ''; if (sortSel) sortSel.value = 'num';
      apply();
    });
    apply();
  });

  /* ---------- Floor selector ---------- */
  $$('[data-floorsel]').forEach(function (root) {
    var data; try { data = JSON.parse($('[data-fsel-data]', root).textContent); } catch (e) { return; }
    var floorsBox = $('[data-fsel-floors]', root), stage = $('[data-fsel-stage]', root), bi = 0, fi = 0;
    function firstWithUnits(b) { var i = b.floors.findIndex(function (f) { return f.units.length; }); return i < 0 ? 0 : i; }
    function renderFloors() {
      var b = data[bi];
      floorsBox.innerHTML = b.floors.map(function (f, i) {
        return '<button class="fsel-floor' + (i === fi ? ' is-active' : '') + '"' + (f.units.length ? '' : ' disabled') + ' data-fi="' + i + '">' +
          '<span><span class="fsel-floor__code">' + f.code + '</span> <span class="fsel-floor__label">' + f.label + '</span></span>' +
          '<span class="fsel-floor__n">' + f.units.length + '</span></button>';
      }).join('');
    }
    function renderStage() {
      var f = data[bi].floors[fi];
      var units = f.units.slice().sort(function (a, b) { return a.num - b.num; });
      var html = '<a class="fsel-plan" href="' + rel(f.img) + '" target="_blank" rel="noopener" title="Zvětšit půdorys ' + f.code + '"><img src="' + rel(f.img) + '" alt="Půdorys ' + f.code + '" loading="lazy"></a>';
      if (units.length) {
        html += '<div class="fsel-units">' + units.map(function (u) {
          return '<a class="fsel-unit' + (u.status === 'sold' ? ' fsel-unit--sold' : '') + '" href="' + detailHref(u.id) + '">' +
            '<div class="fsel-unit__top"><span class="fsel-unit__disp">' + u.disposition + '</span><span class="spill spill--' + u.status + '"><span class="dot"></span></span></div>' +
            '<span class="fsel-unit__area">' + u.label + ' · ' + areaTxt(u.area) + '</span><span class="fsel-unit__price">' + fmtPrice(u.price) + '</span></a>';
        }).join('') + '</div>';
      } else { html += '<div class="fsel-empty">V tomto podlaží nejsou nabízené byty (parkování / sklepy).</div>'; }
      stage.innerHTML = html;
    }
    function sel(i) { if (!data[bi].floors[i].units.length) return; fi = i; renderFloors(); renderStage(); }
    floorsBox.addEventListener('click', function (e) { var b = e.target.closest('[data-fi]'); if (b && !b.disabled) sel(+b.getAttribute('data-fi')); });
    floorsBox.addEventListener('mouseover', function (e) { var b = e.target.closest('[data-fi]'); if (b && !b.disabled) sel(+b.getAttribute('data-fi')); });
    $$('[data-fsel-tabs] button', root).forEach(function (t) {
      t.addEventListener('click', function () {
        $$('[data-fsel-tabs] button', root).forEach(function (b) { b.classList.remove('is-active'); });
        t.classList.add('is-active'); bi = +t.getAttribute('data-building'); fi = firstWithUnits(data[bi]); renderFloors(); renderStage();
      });
    });
    fi = firstWithUnits(data[bi]); renderFloors(); renderStage();
  });

  /* ---------- Unit detail page ----------------------------------------------
     Renders the whole template from the unit record chosen by ?id, so the page
     works for any unit and drops sections it has no data for. ------------- */
  (function () {
    var root = $('[data-unit-detail]'); if (!root) return;
    var id = new URLSearchParams(location.search).get('id');
    if (!UNITS[id]) id = Object.keys(UNITS)[0];
    var u = UNITS[id]; if (!u) return;
    window.__unitId = id;

    var set = function (sel, val) { var el = $(sel); if (el) el.textContent = val; };
    var house = u.type === 'Dům';
    var ppm = (u.price && u.area) ? Math.round(u.price / u.area) : null;

    /* --- identity ------------------------------------------------------- */
    set('[data-ud-project-name]', u.project);
    set('[data-ud-title]', u.label);
    set('[data-ud-crumb]', u.label);
    set('[data-ud-price]', fmtPrice(u.price));
    set('[data-ud-ppm]', ppm ? fmtPrice(ppm) + ' / m²' : '');
    var sum = [u.disposition, areaTxt(u.area)];
    if (!house && u.floor) sum.push(floorTxt(u.floor));
    if (house && u.plot) sum.push('parcela ' + u.plot);
    set('[data-ud-summary]', sum.join('  ·  '));
    var st = $('[data-ud-status]'); if (st) st.innerHTML = pill(u.status);
    document.title = u.label + ' — ' + u.project + ' — IKO';

    /* --- facts bar: only what the unit actually has ---------------------- */
    var facts = [[areaTxt(u.area), 'Podlahová plocha'], [u.disposition, 'Dispozice']];
    if (!house && u.floor) facts.push([u.floor, 'Podlaží']);
    if (house && u.plot) facts.push([u.plot, 'Parcela']);
    if (u.terrace) facts.push(['Ano', 'Terasa']);
    if (u.balcony) facts.push(['Ano', 'Balkon']);
    if (u.garden) facts.push(['Ano', 'Předzahrádka']);
    if (u.parking) facts.push(['1×', 'Parkovací stání']);
    if (u.cellar) facts.push(['1×', 'Sklepní kóje']);
    if (u.orient) facts.push([u.orient, 'Orientace']);
    var fb = $('[data-ud-facts]');
    if (fb) fb.innerHTML = facts.map(function (f) { return '<li><b>' + f[0] + '</b><span>' + f[1] + '</span></li>'; }).join('');

    /* --- specification groups: skip anything the unit lacks -------------- */
    var groups = [
      ['Základní informace', [
        ['Jednotka', u.label], ['Dispozice', u.disposition], ['Podlahová plocha', areaTxt(u.area)],
        [house ? 'Parcela' : 'Podlaží', house ? u.plot : (u.floor ? u.floor + ' · ' + floorTxt(u.floor) : null)],
        ['Orientace', u.orient], ['Typ', u.type]
      ]],
      ['Venkovní prostor', [
        ['Terasa', u.terrace ? 'Ano' : null], ['Balkon', u.balcony ? 'Ano' : null],
        ['Předzahrádka', u.garden ? 'Ano' : null]
      ]],
      ['Parkování a sklep', [
        ['Parkovací stání', u.parking ? 'Ano' : null], ['Sklepní kóje', u.cellar ? 'Ano' : null],
        ['Výtah v domě', u.elevator ? 'Ano' : null]
      ]],
      ['Cena', [
        ['Cena celkem', fmtPrice(u.price)], ['Cena za m²', ppm ? fmtPrice(ppm) : null],
        ['Dostupnost', ST[u.status]]
      ]]
    ];
    var sp = $('[data-ud-spec]');
    if (sp) {
      sp.innerHTML = groups.map(function (g) {
        var rows = g[1].filter(function (r) { return r[1]; });
        if (!rows.length) return '';
        return '<div class="specg"><h3>' + g[0] + '</h3><dl>' + rows.map(function (r) {
          return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>';
        }).join('') + '</dl></div>';
      }).join('');
    }

    /* --- rooms ---------------------------------------------------------- */
    var rl = $('[data-ud-rooms]');
    if (rl) {
      if (u.rooms && u.rooms.length) {
        rl.innerHTML = u.rooms.map(function (r) {
          return '<li><span>' + r.name + '</span><b>' + areaTxt(r.area) + '</b></li>';
        }).join('');
      } else {
        var box = rl.closest('.ud-rooms'); if (box) box.hidden = true;
      }
    }

    /* --- plan ----------------------------------------------------------- */
    var plan = $('[data-ud-plan]');
    if (plan) { plan.src = rel(u.img); plan.alt = 'Půdorys jednotky ' + u.label + ' — ' + u.disposition + ', ' + areaTxt(u.area); }
    var planLink = $('[data-ud-plan-link]'); if (planLink) planLink.href = rel(u.img);

    /* --- project media -------------------------------------------------- */
    var media = {};
    try { media = JSON.parse($('[data-projmedia]').textContent)[u.projectSlug] || {}; } catch (e) {}
    var heroImg = $('[data-ud-hero]');
    if (heroImg && media.hero) { heroImg.src = rel(media.hero); heroImg.alt = 'Vizualizace interiéru — ' + u.project; }
    var living = $('[data-ud-living]');
    if (living && media.living) { living.src = rel(media.living); living.alt = media.livingAlt || ('Vizualizace — ' + u.project); }
    var gal = $('[data-ud-gallery]');
    if (gal && media.gallery && media.gallery.length) {
      gal.innerHTML = media.gallery.map(function (g, i) {
        return '<figure class="' + (i === 0 ? 'g-span-4' : 'g-span-2') + '" data-full="' + rel(g.src) + '">' +
          '<img src="' + rel(g.src) + '" alt="' + g.alt + '" loading="lazy"></figure>';
      }).join('');
    } else if (gal) { var gs = gal.closest('section'); if (gs) gs.hidden = true; }

    if (media.place) {
      set('[data-ud-place-name]', media.place.name);
      var pt = $('[data-ud-place-text]'); if (pt) pt.innerHTML = '<p>' + media.place.text + '</p>';
    }
    if (media.project) {
      set('[data-ud-proj-name]', media.project.name);
      set('[data-ud-proj-intro]', media.project.intro);
      var pimg = $('[data-ud-proj-img]');
      if (pimg) { pimg.src = rel(media.project.img); pimg.alt = 'Vizualizace projektu ' + media.project.name; }
    }

    /* --- links ---------------------------------------------------------- */
    $$('[data-ud-project-link],[data-ud-project-link2]').forEach(function (a) {
      if (!u.projectSlug) return;
      a.href = rel('/projekty/') + u.projectSlug + '/';
      if (a.hasAttribute('data-ud-project-link')) a.textContent = u.project;
    });
    var inq = rel('/kontakt/') + '?jednotka=' + encodeURIComponent(u.label);
    $$('[data-ud-inquire]').forEach(function (a) {
      a.href = inq;
      if (u.status !== 'sold') return;
      a.setAttribute('aria-disabled', 'true');
      // the sticky/mobile bars are narrow, so they get a short label
      var compact = a.closest('.ud-sticky') || a.closest('.ud-bar');
      a.textContent = compact ? 'Zeptat se' : 'Zeptat se na podobnou jednotku';
    });

    /* --- sticky header + mobile bar ------------------------------------- */
    var sub = u.disposition + ' · ' + areaTxt(u.area);
    set('[data-ud-sticky-name]', u.label); set('[data-ud-sticky-sub]', sub);
    set('[data-ud-sticky-price]', fmtPrice(u.price));
    set('[data-ud-bar-name]', u.label); set('[data-ud-bar-sub]', sub + ' · ' + fmtPrice(u.price));
    var sticky = $('[data-ud-sticky]'), bar = $('[data-ud-bar]'), heroEl = $('.ud-hero');
    function onScroll() {
      var past = heroEl ? (heroEl.getBoundingClientRect().bottom < 80) : window.scrollY > 400;
      if (sticky) sticky.classList.toggle('is-on', past);
      if (bar) bar.classList.toggle('is-on', past);
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    /* --- financing ------------------------------------------------------- */
    (function () {
      var fin = $('[data-fin]'); if (!fin || !u.price) return;
      var own = $('[data-fin-own]', fin), yrs = $('[data-fin-years]', fin), rate = $('[data-fin-rate]', fin);
      function calc() {
        var o = +own.value, y = +yrs.value, r = +rate.value;
        var down = Math.round(u.price * o / 100), loan = u.price - down;
        var i = r / 100 / 12, n = y * 12;
        var m = i > 0 ? loan * i / (1 - Math.pow(1 + i, -n)) : loan / n;
        $('[data-fin-own-out]', fin).textContent = o + ' %';
        $('[data-fin-own-abs]', fin).textContent = fmtPrice(down);
        $('[data-fin-years-out]', fin).textContent = y + ' let';
        $('[data-fin-rate-out]', fin).textContent = r.toFixed(1).replace('.', ',') + ' %';
        $('[data-fin-monthly]', fin).textContent = fmtPrice(Math.round(m));
        $('[data-fin-price]', fin).textContent = fmtPrice(u.price);
        $('[data-fin-own2]', fin).textContent = fmtPrice(down);
        $('[data-fin-loan]', fin).textContent = fmtPrice(loan);
        $('[data-fin-interest]', fin).textContent = fmtPrice(Math.round(m * n - loan));
      }
      [own, yrs, rate].forEach(function (el) { el.addEventListener('input', calc); });
      calc();
      var res = 100000, sosb = Math.round(u.price * 0.2);
      set('[data-pay-1]', fmtPrice(res));
      set('[data-pay-2]', fmtPrice(sosb - res > 0 ? sosb - res : sosb));
      set('[data-pay-3]', fmtPrice(u.price - sosb));
    })();

    /* --- similar units --------------------------------------------------- */
    (function () {
      var wrap = $('[data-ud-similar-wrap]'), box = $('[data-ud-similar]');
      if (!wrap || !box) return;
      var sim = Object.keys(UNITS).filter(function (k) {
        return k !== id && UNITS[k].projectSlug === u.projectSlug && UNITS[k].status === 'available';
      }).sort(function (a, b) {
        return Math.abs(UNITS[a].area - u.area) - Math.abs(UNITS[b].area - u.area);
      }).slice(0, 3);
      if (!sim.length) return;
      wrap.hidden = false;
      box.innerHTML = sim.map(function (k) {
        var s = UNITS[k], sppm = (s.price && s.area) ? Math.round(s.price / s.area) : null;
        return '<div class="ucard">' +
          '<a class="ucard__link" href="' + detailHref(k) + '" aria-label="Detail — ' + s.label + '"></a>' +
          '<div class="ucard__media"><span class="badge badge--' + s.status + ' badge--onmedia"><span class="dot"></span>' + ST[s.status] + '</span>' +
          '<button type="button" class="ucmp ucmp--onmedia" data-compare-toggle data-id="' + k + '" aria-label="Přidat ' + s.label + ' do porovnání" title="Přidat do porovnání">' + SCALE_SVG + '</button>' +
          '<img src="' + rel(s.img) + '" alt="Půdorys ' + s.label + '" loading="lazy"><span class="ucard__disp">' + s.disposition + '</span></div>' +
          '<div class="ucard__body"><div class="ucard__head"><span class="ucard__name">' + s.label + '</span>' +
          '<span class="ucard__project">' + s.project + '</span></div>' +
          '<dl class="ucard__facts"><div><dt>Plocha</dt><dd>' + areaTxt(s.area) + '</dd></div>' +
          '<div><dt>' + (s.type === 'Dům' ? 'Parcela' : 'Podlaží') + '</dt><dd>' + (s.type === 'Dům' ? (s.plot || '—') : (s.floor || '—')) + '</dd></div>' +
          '<div><dt>Cena / m²</dt><dd>' + (sppm ? fmtPrice(sppm) : '—') + '</dd></div></dl>' +
          '<div class="ucard__foot"><span class="ucard__price-wrap"><span class="ucard__ppm">Cena celkem</span>' +
          '<span class="ucard__price">' + fmtPrice(s.price) + '</span></span>' +
          '<span class="ucard__cta">Mám zájem</span></div></div></div>';
      }).join('');
    })();

    /* --- enquiry form carries the unit ----------------------------------- */
    var ctx = $('[data-form-ctx]');
    if (ctx) {
      var ci = $('[data-form-ctx-img]', ctx);
      if (ci) { ci.src = rel(u.img); ci.alt = 'Půdorys ' + u.label; }
      set('[data-form-ctx-name]', u.label + ' · ' + u.project);
      set('[data-form-ctx-sub]', sub + (u.floor ? ' · ' + u.floor : '') + ' · ' + fmtPrice(u.price));
      var fu = $('[data-form-unit]');
      if (fu) fu.value = u.label + ' (' + u.project + ', ' + u.disposition + ', ' + areaTxt(u.area) + ') — ID ' + id;
      var fuu = $('[data-form-unit-url]'); if (fuu) fuu.value = location.href;
    }

    /* --- assigned salesperson -------------------------------------------- */
    var agentBox = $('[data-ud-agent]'), agents = {};
    try { agents = JSON.parse($('[data-agents]').textContent); } catch (e) {}
    if (agentBox && agents[u.projectSlug]) agentBox.innerHTML = agents[u.projectSlug];

    // compare toggle — clicks handled by the delegated listener
    var ct = $('[data-compare-toggle]', root); if (ct) ct.setAttribute('data-id', id);
  })();

  /* ---------- Compare page ---------- */
  var renderCompare = null;
  (function () {
    var root = $('[data-compare-root]'); if (!root) return;
    var fields = [['Projekt', function (u) { return u.project; }], ['Dispozice', function (u) { return u.disposition; }],
      ['Plocha', function (u) { return areaTxt(u.area); }], ['Podlaží', function (u) { return u.floor || '—'; }],
      ['Orientace', function (u) { return u.orient || '—'; }], ['Parkování', function (u) { return u.parking ? 'Ano' : '—'; }],
      ['Sklep', function (u) { return u.cellar ? 'Ano' : '—'; }], ['Stav', function (u) { return pill(u.status); }],
      ['Cena', function (u) { return '<strong style="color:var(--iko-blue)">' + fmtPrice(u.price) + '</strong>'; }]];
    renderCompare = function () {
      var ids = getC().filter(function (id) { return UNITS[id]; });
      if (!ids.length) {
        root.innerHTML = '<div class="empty" style="border:1px dashed var(--border-default);border-radius:var(--radius-lg);padding:3rem 1rem">' +
          'Zatím nemáte nic k porovnání. Na detailu jednotky klikněte na <strong>Porovnat</strong>.</div>';
        return;
      }
      var html = '<div class="cmp-wrap"><table class="cmp"><thead><tr><th></th>' + ids.map(function (id) {
        var u = UNITS[id];
        return '<th><a href="' + detailHref(id) + '" class="cmp-plan"><img src="' + rel(u.img) + '" alt="' + u.label + '"></a>' +
          '<div class="cmp-name">' + u.label + '</div><button class="cmp-remove" data-remove="' + id + '">Odebrat</button></th>';
      }).join('') + '</tr></thead><tbody>';
      fields.forEach(function (f) {
        html += '<tr><th>' + f[0] + '</th>' + ids.map(function (id) { return '<td>' + f[1](UNITS[id]) + '</td>'; }).join('') + '</tr>';
      });
      html += '</tbody></table></div>';
      root.innerHTML = html;
      $$('[data-remove]', root).forEach(function (b) { b.addEventListener('click', function () { toggleC(b.getAttribute('data-remove')); }); });
    };
    renderCompare();
  })();

  /* ---------- News category filter ---------- */
  $$('[data-news-root]').forEach(function (root) {
    var cards = $$('.ncard', root), empty = $('[data-news-empty]', root);
    $$('[data-news-filter]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-value');
        $$('[data-news-filter]', root).forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        var shown = 0;
        cards.forEach(function (c) { var ok = v === 'vse' || c.getAttribute('data-cat') === v; c.style.display = ok ? '' : 'none'; if (ok) shown++; });
        if (empty) empty.hidden = shown !== 0;
      });
    });
  });

  updateCompareUI();
})();
