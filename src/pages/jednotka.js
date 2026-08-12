import { allUnits, AMENITIES } from '../data/units.js';
import { projects } from '../data/projects.js';
import { site } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow } from '../components.js';
import { unitJSON } from '../units-ui.js';
import { mapPreview, contactForm, agentCard } from '../blocks.js';
import { team, salesContact, byId } from '../data/team.js';

// Per-project imagery the client picks from once it knows which unit is shown.
const projMedia = {};
for (const p of projects) {
  const pre = p.imgPrefix || p.slug;
  const n = (i) => `/projects/${pre}-${String(i).padStart(2, '0')}-lg.jpg`;
  projMedia[p.slug] = {
    hero: n(p.interiorImg),
    place: p.place,
    gallery: (p.gallery || []).slice(0, 6).map((g) => ({ src: n(g.i), alt: g.alt })),
  };
}

/* Standard equipment — the project standard, shared by every unit. */
const standards = [
  {
    ic: 'home', t: 'Povrchy a interiér',
    items: ['Dřevěná plovoucí podlaha v pokojích', 'Velkoformátová dlažba v koupelnách a chodbě',
      'Bezpolodrážkové interiérové dveře s obložkovou zárubní', 'Malba bílá, otěruvzdorná'],
  },
  {
    ic: 'ruler', t: 'Okna a stínění',
    items: ['Plastová okna s izolačním trojsklem', 'Venkovní žaluzie nebo předokenní rolety',
      'Parapety vnitřní i vnější', 'Francouzská okna na terasu či balkon'],
  },
  {
    ic: 'snowflake', t: 'Vytápění a vzduch',
    items: ['Podlahové vytápění v koupelnách', 'Deskové radiátory s termostatickou hlavicí',
      'Příprava pro klimatizaci', 'Řízené větrání společných prostor'],
  },
  {
    ic: 'shield-check', t: 'Koupelna a sanita',
    items: ['Závěsné WC s dvoutlačítkovou nádržkou', 'Umyvadlo s podomítkovou baterií',
      'Sprchový kout s vaničkou nebo vana', 'Příprava pro pračku'],
  },
  {
    ic: 'key', t: 'Bezpečnost a technologie',
    items: ['Bezpečnostní vstupní dveře', 'Domovní videotelefon', 'Datové rozvody v pokojích',
      'Příprava pro chytrou domácnost'],
  },
  {
    ic: 'leaf', t: 'Dům a okolí',
    items: ['Zateplená fasáda a zelené střechy přístřešků', 'Sklepní kóje a kolárna',
      'Parkování v domě nebo na pozemku', 'Sadové úpravy a pěší cesty'],
  },
];

const downloads = [
  { ic: 'file-text', t: 'Katalogový list jednotky', d: 'Půdorys, výměry a rozsah dodávky', href: '/katalogovy-list-vzor.pdf' },
  { ic: 'download', t: 'Brožura se standardem', d: 'Kompletní seznam materiálů a vybavení', href: '/katalogovy-list-vzor.pdf' },
  { ic: 'calendar', t: 'Průvodce nákupem', d: 'Proces koupě, financování a klientské změny', href: '/pruvodce-nakupem/', ext: false },
];

const navLinks = [
  ['prehled', 'Přehled'], ['pudorys', 'Půdorys'], ['standard', 'Standard'],
  ['financovani', 'Financování'], ['galerie', 'Galerie'], ['lokalita', 'Lokalita'], ['ke-stazeni', 'Ke stažení'],
];

export function jednotkaPage() {
  const body = `
<article data-unit-detail>

<!-- Hero: interior visualization with the unit summary over it -->
<section class="ud-hero">
  <div class="ud-hero__media"><img data-ud-hero src="" alt="Vizualizace interiéru" fetchpriority="high" decoding="async"></div>
  <div class="ud-hero__scrim"></div>
  <div class="container ud-hero__inner">
    <nav class="crumb crumb--onmedia" aria-label="Drobečková navigace">
      <a href="/projekty/">Projekty</a> ${icon('arrow-right')} <a data-ud-project-link href="/projekty/">Projekt</a> ${icon('arrow-right')} <span data-ud-crumb>Jednotka</span>
    </nav>
    <div class="ud-hero__row">
      <div>
        <div class="ud-hero__eyebrow" data-ud-eyebrow>Jednotka</div>
        <h1 class="ud-hero__title" data-ud-title>Jednotka</h1>
        <ul class="ud-hero__facts" data-ud-herofacts></ul>
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

<!-- Sticky in-page nav + price, appears once the hero scrolls away -->
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

<!-- Overview: parameters + equipment -->
<section class="section" id="prehled">
  <div class="container split" style="align-items:start">
    <div data-reveal>
      ${eyebrow('Parametry jednotky')}
      <h2 class="h1" style="margin:.5rem 0 1.2rem">Co o jednotce víme</h2>
      <div class="umodal__specs" data-ud-specs></div>
      <div class="demo-note">${icon('shield-check')}<span>Dispozice a půdorys vycházejí z reálných podkladů IKO. Cena, plocha a dostupnost jsou v této ukázce demonstrační.</span></div>
    </div>
    <div data-reveal data-delay="1">
      ${eyebrow('Vybavení jednotky')}
      <h2 class="h1" style="margin:.5rem 0 1.2rem">Co k jednotce patří</h2>
      <ul class="ud-amen" data-ud-amen></ul>
      <div class="ud-note">${icon('quote')}<p>Rozsah dodávky i možnosti klientských změn vám rádi projdeme položku po položce — stačí se ozvat.</p></div>
    </div>
  </div>
</section>

<!-- Floor plan -->
<section class="section bg-page" id="pudorys">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Půdorys')}<h2 class="sec-head__title h1">Jak je jednotka řešená</h2>
      <p class="lead muted">Kliknutím si půdorys otevřete ve větším. Kompletní výměry najdete v katalogovém listu.</p></div>
      <a class="btn btn--secondary" data-ud-pdf href="/katalogovy-list-vzor.pdf" download>${icon('download')} Katalogový list</a>
    </div>
    <a class="ud-plan" data-ud-plan-link href="#" target="_blank" rel="noopener" data-reveal>
      <img data-ud-plan src="" alt="Půdorys jednotky" loading="lazy">
    </a>
  </div>
</section>

<!-- Standard -->
<section class="section" id="standard">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Standard')}<h2 class="sec-head__title h1">Vysoký standard v ceně jednotky</h2>
      <p class="lead muted">Materiály a technologie, které dodáváme jako součást ceny — bez příplatků a bez dohadování.</p></div>
    </div>
    <div class="std-grid">
      ${standards.map((s, i) => `<div class="std" data-reveal data-delay="${(i % 3) + 1}">
        <div class="std__ic">${icon(s.ic)}</div>
        <h3 class="std__t">${esc(s.t)}</h3>
        <ul class="std__list">${s.items.map((it) => `<li>${icon('check')}<span>${esc(it)}</span></li>`).join('')}</ul>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Financing: interactive calculator for this unit's price -->
<section class="section bg-ink" id="financovani">
  <div class="container">
    <div class="sec-head sec-head--onbrand" data-reveal><div>${eyebrow('Financování', { onbrand: true })}
      <h2 class="sec-head__title h1" style="color:#fff">Spočítejte si splátku pro tuto jednotku</h2>
      <p class="lead" style="color:var(--gray-300)">Posuňte vlastní zdroje a dobu splácení. Výpočet je orientační — konkrétní nabídku vám připravíme na míru.</p></div>
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
        <div class="fin__k">Měsíční splátka</div>
        <div class="fin__v" data-fin-monthly>—</div>
        <dl class="fin__break">
          <div><dt>Cena jednotky</dt><dd data-fin-price>—</dd></div>
          <div><dt>Vlastní zdroje</dt><dd data-fin-own2>—</dd></div>
          <div><dt>Výše úvěru</dt><dd data-fin-loan>—</dd></div>
          <div><dt>Celkem zaplaceno na úrocích</dt><dd data-fin-interest>—</dd></div>
        </dl>
        <a class="btn btn--inverse" href="/kontakt/">Chci pomoct s financováním ${icon('arrow-right')}</a>
        <p class="fin__disclaimer">Orientační propočet anuitní splátky. Nejde o nabídku úvěru ani o finanční poradenství.</p>
      </div>
    </div>

    <div class="pay" data-reveal>
      <h3 class="pay__t">Jak platba probíhá</h3>
      <ol class="pay__steps">
        <li><span class="pay__n">1</span><div><b>Rezervační poplatek</b><span data-pay-1>—</span><small>Při podpisu rezervační smlouvy</small></div></li>
        <li><span class="pay__n">2</span><div><b>Po podpisu SoSB</b><span data-pay-2>—</span><small>Smlouva o smlouvě budoucí kupní</small></div></li>
        <li><span class="pay__n">3</span><div><b>Doplatek při předání</b><span data-pay-3>—</span><small>Po kolaudaci, při předání klíčů</small></div></li>
      </ol>
      <p class="pay__note">${icon('shield-check')} Modelové rozložení plateb. Konkrétní splátkový kalendář dostanete ke své jednotce.</p>
    </div>
  </div>
</section>

<!-- Gallery -->
<section class="section" id="galerie">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Galerie')}<h2 class="sec-head__title h1">Jak se tu bude bydlet</h2></div></div>
    <div class="gallery" data-ud-gallery data-gallery></div>
  </div>
</section>

<!-- Location -->
<section class="section--tight" id="lokalita">
  <div class="container">
    <div class="loc" data-reveal>
      <div class="loc__text">
        <div class="eyebrow">${icon('map-pin')} Lokalita</div>
        <h3 class="h2" style="margin:.5rem 0 1rem" data-ud-place-name>Lokalita</h3>
        <div class="prose muted" data-ud-place-text></div>
        <div style="margin-top:1.6rem"><a class="btn btn--secondary" data-ud-project-link2 href="/projekty/">Zobrazit celý projekt ${icon('arrow-right')}</a></div>
      </div>
      ${mapPreview('Plzeň')}
    </div>
  </div>
</section>

<!-- Similar units -->
<section class="section bg-page" data-ud-similar-wrap hidden>
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Podobné jednotky')}<h2 class="sec-head__title h1">Srovnejte s dalšími v projektu</h2>
      <p class="lead muted">Jednotky s podobnou dispozicí a plochou, které jsou stále volné.</p></div>
      <a class="btn btn--secondary" href="/projekty/">Všechny jednotky ${icon('arrow-right')}</a>
    </div>
    <div class="utiles" data-ud-similar style="display:grid"></div>
  </div>
</section>

<!-- Downloads -->
<section class="section" id="ke-stazeni">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Ke stažení')}<h2 class="sec-head__title h1">Podklady k jednotce</h2></div></div>
    <div class="dl-grid">
      ${downloads.map((d, i) => `<a class="dl" href="${d.href}"${d.ext === false ? '' : ' download'} data-reveal data-delay="${(i % 3) + 1}">
        <span class="dl__ic">${icon(d.ic)}</span>
        <span class="dl__b"><b>${esc(d.t)}</b><small>${esc(d.d)}</small></span>
        ${icon('arrow-right')}
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- Contact: assigned salesperson + a form that carries this unit -->
<section class="section bg-brand" id="kontakt">
  <div class="container split" style="align-items:start">
    <div data-reveal>
      ${eyebrow('Kontakt', { onbrand: true })}
      <h2 class="display" style="color:#fff;margin:.5rem 0 1rem">Zeptejte se přímo<br>na tuto jednotku.</h2>
      <p style="color:rgba(255,255,255,.9);max-width:44ch">Poptávka dorazí s označením konkrétní jednotky, takže se vám ozve člověk, který ji zná. Odpovídáme do 24 hodin.</p>
      <div data-ud-agent style="margin-top:1.8rem"></div>
      <a class="btn btn--ghost btn--lg" href="tel:${site.contact.phoneHref}" style="margin-top:1rem">${icon('phone')} ${esc(site.contact.phone)}</a>
    </div>
    <div data-reveal data-delay="1">
      ${contactForm({ unitContext: true })}
    </div>
  </div>
</section>
</article>

<script type="application/json" data-projmedia>${JSON.stringify(projMedia).replace(/</g, '\\u003c')}</script>
<script type="application/json" data-amenicons>${JSON.stringify(
    Object.fromEntries(AMENITIES.map((a) => [a.label, icon(a.icon)]))
  ).replace(/</g, '\\u003c')}</script>
<script type="application/json" data-agents>${JSON.stringify(
    Object.fromEntries(Object.entries(salesContact).map(([slug, pid]) => [slug, agentCard(byId(pid), { onDark: true })]))
  ).replace(/</g, '\\u003c')}</script>
${unitJSON(allUnits)}
`;
  return {
    path: '/jednotka/',
    title: 'Detail jednotky',
    description: 'Detail jednotky IKO — dispozice, plocha, půdorys, standard vybavení, orientační propočet financování a katalogový list ke stažení.',
    body,
  };
}
