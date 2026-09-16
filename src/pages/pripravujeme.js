import { pipeline } from '../data/projects.js';
import { site } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, btn } from '../components.js';
import { pipelineCard, metaGrid, contactForm, placeholder } from '../blocks.js';
import { ctaBand } from './home.js';

/* Formerly Aktuality — now only about projects in preparation (client). */
export function pripravujemePage() {
  const body = `
<section class="section--tight" style="padding-top:calc(var(--header-h) + clamp(2.5rem,6vw,5rem))">
  <div class="container" data-reveal>
    ${eyebrow('Připravujeme')}
    <h1 class="display balance" style="margin:1rem 0 1rem;max-width:20ch">Projekty, na kterých právě pracujeme</h1>
    <p class="lead muted" style="max-width:60ch">Nové lokality a etapy, které postupně připravujeme k prodeji. U každého projektu najdete stručný popis a první vizualizace, jakmile budou k dispozici.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="card-grid">
      ${pipeline.map((p, i) => pipelineCard(p, i)).join('')}
    </div>
  </div>
</section>

${ctaBand()}
`;
  return {
    path: '/pripravujeme/',
    title: 'Připravujeme',
    description: 'Připravované projekty IKO v Plzni a okolí — nové lokality a etapy, které chystáme k prodeji.',
    body,
  };
}

export function pripravujemeDetailPage(p) {
  // three frames until the visualisations exist, so the layout is already final
  const shots = p.gallery.length ? p.gallery : [null, null, null];
  const body = `
<article>
<section class="section--tight" style="padding-top:calc(var(--header-h) + clamp(2rem,5vw,4rem))">
  <div class="container">
    <nav class="crumb" aria-label="Drobečková navigace"><a href="/pripravujeme/">Připravujeme</a> ${icon('arrow-right')} <span>${esc(p.name)}</span></nav>
    <div class="split" style="margin-top:2rem;align-items:start">
      <div data-reveal>
        ${eyebrow('Připravujeme')}
        <h1 class="display balance" style="margin:.8rem 0 1.2rem">${esc(p.name)}</h1>
        <p class="prep-detail__text">${esc(p.text)}</p>
      </div>
      <div data-reveal data-delay="1">
        ${metaGrid([
          { k: 'Lokalita', v: p.location },
          { k: 'Stav', v: 'Připravujeme' },
          { k: 'Developer', v: site.contact.company },
          { k: 'Počet jednotek', v: p.units ? String(p.units) : '—' },
          { k: 'Zahájení prodeje', v: p.saleStart || 'Upřesníme' },
          { k: 'Dokončení', v: p.completion || 'Upřesníme' },
        ])}
        <div style="margin-top:1.4rem">${btn('Chci vědět o zahájení prodeje', '#zajem', 'primary', { lg: true })}</div>
      </div>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    ${eyebrow('Vizualizace')}
    <div class="prep-shots" data-gallery>
      ${shots.map((g) => g
        ? `<figure data-full="${g.src}"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" decoding="async"></figure>`
        : `<figure class="prep-shots__ph">${placeholder('Vizualizaci doplníme')}</figure>`).join('')}
    </div>
  </div>
</section>

<section class="section--tight bg-brand" id="zajem">
  <div class="container grid-2" style="align-items:center">
    <div data-reveal>
      ${eyebrow('Máte zájem?', { onbrand: true })}
      <h2 class="display" style="color:#fff;margin:.5rem 0 1rem">Dáme vám vědět mezi prvními.</h2>
      <p style="color:rgba(255,255,255,.9);max-width:44ch">Nechte nám kontakt a ozveme se, jakmile u projektu ${esc(p.name)} zahájíme prodej.</p>
    </div>
    <div data-reveal data-delay="1">${contactForm({ compact: true })}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Další připravované projekty')}</div>
      ${btn('Všechny připravované projekty', '/pripravujeme/', 'secondary')}
    </div>
    <div class="card-grid">${pipeline.filter((x) => x.slug !== p.slug).map((x, i) => pipelineCard(x, i)).join('')}</div>
  </div>
</section>
</article>
`;
  return {
    path: `/pripravujeme/${p.slug}/`,
    title: `${p.name} — připravujeme`,
    description: p.excerpt,
    body,
  };
}
