import { projects } from '../data/projects.js';
import { site } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, btn } from '../components.js';
import { metaGrid, gallery, unitsTable, compositionList, locationCard, projectCard } from '../blocks.js';
import { contactForm } from '../blocks.js';

export function projektDetailPage(p) {
  const related = projects.filter((x) => x.slug !== p.slug);
  const hasUnits = Array.isArray(p.units);

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

<section class="section">
  <div class="container">
    <nav class="crumb" aria-label="Drobečková navigace"><a href="/projekty/">Projekty</a> ${icon('arrow-right')} <span>${esc(p.name)}</span></nav>
    <div class="split" style="margin-top:2rem;align-items:start">
      <div data-reveal>
        ${eyebrow('O projektu')}
        <p class="lead" style="margin-top:1rem;font-size:var(--fs-h3);font-weight:var(--fw-medium);color:var(--text-strong);max-width:30ch;line-height:1.3">${esc(p.intro)}</p>
      </div>
      <div data-reveal data-delay="1">
        ${metaGrid(p.meta)}
      </div>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    ${eyebrow('Obrazem')}
    <h2 class="h1" data-reveal style="margin:.5rem 0 2rem;max-width:20ch">Podívejte se, jak se tu bude bydlet</h2>
    ${gallery(p)}
  </div>
</section>

<section class="section bg-page">
  <div class="container split" style="align-items:start">
    <div data-reveal>
      ${eyebrow('Popis projektu')}
      <div class="prose" style="margin-top:1rem;color:var(--text-body)">
        ${p.description.map((par) => `<p>${esc(par)}</p>`).join('')}
      </div>
    </div>
    <div data-reveal data-delay="1">
      ${locationCard(p.place)}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="avail-h" data-units-root>
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Nabídka a dostupnost')}<h2 class="sec-head__title h1" id="avail-h">${hasUnits ? 'Dostupné domy' : 'Co zde najdete'}</h2></div>
    </div>
    ${hasUnits ? unitsFilter() : ''}
    ${hasUnits ? unitsTable(p.units) : compositionList(p.composition)}
    ${!hasUnits ? '<p class="muted" style="margin-top:1rem;font-size:var(--fs-sm);max-width:60ch">Aktuální dostupnost a ceny jednotlivých jednotek vám rádi zašleme na vyžádání — ozvěte se nám a připravíme vám konkrétní nabídku.</p>' : ''}
  </div>
</section>

<section class="section--tight bg-ink">
  <div class="container grid-2" style="align-items:center">
    <div data-reveal>
      ${eyebrow('Máte zájem?', { onbrand: true })}
      <h2 class="display" style="color:#fff;margin:.5rem 0 1rem">Nezávazně se zeptejte na ${esc(p.name)}.</h2>
      <p style="color:var(--gray-300);max-width:44ch">Domluvíme prohlídku, pošleme podklady nebo poradíme s financováním. Ozveme se do 24 hodin.</p>
      <div style="margin-top:1.6rem;display:flex;gap:.9rem;flex-wrap:wrap">
        <a class="btn btn--ghost btn--lg" href="tel:${site.contact.phoneHref}">${icon('phone')} ${esc(site.contact.phone)}</a>
      </div>
    </div>
    <div data-reveal data-delay="1">
      ${contactForm({ compact: true })}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Další projekty')}<h2 class="sec-head__title h1">Prohlédněte si i tyto</h2></div>
      ${btn('Všechny projekty', '/projekty/', 'secondary')}
    </div>
    <div class="card-grid">${related.map((r, i) => projectCard(r, i)).join('')}</div>
  </div>
</section>
</article>
`;

  return {
    path: `/projekty/${p.slug}/`,
    title: p.name,
    description: `${p.name} — ${p.intro}`,
    body,
    ogImage: p.hero,
    jsonLd: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ResidentialComplex',
      name: p.name,
      description: p.intro,
      url: `${site.url}/projekty/${p.slug}/`,
      image: site.url + p.hero,
      address: { '@type': 'PostalAddress', addressLocality: 'Plzeň', addressCountry: 'CZ' },
      developer: { '@type': 'Organization', name: site.contact.company },
    }),
  };
}

function unitsFilter() {
  const layouts = ['Vše', '4+kk', '5+kk', '6+kk'];
  const states = [['Vše', 'vse'], ['Volné', 'available'], ['Rezervováno', 'reserved'], ['Prodáno', 'sold']];
  return `<div class="filterbar" data-reveal>
    <div class="filterbar__group">
      <span class="filterbar__label">Dispozice</span>
      ${layouts.map((l, i) => `<button class="tag${i === 0 ? ' is-selected' : ''}" data-filter="layout" data-value="${l === 'Vše' ? 'vse' : l}">${esc(l)}</button>`).join('')}
    </div>
    <div class="filterbar__group">
      <span class="filterbar__label">Stav</span>
      ${states.map(([l, v], i) => `<button class="tag${i === 0 ? ' is-selected' : ''}" data-filter="status" data-value="${v}">${esc(l)}</button>`).join('')}
    </div>
    <span class="count" data-units-count style="margin-left:auto"></span>
  </div>`;
}
