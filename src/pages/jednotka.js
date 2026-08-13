import { allUnits, AMENITIES } from '../data/units.js';
import { projects } from '../data/projects.js';
import { site } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow } from '../components.js';
import { unitJSON } from '../units-ui.js';
import { mapPreview, contactForm, agentCard } from '../blocks.js';
import { salesContact, byId } from '../data/team.js';
import { materials, story, stages, nearby, trust } from '../data/unit-content.js';

/* Per-project media the client picks from once it knows which unit is shown.
   IKO's own renders carry the emotional sections — they show the actual product
   and are always labelled as visualisations. */
const projMedia = {};
for (const p of projects) {
  const pre = p.imgPrefix || p.slug;
  const n = (i) => `/projects/${pre}-${String(i).padStart(2, '0')}-lg.jpg`;
  projMedia[p.slug] = {
    hero: n(p.interiorImg),
    living: n((p.gallery.find((g) => /interiér|terasa|posezení|rodin/i.test(g.alt)) || p.gallery[1]).i),
    livingAlt: (p.gallery.find((g) => /interiér|terasa|posezení|rodin/i.test(g.alt)) || p.gallery[1]).alt,
    project: { name: p.name, intro: p.intro, slug: p.slug, img: n(p.gallery[0].i), status: p.statusLabel },
    place: p.place,
    gallery: (p.gallery || []).slice(0, 6).map((g) => ({ src: n(g.i), alt: g.alt })),
  };
}

/* Standard equipment — the project standard, shared by every unit. */
const standards = [
  { ic: 'home', t: 'Podlahy a interiér', items: ['Dřevěná plovoucí podlaha v pokojích', 'Velkoformátová dlažba v koupelnách a chodbě', 'Bezpolodrážkové dveře s obložkovou zárubní', 'Malba bílá, otěruvzdorná'] },
  { ic: 'ruler', t: 'Okna a stínění', items: ['Plastová okna s izolačním trojsklem', 'Venkovní žaluzie nebo předokenní rolety', 'Vnitřní i vnější parapety', 'Francouzská okna na terasu či balkon'] },
  { ic: 'snowflake', t: 'Vytápění a technologie', items: ['Podlahové vytápění v koupelnách', 'Deskové radiátory s termostatickou hlavicí', 'Příprava pro klimatizaci', 'Datové rozvody v pokojích'] },
  { ic: 'shield-check', t: 'Koupelna a sanita', items: ['Závěsné WC s dvoutlačítkovou nádržkou', 'Umyvadlo s podomítkovou baterií', 'Sprchový kout nebo vana', 'Příprava pro pračku'] },
  { ic: 'key', t: 'Bezpečnost', items: ['Bezpečnostní vstupní dveře', 'Domovní videotelefon', 'Uzamykatelná sklepní kóje', 'Příprava pro chytrou domácnost'] },
  { ic: 'leaf', t: 'Dům a okolí', items: ['Zateplená fasáda, zelené střechy přístřešků', 'Kolárna a úklidová místnost', 'Parkování v domě nebo na pozemku', 'Sadové úpravy a pěší cesty'] },
];

const navLinks = [
  ['prehled', 'Přehled'], ['pudorys', 'Půdorys'], ['standard', 'Co dostanete'],
  ['financovani', 'Financování'], ['lokalita', 'Lokalita'], ['kontakt', 'Kontakt'],
];

export function jednotkaPage() {
  const body = `
<article data-unit-detail>

<!-- 01 — WHAT IS IT ------------------------------------------------------- -->
<section class="ud-hero">
  <div class="ud-hero__media"><img data-ud-hero src="" alt="" fetchpriority="high" decoding="async"></div>
  <div class="ud-hero__scrim"></div>
  <span class="ud-hero__tag">Vizualizace</span>
  <div class="container ud-hero__inner">
    <nav class="crumb crumb--onmedia" aria-label="Drobečková navigace">
      <a href="/projekty/">Projekty</a> ${icon('arrow-right')} <a data-ud-project-link href="/projekty/">Projekt</a> ${icon('arrow-right')} <span data-ud-crumb>Jednotka</span>
    </nav>
    <div class="ud-hero__row">
      <div class="ud-hero__id">
        <div class="ud-hero__eyebrow" data-ud-project-name>Projekt</div>
        <h1 class="ud-hero__title" data-ud-title>Jednotka</h1>
        <p class="ud-hero__sum" data-ud-summary></p>
      </div>
      <div class="ud-hero__buy">
        <div class="ud-hero__status" data-ud-status></div>
        <div class="ud-hero__price" data-ud-price>—</div>
        <div class="ud-hero__ppm" data-ud-ppm></div>
        <a class="btn btn--primary btn--lg ud-hero__cta" data-ud-inquire href="/kontakt/">Mám zájem o tuto jednotku</a>
        <div class="ud-hero__mini">
          <a class="btn btn--secondary btn--sm" data-ud-pdf href="/katalogovy-list-vzor.pdf" download>${icon('download')} Katalogový list</a>
          <button class="btn btn--secondary btn--sm" data-compare-toggle>${icon('scale')} <span data-compare-label>Porovnat</span></button>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="ud-sticky" data-ud-sticky>
  <div class="container ud-sticky__inner">
    <div class="ud-sticky__id"><b data-ud-sticky-name>Jednotka</b><span data-ud-sticky-sub></span></div>
    <nav class="ud-nav">${navLinks.map(([id, l]) => `<a href="#${id}">${esc(l)}</a>`).join('')}</nav>
    <div class="ud-sticky__buy">
      <span data-ud-sticky-price></span>
      <a class="btn btn--primary btn--sm" data-ud-inquire href="/kontakt/">Mám zájem</a>
    </div>
  </div>
</div>

<!-- 02 — FACTS ------------------------------------------------------------ -->
<section class="ud-facts-wrap" id="prehled">
  <div class="container"><ul class="ud-facts" data-ud-facts></ul></div>
</section>

<!-- 03 — CAN I IMAGINE LIVING HERE ---------------------------------------- -->
<section class="section ud-living">
  <div class="container split split--media-first">
    <figure class="split__media reveal-media ud-living__fig" data-reveal>
      <img data-ud-living src="" alt="" loading="lazy" decoding="async">
      <figcaption class="ud-vizlabel">Vizualizace</figcaption>
    </figure>
    <div data-reveal data-delay="1">
      ${eyebrow(story.living.eyebrow)}
      <h2 class="display balance" style="margin:.6rem 0 1.2rem">${esc(story.living.title)}</h2>
      <p class="lead muted" style="max-width:44ch">${esc(story.living.text)}</p>
    </div>
  </div>
</section>

<!-- 04 — HOW DOES THE SPACE WORK ------------------------------------------ -->
<section class="section bg-page" id="pudorys">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow(story.plan.eyebrow)}
      <h2 class="sec-head__title h1">${esc(story.plan.title)}</h2>
      <p class="lead muted">${esc(story.plan.text)}</p></div>
      <a class="btn btn--secondary" data-ud-pdf href="/katalogovy-list-vzor.pdf" download>${icon('download')} Katalogový list</a>
    </div>
    <div class="ud-plan-grid">
      <a class="ud-plan" data-ud-plan-link href="#" target="_blank" rel="noopener" data-reveal
         title="Otevřít půdorys ve větším">
        <img data-ud-plan src="" alt="" loading="lazy">
        <span class="ud-plan__zoom">${icon('plus')} Zvětšit</span>
      </a>
      <div class="ud-rooms" data-reveal data-delay="1">
        <h3 class="ud-rooms__t">Místnosti</h3>
        <ul data-ud-rooms></ul>
        <p class="ud-rooms__note">${icon('file-text')} Přesné výměry najdete v katalogovém listu.</p>
      </div>
    </div>
  </div>
</section>

<!-- 05 — WHAT DOES IT FEEL LIKE ------------------------------------------- -->
<section class="section">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow(story.material.eyebrow)}
      <h2 class="sec-head__title h1">${esc(story.material.title)}</h2>
      <p class="lead muted">${esc(story.material.text)}</p></div>
    </div>
    <div class="mat-strip">
      ${materials.map((m, i) => `<figure class="mat" data-reveal data-delay="${(i % 3) + 1}">
        <img src="${m.img}" alt="${esc(m.alt)}" loading="lazy" decoding="async">
        <figcaption><b>${esc(m.t)}</b><span>${esc(m.d)}</span></figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>

<!-- 06 — WHAT EXACTLY DO I GET -------------------------------------------- -->
<section class="section bg-page" id="standard">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Co je součástí jednotky')}
      <h2 class="sec-head__title h1">Vše níže je v ceně</h2>
      <p class="lead muted">Materiály a technologie dodáváme jako součást ceny — bez příplatků a bez dohadování.</p></div>
    </div>

    <div class="ud-spec" data-ud-spec data-reveal></div>

    <div class="std-grid" style="margin-top:clamp(1.5rem,3vw,2.5rem)">
      ${standards.map((s, i) => `<details class="std" data-reveal data-delay="${(i % 3) + 1}"${i < 3 ? ' open' : ''}>
        <summary class="std__head"><span class="std__ic">${icon(s.ic)}</span><h3 class="std__t">${esc(s.t)}</h3><span class="std__chev">${icon('plus')}</span></summary>
        <ul class="std__list">${s.items.map((it) => `<li>${icon('check')}<span>${esc(it)}</span></li>`).join('')}</ul>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- 07 — PROJECT STATUS ---------------------------------------------------- -->
<section class="section--tight">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Stav projektu')}<h2 class="sec-head__title h1">Kde se projekt právě nachází</h2></div></div>
    <ol class="stage" data-reveal>
      ${stages.map((s) => `<li class="stage__i${s.done ? ' is-done' : ''}${s.current ? ' is-current' : ''}">
        <span class="stage__dot">${s.done ? icon('check') : ''}</span>
        <span class="stage__l">${esc(s.label)}</span>
        ${s.current ? '<span class="stage__now">Aktuálně</span>' : ''}
      </li>`).join('')}
    </ol>
  </div>
</section>

<!-- 08 — CAN I AFFORD IT --------------------------------------------------- -->
<section class="section bg-ink" id="financovani">
  <div class="container">
    <div class="sec-head sec-head--onbrand" data-reveal><div>${eyebrow('Financování', { onbrand: true })}
      <h2 class="sec-head__title h1" style="color:#fff">Kolik může stát vaše bydlení?</h2>
      <p class="lead" style="color:var(--gray-300)">Posuňte vlastní zdroje a dobu splácení. Orientační výpočet — konkrétní nabídku připravíme na míru.</p></div>
    </div>
    <div class="fin" data-fin data-reveal>
      <div class="fin__controls">
        <div class="fin__row">
          <label for="fin-own">Vlastní zdroje <b data-fin-own-out></b></label>
          <input id="fin-own" type="range" min="10" max="80" step="5" value="20" data-fin-own>
          <span class="fin__hint" data-fin-own-abs></span>
        </div>
        <div class="fin__row">
          <label for="fin-years">Doba splácení <b data-fin-years-out></b></label>
          <input id="fin-years" type="range" min="5" max="30" step="1" value="25" data-fin-years>
          <span class="fin__hint">Delší doba sníží splátku, ale prodraží úrok.</span>
        </div>
        <div class="fin__row">
          <label for="fin-rate">Úroková sazba <b data-fin-rate-out></b></label>
          <input id="fin-rate" type="range" min="2" max="8" step="0.1" value="4.9" data-fin-rate>
          <span class="fin__hint">Orientační sazba, banka ji stanoví individuálně.</span>
        </div>
      </div>
      <div class="fin__result">
        <div class="fin__k">Orientační měsíční splátka</div>
        <div class="fin__v" data-fin-monthly>—</div>
        <dl class="fin__break">
          <div><dt>Cena jednotky</dt><dd data-fin-price>—</dd></div>
          <div><dt>Vlastní zdroje</dt><dd data-fin-own2>—</dd></div>
          <div><dt>Výše úvěru</dt><dd data-fin-loan>—</dd></div>
          <div><dt>Zaplaceno na úrocích</dt><dd data-fin-interest>—</dd></div>
        </dl>
        <a class="btn btn--inverse" href="/kontakt/">Chci pomoct s financováním ${icon('arrow-right')}</a>
        <p class="fin__disclaimer">Orientační propočet anuitní splátky. Nejde o nabídku úvěru ani o finanční poradenství.</p>
      </div>
    </div>

    <div class="pay" data-reveal>
      <h3 class="pay__t">Jak koupě probíhá</h3>
      <ol class="pay__steps">
        <li><span class="pay__n">01</span><div><b>Rezervace</b><span data-pay-1>—</span><small>Rezervační poplatek při podpisu</small></div></li>
        <li><span class="pay__n">02</span><div><b>Smlouva</b><span data-pay-2>—</span><small>Po podpisu smlouvy o smlouvě budoucí</small></div></li>
        <li><span class="pay__n">03</span><div><b>Předání</b><span data-pay-3>—</span><small>Doplatek po kolaudaci, při předání klíčů</small></div></li>
      </ol>
      <p class="pay__note">${icon('shield-check')} Modelové rozložení plateb. Konkrétní splátkový kalendář dostanete ke své jednotce.
        <a href="/pruvodce-nakupem/" class="pay__link">Projít celý proces koupě ${icon('arrow-right')}</a></p>
    </div>
  </div>
</section>

<!-- 09 — GALLERY ----------------------------------------------------------- -->
<section class="section" id="galerie">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Galerie')}<h2 class="sec-head__title h1">Projekt obrazem</h2>
      <p class="lead muted">Vizualizace projektu, ve kterém jednotka stojí.</p></div>
    </div>
    <div class="gallery" data-ud-gallery data-gallery></div>
  </div>
</section>

<!-- 10 — WHERE IS IT ------------------------------------------------------- -->
<section class="section bg-page" id="lokalita">
  <div class="container">
    <div class="loc" data-reveal>
      <div class="loc__text">
        <div class="eyebrow">${icon('map-pin')} Lokalita</div>
        <h2 class="h1" style="margin:.5rem 0 1rem" data-ud-place-name>Lokalita</h2>
        <div class="prose muted" data-ud-place-text></div>
        <ul class="near">
          ${nearby.map((n) => `<li>${icon(n.icon)} ${esc(n.label)}</li>`).join('')}
        </ul>
      </div>
      ${mapPreview('Plzeň')}
    </div>

    <div class="projcard" data-reveal>
      <img data-ud-proj-img src="" alt="" loading="lazy">
      <div class="projcard__b">
        <span class="projcard__k">O projektu</span>
        <h3 data-ud-proj-name>Projekt</h3>
        <p data-ud-proj-intro></p>
        <a class="btn btn--secondary" data-ud-project-link2 href="/projekty/">Prohlédnout celý projekt ${icon('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>

<!-- 11 — SIMILAR ----------------------------------------------------------- -->
<section class="section" data-ud-similar-wrap hidden>
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Podobné jednotky')}<h2 class="sec-head__title h1">Porovnat s dalšími jednotkami</h2>
      <p class="lead muted">Volné jednotky s podobnou plochou ve stejném projektu.</p></div>
      <a class="btn btn--secondary" href="/projekty/">Všechny jednotky ${icon('arrow-right')}</a>
    </div>
    <div class="utiles" data-ud-similar style="display:grid"></div>
  </div>
</section>

<!-- 12 — WHO IS BEHIND IT -------------------------------------------------- -->
<section class="section--tight bg-page">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Staví s vámi IKO')}<h2 class="sec-head__title h1">Proč koupit právě od IKO</h2></div></div>
    <div class="trust-grid">
      ${trust.map((t, i) => `<div class="trustc" data-reveal data-delay="${(i % 4) + 1}">
        <span class="trustc__ic">${icon(t.icon)}</span>
        <b>${esc(t.t)}</b><span>${esc(t.d)}</span>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- 13 — WHAT DO I DO NEXT ------------------------------------------------- -->
<section class="section bg-brand" id="kontakt">
  <div class="container split" style="align-items:start">
    <div data-reveal>
      ${eyebrow('Kontakt', { onbrand: true })}
      <h2 class="display" style="color:#fff;margin:.5rem 0 1rem">Zaujala vás tato<br>jednotka?</h2>
      <p style="color:rgba(255,255,255,.9);max-width:44ch">Projdeme s vámi půdorys, standard, cenu i možnosti financování. Poptávka dorazí s označením konkrétní jednotky, takže se ozve člověk, který ji zná.</p>
      <div data-ud-agent style="margin-top:1.8rem"></div>
      <a class="btn btn--ghost btn--lg" href="tel:${site.contact.phoneHref}" style="margin-top:1rem">${icon('phone')} ${esc(site.contact.phone)}</a>
      <p class="ud-addr">${esc(site.contact.company)} · ${esc(site.contact.street)}, ${esc(site.contact.city)}</p>
    </div>
    <div data-reveal data-delay="1">
      ${contactForm({ unitContext: true })}
    </div>
  </div>
</section>
</article>

<!-- mobile action bar -->
<div class="ud-bar" data-ud-bar>
  <div class="ud-bar__t"><b data-ud-bar-name></b><span data-ud-bar-sub></span></div>
  <a class="btn btn--primary btn--sm" data-ud-inquire href="/kontakt/">Mám zájem</a>
</div>

<script type="application/json" data-projmedia>${JSON.stringify(projMedia).replace(/</g, '\\u003c')}</script>
<script type="application/json" data-amenicons>${JSON.stringify(
    Object.fromEntries(AMENITIES.map((a) => [a.label, icon(a.icon)]))
  ).replace(/</g, '\\u003c')}</script>
<script type="application/json" data-agents>${JSON.stringify(
    Object.fromEntries(Object.entries(salesContact).map(([slug, pid]) => [slug, agentCard(byId(pid), { onDark: true })]))
  ).replace(/</g, '\\u003c')}</script>
${unitJSON(allUnits, { withRooms: true })}
`;
  return {
    path: '/jednotka/',
    title: 'Detail jednotky',
    description: 'Detail jednotky IKO — dispozice, půdorys a výměry, standard vybavení, orientační propočet financování, lokalita a katalogový list ke stažení.',
    body,
  };
}
