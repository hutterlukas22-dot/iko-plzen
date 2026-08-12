import { esc, icon } from './lib/util.js';
import { site } from './data/site.js';

/* ---------- Document shell ---------------------------------------------- */
export function layout({ title, description, path = '/', body, ogImage = '/projects/slovanske-udoli-06-lg.jpg', jsonLd = '' }) {
  const canonical = site.url.replace(/\/$/, '') + path;
  const fullTitle = title ? `${title} — IKO stavby s.r.o.` : 'IKO stavby s.r.o. — developer a stavební firma z Plzně';
  return `<!doctype html>
<html lang="cs" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta name="theme-color" content="#005EAA">
<meta property="og:type" content="website">
<meta property="og:site_name" content="IKO stavby s.r.o.">
<meta property="og:locale" content="cs_CZ">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(site.url.replace(/\/$/, '') + ogImage)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" as="font" type="font/otf" href="/fonts/Pepi-Bold.otf" crossorigin>
<link rel="stylesheet" href="/css/site.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@5.0.0-beta.16/dist/locomotive-scroll.css">
<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@5.0.0-beta.16/dist/locomotive-scroll.umd.js"></script>
<script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');</script>
${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ''}
</head>
<body>
<a href="#main" class="skip-link">Přeskočit na obsah</a>
${header(path)}
${mobileMenu(path)}
<main id="main">
${body}
</main>
${footer()}
<div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-label="Galerie">
  <button class="lightbox__close" aria-label="Zavřít">${icon('x')}</button>
  <button class="lightbox__nav lightbox__nav--prev" aria-label="Předchozí">${icon('arrow-left')}</button>
  <img src="" alt="">
  <button class="lightbox__nav lightbox__nav--next" aria-label="Další">${icon('arrow-right')}</button>
  <div class="lightbox__count"></div>
</div>
<script src="/js/app.js" defer></script>
<script src="/js/units.js" defer></script>
</body>
</html>`;
}

/* ---------- Brand logo (official SVG) ----------------------------------- */
export const wordmark = () =>
  `<a href="/" class="brand" aria-label="IKO — Váš nový soused, domů"><img src="/img/iko-logo-claim.svg" alt="IKO — Váš nový soused" width="180" height="42"></a>`;

/* ---------- Header ------------------------------------------------------ */
function header(path) {
  const links = site.nav
    .map((n) => `<a href="${n.href}"${isActive(path, n.href) ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`)
    .join('');
  return `<header class="header" data-header>
  <div class="header__inner">
    ${wordmark()}
    <nav class="nav" aria-label="Hlavní navigace">${links}</nav>
    <a class="header__compare" href="/porovnat/" aria-label="Porovnávač jednotek" title="Porovnávač jednotek">
      ${icon('scale')}<span class="header__compare-count" data-compare-count hidden>0</span>
    </a>
    <a class="btn btn--primary btn--sm header__cta" href="/projekty/">Volné jednotky</a>
    <button class="burger" data-menu-open aria-label="Otevřít menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;
}

function mobileMenu(path) {
  const links = site.nav
    .map((n) => `<a href="${n.href}"${isActive(path, n.href) ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`)
    .join('');
  return `<div class="mobile-menu" id="mobile-menu" data-menu>
  <div class="mobile-menu__top">
    ${wordmark('white')}
    <button class="mobile-menu__close" data-menu-close aria-label="Zavřít menu">${icon('x')}</button>
  </div>
  <nav aria-label="Mobilní navigace"><a href="/"${path === '/' ? ' aria-current="page"' : ''}>Domů</a>${links}</nav>
  <div class="mobile-menu__foot">
    <a href="/porovnat/">Porovnávač jednotek</a>
    <a href="tel:${site.contact.phoneHref}">${esc(site.contact.phone)}</a>
    <a href="mailto:${site.contact.email}">${esc(site.contact.email)}</a>
  </div>
</div>`;
}

function isActive(path, href) {
  if (href === '/') return path === '/';
  return path.startsWith(href);
}

/* ---------- Footer ------------------------------------------------------ */
function footer() {
  const c = site.contact;
  return `${tape({ blue: true })}
<footer class="footer">
  <div class="container footer__main">
    <div>
      ${wordmark('white')}
      <p>${esc(site.description)}</p>
    </div>
    <div>
      <h4>Projekty</h4>
      <ul>
        <li><a href="/projekty/rezidence-slovanske-udoli/">Slovanské údolí</a></li>
        <li><a href="/projekty/bytovy-dum-cukrovarska/">Cukrovarská</a></li>
        <li><a href="/projekty/radobycice-brizova/">Radobyčice — Břízová</a></li>
        <li><a href="/projekty/">Všechny projekty</a></li>
      </ul>
    </div>
    <div>
      <h4>Společnost</h4>
      <ul>
        <li><a href="/o-nas/">O nás</a></li>
        <li><a href="/sluzby/">Služby</a></li>
        <li><a href="/kariera/">Kariéra</a></li>
        <li><a href="/kontakt/">Kontakt</a></li>
      </ul>
    </div>
    <div>
      <h4>Kontakt</h4>
      <ul>
        <li>${esc(c.company)}</li>
        <li>${esc(c.street)}</li>
        <li>${esc(c.city)}</li>
        <li><a href="tel:${c.phoneHref}">${esc(c.phone)}</a></li>
        <li><a href="mailto:${c.email}">${esc(c.email)}</a></li>
        <li style="display:flex;gap:.8rem;margin-top:.4rem">
          <a href="${c.facebook}" aria-label="Facebook" style="width:20px">${icon('facebook')}</a>
          <a href="${c.youtube}" aria-label="YouTube" style="width:22px">${icon('youtube')}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="container footer__bar">
    <span>© ${new Date().getFullYear()} IKO stavby s.r.o. · 35 let na trhu</span>
    <span>${esc(c.ico)}</span>
  </div>
</footer>`;
}

/* ---------- Tape motif -------------------------------------------------- */
export function tape({ blue = false, repeats = 30 } = {}) {
  const cell = Array.from({ length: repeats }, () => '<span>IKO</span>').join('');
  return `<div class="tape${blue ? ' tape--blue' : ''}" aria-hidden="true"><div class="tape__track">${cell}${cell}</div></div>`;
}

/* ---------- Small building blocks --------------------------------------- */
export const eyebrow = (t, { onbrand = false, plain = false } = {}) =>
  `<span class="eyebrow${onbrand ? ' eyebrow--onbrand' : ''}${plain ? ' eyebrow--plain' : ''}">${esc(t)}</span>`;

export function sectionHead({ eyebrow: eb, title, lead, action, onbrand = false }) {
  return `<div class="sec-head" data-reveal>
    <div>
      ${eb ? eyebrow(eb, { onbrand }) : ''}
      <h2 class="sec-head__title h1">${esc(title)}</h2>
      ${lead ? `<p class="lead muted">${esc(lead)}</p>` : ''}
    </div>
    ${action || ''}
  </div>`;
}

export const btn = (label, href, variant = 'primary', { lg = false, arrow = true } = {}) =>
  `<a class="btn btn--${variant}${lg ? ' btn--lg' : ''}" href="${href}">${esc(label)}${arrow ? ` <span class="arrow">${icon('arrow-right')}</span>` : ''}</a>`;

export const statBand = (stats, onbrand = true) =>
  `<div class="statband">${stats
    .map(
      (s) => `<div class="stat${onbrand ? '' : ' stat--ink'}" data-reveal>
      <div class="stat__v" data-count>${esc(s.v)}</div>
      <div class="stat__l">${esc(s.l)}</div>
      <div class="stat__s">${esc(s.s)}</div>
    </div>`
    )
    .join('')}</div>`;

export const badge = (status, statusMeta, onMedia = true) => {
  const m = statusMeta[status] || statusMeta.available;
  const tone = m.cls.replace('s-', '');
  return `<span class="badge badge--${tone}${onMedia ? ' badge--onmedia' : ''}"><span class="dot"></span>${esc(m.label)}</span>`;
};
