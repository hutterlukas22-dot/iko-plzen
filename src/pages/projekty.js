import { projects, pipeline, completed } from '../data/projects.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, btn } from '../components.js';
import { projectCard } from '../blocks.js';
import { ctaBand } from './home.js';
import { allUnits, unitProjects, unitRanges } from '../data/units.js';
import { unitMarketplace } from '../units-ui.js';

export function projektyPage() {
  const body = `
<section class="section bg-brand" style="padding-top:calc(var(--header-h) + clamp(2rem,5vw,3rem))" aria-labelledby="mkt-h">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Byty a domy na prodej')}<h2 class="sec-head__title h1" id="mkt-h">Vyberte si konkrétní jednotku</h2>
      <p class="lead muted">Filtrujte podle projektu, dispozice, plochy a stavu. Přepněte si zobrazení na seznam nebo dlaždice s půdorysem.</p></div>
    </div>
    <div data-reveal>${unitMarketplace({ units: allUnits, projects: unitProjects, ranges: unitRanges, showProjectFilter: true })}</div>
  </div>
</section>

<section class="section--tight bg-page" aria-labelledby="cur-h">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Projekty')}<h2 class="sec-head__title h1" id="cur-h">Aktuální projekty</h2></div>
      <span class="count">${projects.length} projekty</span>
    </div>
    <div class="card-grid">
      ${projects.map((p, i) => projectCard(p, i)).join('')}
    </div>
  </div>
</section>

<section class="section--tight bg-page" aria-labelledby="prep-h">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Připravujeme')}<h2 class="sec-head__title h1" id="prep-h">Chystané lokality</h2>
      <p class="lead muted">Nové etapy a lokality, které postupně uvádíme do prodeje. Ozvěte se a dáme vám vědět mezi prvními.</p></div>
    </div>
    <div class="timeline" style="margin-top:1rem">
      ${pipeline
        .map(
          (p) => `<div class="tl-item" data-reveal style="grid-template-columns:1fr auto;align-items:center">
        <div class="tl-body">
          <h3 style="margin-bottom:.3rem">${esc(p.name)}</h3>
          <p class="muted" style="display:flex;align-items:center;gap:.5em;margin:0">${icon('map-pin', 'inline-ic')} ${esc(p.location)} · ${esc(p.note)}</p>
        </div>
        <span class="tag">Připravujeme</span>
      </div>`
        )
        .join('')}
    </div>
    <div style="margin-top:2rem" data-reveal>${btn('Chci vědět o zahájení prodeje', '/kontakt/', 'secondary')}</div>
  </div>
</section>

<section class="section" aria-labelledby="done-h">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Dokončené projekty')}<h2 class="sec-head__title h1" id="done-h">Co už v Plzni stojí</h2>
      <p class="lead muted">Náš track record — desítky domů a celé rezidenční lokality realizované od roku 2003.</p></div>
    </div>
    <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr))">
      ${completed
        .map(
          (c) => `<div class="svc" style="padding:clamp(1.4rem,2.5vw,2rem)" data-reveal>
        <div class="proj-row__loc" style="margin-bottom:.6rem">${icon('map-pin', 'inline-ic')} ${esc(c.location)}</div>
        <h3 style="font-size:var(--fs-h3)">${esc(c.name)}</h3>
        ${c.award ? `<div class="pill-row" style="margin-top:1rem"><span class="tag" style="border-color:var(--iko-blue);color:var(--iko-blue)">${icon('shield-check')} ${esc(c.award)}</span></div>` : c.note ? `<p class="muted" style="margin-top:.6rem;font-size:var(--fs-sm)">${esc(c.note)}</p>` : ''}
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>

${ctaBand()}
`;

  return {
    path: '/projekty/',
    title: 'Projekty',
    description: 'Rezidenční projekty IKO v Plzni a okolí — aktuální nabídka v prodeji, připravované lokality a dokončené developerské projekty.',
    body,
  };
}
