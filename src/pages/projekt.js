import { currentProjects, projectStatusMeta, getCurrent } from '../data/projects.js';
import { site } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, btn } from '../components.js';
import { metaGrid, gallery, locationCard, currentProjectCard, contactForm, placeholder } from '../blocks.js';

// Unit count and completion sit beside the other facts, as on the project tiles.
function factsOf(p) {
  const cur = getCurrent(p.slug) || {};
  const units = cur.units ?? p.unitCount;
  return [
    { k: 'Počet jednotek', v: units ? String(units) : '—' },
    { k: 'Dokončení', v: cur.completion || p.completion || 'Upřesníme' },
  ];
}

/* The unit selection (floor plans + listing) is deliberately not here any more —
   the project's own website covers it (client). */
export function projektDetailPage(p) {
  const body = `
<article>
<section class="pdetail-hero" data-hero>
  <img src="${p.hero}" alt="${esc(p.heroAlt)}" fetchpriority="high" decoding="async">
  <div class="scrim"></div>
  <div class="pdetail-hero__inner">
    <div class="pill-row" data-reveal style="margin-bottom:1.2rem">
      <span class="chip-label">${esc(p.statusLabel)}</span>
    </div>
    <div class="eyebrow eyebrow--onbrand" data-reveal>${icon('map-pin')} ${esc(p.location)}</div>
    <h1 data-reveal data-delay="1" style="margin-top:.5rem">${esc(p.name)}</h1>
  </div>
</section>

${introSection(p, p.intro, [...p.meta, ...factsOf(p)], webOf(p))}

<section class="section--tight">
  <div class="container">
    ${eyebrow('Obrazem')}
    <h2 class="h1" data-reveal style="margin:.5rem 0 2rem;max-width:20ch">Podívejte se, jak se tu bude bydlet</h2>
    ${gallery(p)}
  </div>
</section>

<section class="section bg-page">
  <div class="container container--narrow" data-reveal>
    ${eyebrow('Popis projektu')}
    <div class="prose" style="margin-top:1rem;color:var(--text-body);font-size:var(--fs-lead);line-height:var(--lh-snug)">
      ${p.description.map((par) => `<p>${esc(par)}</p>`).join('')}
    </div>
  </div>
</section>

<section class="section--tight" id="lokalita">
  <div class="container">
    ${locationCard(p.place)}
  </div>
</section>

${enquiryBand(p.name)}
${relatedSection(p.slug)}
</article>
`;

  return {
    path: `/projekty/${p.slug}/`,
    title: p.name,
    description: `${p.name} — ${p.intro}`,
    body,
    ogImage: p.hero,
    jsonLd: jsonLd(p.name, p.intro, p.slug, p.hero),
  };
}

/* Projects from the current offer that have no full content yet: the same page
   frame, filled only with the facts the client supplied. */
export function projektLitePage(c) {
  const m = projectStatusMeta[c.status] || projectStatusMeta.selling;
  const intro = c.text || 'Podrobné informace, vizualizace a ceník tohoto projektu právě připravujeme. Aktuální nabídku jednotek vám rádi pošleme — stačí se nám ozvat.';
  const meta = [
    { k: 'Lokalita', v: c.location },
    { k: 'Stav', v: m.label },
    { k: 'Developer', v: site.contact.company },
    { k: 'Počet jednotek', v: c.units ? String(c.units) : '—' },
    { k: 'Dokončení', v: c.completion || 'Upřesníme' },
    { k: 'Web projektu', v: c.web ? 'K dispozici' : 'Připravujeme' },
  ];
  const body = `
<article>
<section class="pdetail-hero${c.img ? '' : ' pdetail-hero--ph'}" data-hero>
  ${c.img ? `<img src="${c.img}" alt="${esc(c.name)}" fetchpriority="high" decoding="async">` : placeholder()}
  <div class="scrim"></div>
  <div class="pdetail-hero__inner">
    <div class="pill-row" data-reveal style="margin-bottom:1.2rem">
      <span class="chip-label">${esc(m.label)}</span>
    </div>
    <div class="eyebrow eyebrow--onbrand" data-reveal>${icon('map-pin')} ${esc(c.location)}</div>
    <h1 data-reveal data-delay="1" style="margin-top:.5rem">${esc(c.name)}</h1>
  </div>
</section>

${introSection(c, intro, meta, c.web)}

${enquiryBand(c.name)}
${relatedSection(c.slug)}
</article>
`;
  return {
    path: `/projekty/${c.slug}/`,
    title: c.name,
    description: `${c.name} — ${c.location}. ${m.label}.`,
    body,
    ...(c.img ? { ogImage: c.img } : {}),
    jsonLd: jsonLd(c.name, intro, c.slug, c.img),
  };
}

const webOf = (p) => getCurrent(p.slug)?.web || p.web;

function introSection(p, intro, meta, web) {
  return `<section class="section">
  <div class="container">
    <nav class="crumb" aria-label="Drobečková navigace"><a href="/projekty/">Projekty</a> ${icon('arrow-right')} <span>${esc(p.name)}</span></nav>
    <div class="split" style="margin-top:2rem;align-items:start">
      <div data-reveal>
        ${eyebrow('O projektu')}
        <p class="lead" style="margin-top:1rem;font-size:var(--fs-h3);font-weight:var(--fw-medium);color:var(--text-strong);max-width:30ch;line-height:1.3">${esc(intro)}</p>
        ${web ? `<a class="btn btn--primary btn--lg" style="margin-top:1.8rem" href="${web}" target="_blank" rel="noopener">
          Web projektu ${icon('arrow-up-right')}
        </a>` : ''}
      </div>
      <div data-reveal data-delay="1">
        ${metaGrid(meta)}
      </div>
    </div>
  </div>
</section>`;
}

function enquiryBand(name) {
  return `<section class="section--tight bg-brand">
  <div class="container grid-2" style="align-items:center">
    <div data-reveal>
      ${eyebrow('Máte zájem?', { onbrand: true })}
      <h2 class="display" style="color:#fff;margin:.5rem 0 1rem">Nezávazně se zeptejte na ${esc(name)}.</h2>
      <p style="color:rgba(255,255,255,.9);max-width:44ch">Domluvíme prohlídku, pošleme podklady nebo poradíme s financováním. Ozveme se do 24 hodin.</p>
      <div style="margin-top:1.6rem;display:flex;gap:.9rem;flex-wrap:wrap">
        <a class="btn btn--ghost btn--lg" href="tel:${site.contact.phoneHref}">${icon('phone')} ${esc(site.contact.phone)}</a>
      </div>
    </div>
    <div data-reveal data-delay="1">
      ${contactForm({ compact: true })}
    </div>
  </div>
</section>`;
}

function relatedSection(slug) {
  const related = currentProjects.filter((x) => x.slug !== slug).slice(0, 3);
  return `<section class="section">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Další projekty')}<h2 class="sec-head__title h1">Prohlédněte si i tyto</h2></div>
      ${btn('Všechny projekty', '/projekty/', 'secondary')}
    </div>
    <div class="pjc-grid">${related.map((r, i) => currentProjectCard(r, projectStatusMeta, i)).join('')}</div>
  </div>
</section>`;
}

function jsonLd(name, description, slug, image) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ResidentialComplex',
    name,
    description,
    url: `${site.url}/projekty/${slug}/`,
    ...(image ? { image: site.url + image } : {}),
    address: { '@type': 'PostalAddress', addressCountry: 'CZ' },
    developer: { '@type': 'Organization', name: site.contact.company },
  });
}
