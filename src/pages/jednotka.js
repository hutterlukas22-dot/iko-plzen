import { allUnits } from '../data/units.js';
import { projects } from '../data/projects.js';
import { site } from '../data/site.js';
import { icon } from '../lib/util.js';
import { eyebrow, btn } from '../components.js';
import { unitJSON } from '../units-ui.js';
import { ctaBand } from './home.js';

// visualizations per project (large gallery imgs) for the detail page
const projViz = {};
for (const p of projects) projViz[p.slug] = (p.gallery || []).slice(0, 4).map((g) => `/projects/${p.imgPrefix || p.slug}-${String(g.i).padStart(2, '0')}-lg.jpg`);
const defaultId = allUnits[0].id;

export function jednotkaPage() {
  const body = `
<article data-unit-detail>
<section class="section" style="padding-top:calc(var(--header-h) + clamp(1.5rem,4vw,3rem));padding-bottom:0">
  <div class="container">
    <nav class="crumb" data-reveal aria-label="Drobečková navigace"><a href="/projekty/">Projekty</a> ${icon('arrow-right')} <a data-ud-project-link href="/projekty/">Projekt</a> ${icon('arrow-right')} <span data-ud-crumb>Jednotka</span></nav>
    <div class="split" style="align-items:start;margin-top:1.5rem">
      <div data-reveal>
        <div class="eyebrow" data-ud-eyebrow>Jednotka</div>
        <h1 style="margin:.4rem 0 .6rem" data-ud-title>Jednotka</h1>
        <div style="display:flex;align-items:center;gap:1.1rem;flex-wrap:wrap">
          <span class="umodal__price" style="margin:0" data-ud-price>—</span>
          <span data-ud-status></span>
        </div>
      </div>
      <div data-reveal data-delay="1" style="display:flex;flex-direction:column;gap:.7rem">
        <a class="btn btn--primary btn--lg" data-ud-inquire href="/kontakt/">Mám zájem o tuto jednotku</a>
        <div style="display:flex;gap:.7rem;flex-wrap:wrap">
          <a class="btn btn--secondary" data-ud-pdf href="/katalogovy-list-vzor.pdf" download>${icon('download')} Katalogový list (PDF)</a>
          <button class="btn btn--ghost-ink" data-compare-toggle>${icon('scale')} <span data-compare-label>Porovnat</span></button>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container split" style="align-items:start">
    <div data-reveal>
      <div class="eyebrow">Půdorys</div>
      <a class="fsel-plan" data-ud-plan-link href="#" target="_blank" rel="noopener" style="display:block;margin-top:1rem">
        <img data-ud-plan src="" alt="Půdorys jednotky" style="width:100%;display:block;background:#fff">
      </a>
    </div>
    <div data-reveal data-delay="1">
      <div class="eyebrow">Parametry</div>
      <div class="umodal__specs" data-ud-specs style="margin-top:1rem"></div>
      <div class="demo-note">${icon('shield-check')}<span>Dispozice a půdorys vycházejí z reálných podkladů IKO. Cena, plocha a dostupnost jsou v této ukázce demonstrační.</span></div>
    </div>
  </div>
</section>

<section class="section--tight bg-page">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Vizualizace')}<h2 class="sec-head__title h1">Jak se tu bude bydlet</h2></div></div>
    <div class="gallery" data-ud-viz data-gallery></div>
  </div>
</section>

<section class="section--tight bg-ink">
  <div class="container grid-2" style="align-items:center">
    <div data-reveal>
      ${eyebrow('Máte zájem?', { onbrand: true })}
      <h2 class="display" style="color:#fff;margin:.5rem 0 1rem">Ozvěte se — rádi vám jednotku ukážeme.</h2>
      <p style="color:var(--gray-300);max-width:44ch">Domluvíme prohlídku, pošleme podklady nebo poradíme s financováním. Ozveme se do 24 hodin.</p>
    </div>
    <div data-reveal data-delay="1" style="display:flex;flex-direction:column;gap:.8rem">
      <a class="btn btn--inverse btn--lg" data-ud-inquire2 href="/kontakt/">Nezávazná poptávka</a>
      <a class="btn btn--ghost btn--lg" href="tel:${site.contact.phoneHref}">${icon('phone')} ${site.contact.phone}</a>
    </div>
  </div>
</section>
</article>

<script type="application/json" data-projviz>${JSON.stringify(projViz).replace(/</g, '\\u003c')}</script>
${unitJSON(allUnits)}
`;
  return {
    path: '/jednotka/',
    title: 'Detail jednotky',
    description: 'Detail jednotky IKO — dispozice, plocha, patro, orientace, půdorys, vizualizace a katalogový list ke stažení.',
    body,
    defaultId,
  };
}
