/* IKO — client interactions. Vanilla, progressive enhancement, reduced-motion aware. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- Smooth scroll (Lenis) ---- */
  if (!reduce && window.Lenis) {
    var lenis = new window.Lenis({ duration: 1.2, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ---- Header scroll state ---- */
  var header = $('[data-header]');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  var menu = $('[data-menu]');
  var openBtn = $('[data-menu-open]');
  var lastFocus = null;
  function openMenu() {
    if (!menu) return;
    lastFocus = document.activeElement;
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    var first = $('a, button', menu); if (first) first.focus();
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (openBtn) { openBtn.setAttribute('aria-expanded', 'false'); }
    if (lastFocus) lastFocus.focus();
  }
  if (openBtn) openBtn.addEventListener('click', openMenu);
  $$('[data-menu-close]').forEach(function (b) { b.addEventListener('click', closeMenu); });
  if (menu) $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (menu && menu.classList.contains('is-open')) closeMenu(); closeLightbox(); }
  });

  /* ---- Reveal on scroll ----
     Rect-based (works even when IntersectionObserver can't fire, e.g. a
     non-composited tab) + a safety timer so content is never stuck hidden. */
  var revealables = $$('[data-reveal], .reveal-media');
  function markIn(el) {
    if (el.classList.contains('is-in')) return;
    el.classList.add('is-in');
    $$('[data-count]', el).forEach(countUp);
    if (el.hasAttribute('data-count')) countUp(el);
  }
  if (reduce) {
    revealables.forEach(markIn);
  } else {
    var scan = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight || 800;
      revealables.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) markIn(el);
      });
    };
    scan();
    window.addEventListener('scroll', scan, { passive: true });
    window.addEventListener('resize', scan, { passive: true });
    window.addEventListener('load', scan);
    // Safety: reveal everything shortly after load no matter what.
    setTimeout(function () { revealables.forEach(markIn); }, 2200);
  }

  /* ---- Hero parallax ---- */
  var heroImg = $('[data-hero] .hero__media img, [data-hero] > img');
  if (heroImg && !reduce) {
    var ticking = false;
    var apply = function () {
      var y = window.scrollY;
      if (y < window.innerHeight) heroImg.style.transform = 'scale(1.06) translateY(' + (y * 0.12).toFixed(1) + 'px)';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(apply); ticking = true; }
    }, { passive: true });
  }

  /* ---- Count-up stats ---- */
  function countUp(el) {
    if (el.dataset.counted) return;
    var raw = el.textContent.trim();
    var m = raw.match(/[\d\s]*\d/);
    if (!m) return;
    var target = parseInt(m[0].replace(/\s/g, ''), 10);
    var suffix = raw.slice(m[0].length);
    if (isNaN(target)) return;
    el.dataset.counted = '1';
    if (reduce || target > 1900) { return; } // don't animate years
    var dur = 1100, start = null;
    function fmt(n) { return n.toLocaleString('cs-CZ').replace(/ /g, ' '); }
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---- Units filter ---- */
  $$('[data-units-root]').forEach(function (root) {
    var state = { layout: 'vse', status: 'vse' };
    var rows = $$('[data-unit]', root);
    var countEl = $('[data-units-count]', root);
    function update() {
      var shown = 0;
      rows.forEach(function (r) {
        var okL = state.layout === 'vse' || r.getAttribute('data-layout') === state.layout;
        var okS = state.status === 'vse' || r.getAttribute('data-status') === state.status;
        var show = okL && okS;
        r.style.display = show ? '' : 'none';
        if (show) shown++;
      });
      if (countEl) countEl.textContent = shown + ' ' + (shown === 1 ? 'dům' : (shown >= 2 && shown <= 4 ? 'domy' : 'domů'));
    }
    $$('[data-filter]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var type = btn.getAttribute('data-filter');
        state[type] = btn.getAttribute('data-value');
        $$('[data-filter="' + type + '"]', root).forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        update();
      });
    });
    update();
  });

  /* ---- Gallery lightbox ---- */
  var lb = $('#lightbox');
  var lbImg = lb ? $('img', lb) : null;
  var lbCount = lb ? $('.lightbox__count', lb) : null;
  var group = [], gi = 0;
  function openLightbox(items, index) {
    if (!lb) return;
    group = items; gi = index;
    render();
    lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }
  function render() {
    if (!group[gi]) return;
    lbImg.src = group[gi].src; lbImg.alt = group[gi].alt || '';
    if (lbCount) lbCount.textContent = (gi + 1) + ' / ' + group.length;
  }
  function closeLightbox() {
    if (!lb || !lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    lbImg.src = '';
  }
  function step(d) { if (!group.length) return; gi = (gi + d + group.length) % group.length; render(); }
  $$('[data-gallery]').forEach(function (g) {
    var figs = $$('figure[data-full]', g);
    var items = figs.map(function (f) { var im = $('img', f); return { src: f.getAttribute('data-full'), alt: im ? im.alt : '' }; });
    figs.forEach(function (f, i) {
      f.setAttribute('role', 'button'); f.setAttribute('tabindex', '0');
      f.addEventListener('click', function () { openLightbox(items, i); });
      f.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(items, i); } });
    });
  });
  if (lb) {
    $('.lightbox__close', lb).addEventListener('click', closeLightbox);
    $('.lightbox__nav--prev', lb).addEventListener('click', function () { step(-1); });
    $('.lightbox__nav--next', lb).addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  /* ---- Contact form (validation + real mailto compose; endpoint-ready) ---- */
  var EMAIL_TO = 'iko@ikoplzen.cz';
  $$('[data-contact-form]').forEach(function (form) {
    var fields = $('[data-form-fields]', form);
    var success = $('[data-form-success]', form);
    function setError(field, on) { field.classList.toggle('has-error', on); }
    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function validate() {
      var ok = true;
      $$('.field', form).forEach(function (field) {
        var input = $('.control', field);
        if (!input || !input.hasAttribute('required')) return;
        var v = (input.value || '').trim();
        var bad = !v || (input.type === 'email' && !validEmail(v));
        setError(field, bad);
        if (bad && ok) input.focus();
        if (bad) ok = false;
      });
      var consent = form.querySelector('input[name="consent"]');
      var consentErr = $('[data-consent-err]', form);
      if (consent && !consent.checked) { ok = false; if (consentErr) consentErr.style.display = 'block'; }
      else if (consentErr) consentErr.style.display = 'none';
      return ok;
    }
    function buildMailto() {
      var get = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var subject = 'Poptávka z webu — ' + (get('interest') || 'bydlení');
      var lines = [
        'Jméno: ' + get('firstName') + ' ' + get('lastName'),
        'E-mail: ' + get('email'),
        'Telefon: ' + (get('phone') || '—'),
        'Zajímá mě: ' + get('interest'),
        '', (get('message') || '')
      ];
      return 'mailto:' + EMAIL_TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    }
    // live-clear errors
    $$('.control', form).forEach(function (input) {
      input.addEventListener('input', function () { var f = input.closest('.field'); if (f) setError(f, false); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      var mailto = buildMailto();
      var link = $('[data-mail-link]', form);
      if (link) link.setAttribute('href', mailto);
      // Real action: open the user's mail client with a prefilled message.
      // To use a server endpoint instead, POST to form.action here and skip the mailto.
      try { window.location.href = mailto; } catch (err) {}
      if (fields) fields.setAttribute('hidden', '');
      if (success) success.removeAttribute('hidden');
      success && success.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
    var resetBtn = $('[data-form-reset]', form);
    if (resetBtn) resetBtn.addEventListener('click', function () {
      form.reset();
      if (success) success.setAttribute('hidden', '');
      if (fields) fields.removeAttribute('hidden');
      $$('.field', form).forEach(function (f) { setError(f, false); });
    });
  });
})();
