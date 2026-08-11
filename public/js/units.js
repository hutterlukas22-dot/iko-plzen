/* IKO — units: marketplace filters, floor selector, unit-detail page, comparator, news filter. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var ST = { available: 'Volný', reserved: 'Rezervováno', sold: 'Prodáno' };
  function fmtPrice(n) { return n ? (Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Kč') : 'Cena na vyžádání'; }
  function areaTxt(a) { return String(a).replace('.', ',') + ' m²'; }
  function pill(s) { return '<span class="spill spill--' + s + '"><span class="dot"></span>' + (ST[s] || s) + '</span>'; }

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
    $$('[data-filter]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var g = btn.getAttribute('data-filter'); state[g] = btn.getAttribute('data-value');
        $$('[data-filter="' + g + '"]', root).forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected'); apply();
      });
    });
    var projSel = $('[data-filter-select="project"]', root);
    if (projSel) projSel.addEventListener('change', function () { state.project = projSel.value; apply(); });
    var aMin = $('[data-filter-min="area"]', root), aMax = $('[data-filter-max="area"]', root);
    if (aMin) aMin.addEventListener('input', function () { state.areaMin = aMin.value ? parseFloat(aMin.value) : null; apply(); });
    if (aMax) aMax.addEventListener('input', function () { state.areaMax = aMax.value ? parseFloat(aMax.value) : null; apply(); });
    var sortSel = $('[data-sort]', root);
    if (sortSel) sortSel.addEventListener('change', function () { state.sort = sortSel.value; apply(); });
    $$('[data-view-btn]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.view = btn.getAttribute('data-view-btn');
        $$('[data-view-btn]', root).forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active'); apply();
      });
    });
    var reset = $('[data-reset]', root);
    if (reset) reset.addEventListener('click', function () {
      state.project = 'vse'; state.disp = 'vse'; state.status = 'vse'; state.areaMin = null; state.areaMax = null; state.sort = 'num';
      $$('[data-filter]', root).forEach(function (b) { b.classList.toggle('is-selected', b.getAttribute('data-value') === 'vse'); });
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

  /* ---------- Unit detail page ---------- */
  (function () {
    var root = $('[data-unit-detail]'); if (!root) return;
    var id = new URLSearchParams(location.search).get('id');
    if (!UNITS[id]) id = Object.keys(UNITS)[0];
    var u = UNITS[id]; if (!u) return;
    window.__unitId = id;
    var set = function (sel, val) { var el = $(sel, root); if (el) el.textContent = val; };
    set('[data-ud-eyebrow]', u.project + (u.floor ? ' · ' + u.floor : ''));
    set('[data-ud-title]', u.label);
    set('[data-ud-crumb]', u.label);
    set('[data-ud-price]', fmtPrice(u.price));
    var st = $('[data-ud-status]', root); if (st) st.innerHTML = pill(u.status);
    var plan = $('[data-ud-plan]', root); if (plan) plan.src = rel(u.img);
    var planLink = $('[data-ud-plan-link]', root); if (planLink) planLink.href = rel(u.img);
    var ext = u.terrace ? 'Terasa' : u.balcony ? 'Balkon' : '—';
    var specs = [['Dispozice', u.disposition], ['Plocha', areaTxt(u.area)], ['Podlaží', u.floor || '—'], ['Orientace', u.orient || '—'],
      ['Parkování', u.parking ? 'Garážové stání' : '—'], ['Sklep', u.cellar ? 'Ano' : '—'], ['Venkovní prostor', ext], ['Typ', u.type || 'Byt']];
    var sp = $('[data-ud-specs]', root);
    if (sp) sp.innerHTML = specs.map(function (s) { return '<div class="c"><div class="k">' + s[0] + '</div><div class="v">' + s[1] + '</div></div>'; }).join('');
    var pl = $('[data-ud-project-link]', root);
    if (pl && u.projectSlug) { pl.href = rel('/projekty/') + u.projectSlug + '/'; pl.textContent = u.project; }
    var inq = rel('/kontakt/') + '?jednotka=' + encodeURIComponent(u.label);
    $$('[data-ud-inquire],[data-ud-inquire2]', root).forEach(function (a) { a.href = inq; if (u.status === 'sold') { a.classList.add('btn--secondary'); a.setAttribute('aria-disabled', 'true'); } });
    // visualizations
    var viz = $('[data-ud-viz]', root), projviz = {};
    try { projviz = JSON.parse($('[data-projviz]').textContent); } catch (e) {}
    var imgs = (projviz[u.projectSlug] || []).slice(0, 4);
    if (viz) viz.innerHTML = imgs.map(function (src, i) {
      var span = i === 0 ? 'g-span-4' : 'g-span-2';
      return '<figure class="' + span + '" data-full="' + rel(src) + '"><img src="' + rel(src) + '" alt="Vizualizace projektu ' + u.project + '" loading="lazy"></figure>';
    }).join('');
    // compare toggle
    var ct = $('[data-compare-toggle]', root); if (ct) { ct.setAttribute('data-id', id); ct.addEventListener('click', function () { toggleC(id); }); }
    document.title = u.label + ' — ' + u.project + ' — IKO';
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
