import { currentProjects, projectStatusMeta, pipeline, completed } from '../data/projects.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, btn } from '../components.js';
import { currentProjectCard } from '../blocks.js';
import { ctaBand } from './home.js';
import { allUnits, unitProjects, unitRanges } from '../data/units.js';
import { unitMarketplaceBar, unitMarketplace } from '../units-ui.js';

export function projektyPage() {
  const body = `
<!-- Projects first, unit search below (client request) -->
<section class="section--tight" style="padding-top:calc(var(--header-h) + clamp(2rem,5vw,3.5rem))">
  <div class="container container--narrow" data-reveal>
    ${eyebrow('Projekty')}
    <h1 class="display balance" style="margin:1rem 0 1.2rem;max-width:20ch">Rezidenční projekty v Plzni a okolí</h1>
    <p class="lead muted" style="max-width:60ch">Vyberte si projekt, nebo rovnou konkrétní jednotku ve vyhledávači níže.</p>
  </div>
</section>

<section class="section--tight" aria-labelledby="cur-h">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Aktuální nabídka')}<h2 class="sec-head__title h1" id="cur-h">Aktuální projekty</h2></div>
      <span class="count">${currentProjects.length} projektů</span>
    </div>
    <div class="pjc-grid">
      ${currentProjects.map((p, i) => currentProjectCard(p, projectStatusMeta, i)).join('')}
    </div>
  </div>
</section>

<!-- Unit search -->
<section class="section bg-brand" aria-labelledby="mkt-h">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Byty a domy na prodej', { onbrand: true })}
      <h2 class="sec-head__title h1" id="mkt-h" style="color:#fff">Vyberte si konkrétní jednotku</h2>
      <p class="lead" style="color:rgba(255,255,255,.9)">Filtrujte podle projektu, typu, dispozice, plochy a stavu. Přepněte si zobrazení na seznam nebo dlaždice.</p></div>
    </div>
    <div data-reveal>${unitMarketplaceBar({ units: allUnits, projects: unitProjects, ranges: unitRanges, showProjectFilter: true })}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div data-reveal>${unitMarketplace({ units: allUnits, projects: unitProjects, ranges: unitRanges, showProjectFilter: true, hideBar: true })}</div>
  </div>
</section>

<section class="section--tight bg-page" aria-labelledby="prep-h">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Připravujeme')}<h2 class="sec-head__title h1" id="prep-h">Chystané lokality</h2>
      <p class="lead muted">Nové etapy a lokality, které postupně uvádíme do prodeje. Ozvěte se a dáme vám vědět mezi prvními.</p></div>
    </div>
    <div class="prep-grid">
      ${pipeline.map((p, i) => `<article class="prep" data-reveal data-delay="${(i % 3) + 1}">
        <div class="prep__loc">${icon('map-pin')} ${esc(p.location)}</div>
        <h3>${esc(p.name)}</h3>
        ${p.units ? `<span class="prep__u">${p.units} jednotek</span>` : ''}
        <p>${esc(p.note)}</p>
      </article>`).join('')}
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
    <div class="card-grid">
      ${completed.map((c, i) => `<article class="donec" data-reveal data-delay="${(i % 3) + 1}">
        ${c.img ? `<div class="donec__media reveal-media"><img src="${c.img}" alt="Dokončený projekt ${esc(c.name)}" loading="lazy" decoding="async"></div>` : ''}
        <div class="donec__body">
          <div class="donec__meta">${icon('map-pin')} ${esc(c.location)}${c.years ? ` · ${esc(c.years)}` : ''}</div>
          <h3>${esc(c.name)}</h3>
          ${c.award ? `<span class="donec__award">${icon('star')} ${esc(c.award)}</span>` : ''}
          <p>${esc(c.note)}</p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

${ctaBand()}
`;

  return {
    path: '/projekty/',
    title: 'Projekty',
    description: 'Rezidenční projekty IKO v Plzni a okolí — aktuální nabídka v prodeji, vyhledávač volných jednotek, připravované lokality a dokončené projekty.',
    body,
  };
}
