import { site, principles, milestones, services } from '../data/site.js';
import { projects } from '../data/projects.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, sectionHead, btn, statBand, tape } from '../components.js';
import { projectRow, principlesGrid, serviceBlock, timeline } from '../blocks.js';

export function homePage() {
  const featured = projects; // all three current projects
  const body = `
${hero()}

<section class="bg-brand" aria-label="Proč IKO v číslech">
  <div class="container">${statBand(site.stats, true)}</div>
</section>

<section class="section">
  <div class="container split split--media-first">
    <div class="split__media reveal-media" data-reveal>
      <img src="/projects/slovanske-udoli-11-lg.jpg" alt="Rodina na terase řadového domu v projektu Slovanské údolí" loading="lazy" decoding="async">
    </div>
    <div data-reveal data-delay="1">
      ${eyebrow('Kdo je IKO')}
      <h2 class="display balance" style="margin:.6rem 0 1.2rem">Místo, které si vybíráme stejně pečlivě jako vy.</h2>
      <div class="prose muted">
        <p>Jsme rodinná stavební a developerská firma z Plzně. Od roku 1991 stavíme domy — a od roku 2003 také vlastní rezidenční projekty. Vše pod jednou střechou: přípravu, realizaci i prodej.</p>
        <p>Kupujete u nás jistotu, ne jen metry čtvereční. Vlastní kapitál, vlastní realizační tým a přímé jednání znamenají, že za kvalitou stojí konkrétní lidé — ti, kteří dům skutečně staví.</p>
      </div>
      <div style="margin-top:1.8rem;display:flex;gap:.9rem;flex-wrap:wrap">
        ${btn('Náš příběh', '/o-nas/', 'ghost-ink')}
        ${btn('Naše služby', '/sluzby/', 'ghost-ink')}
      </div>
    </div>
  </div>
</section>

<section class="section bg-page" aria-labelledby="proj-h">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Aktuální nabídka',
      title: 'Projekty, do kterých se dnes stěhuje život',
      lead: 'Rezidenční bydlení v Plzni a okolí — od městských bytů po rodinné domy se zahradou. Každý projekt je samostatný architektonický příběh.',
      action: btn('Všechny projekty', '/projekty/', 'secondary'),
    })}
    <div class="proj-list">
      ${featured.map((p, i) => projectRow(p, i)).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="why-h">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Proč IKO',
      title: 'Šest důvodů, proč u nás kupujete klidněji',
      lead: 'Prodáváme ve vlastní režii, bez prostředníků. To, co slíbíme, také postavíme.',
    })}
    ${principlesGrid(principles)}
  </div>
</section>

<section class="section bg-ink" aria-labelledby="story-h">
  <div class="container split">
    <div data-reveal>
      ${eyebrow('35 let', { onbrand: true })}
      <h2 class="display" style="color:#fff;margin:.6rem 0 1.2rem">Zkušenost, kterou<br>je vidět na domech.</h2>
      <p style="color:var(--gray-300);max-width:46ch">Od první stavby v roce 1991 po dnešní rezidenční čtvrti. Podívejte se, jak se z rodinné stavební firmy stal jeden z etablovaných plzeňských developerů.</p>
      <div style="margin-top:1.8rem">${btn('Celý příběh IKO', '/o-nas/', 'inverse')}</div>
    </div>
    <div class="split__media split__media--wide reveal-media" data-reveal data-delay="1">
      <img src="/projects/radobycice-01-lg.jpg" alt="Letecký pohled na rezidenční čtvrť postavenou firmou IKO v Radobyčicích" loading="lazy" decoding="async">
    </div>
  </div>
</section>

<section class="section" aria-labelledby="svc-h">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Co děláme',
      title: 'Development i stavba pro investory',
      lead: 'Stavíme vlastní projekty a zároveň realizujeme zakázky pro externí investory.',
      action: btn('Detail služeb', '/sluzby/', 'secondary'),
    })}
    <div class="svc-cols">
      ${serviceBlock(services.development, true)}
      ${serviceBlock(services.construction, false)}
    </div>
  </div>
</section>

${ctaBand()}
`;

  return {
    path: '/',
    title: '',
    description: site.description,
    body,
    jsonLd: orgJsonLd(),
  };
}

function hero() {
  return `<section class="hero" data-hero>
  <div class="hero__media"><img src="/projects/slovanske-udoli-01-lg.jpg" alt="${esc('Rezidenční čtvrť Slovanské údolí v Plzni od developera IKO — bytové domy obklopené zelení')}" fetchpriority="high" decoding="async"></div>
  <div class="hero__scrim"></div>
  <div class="hero__meta">
    <div><div class="k">Aktuální projekt</div><div class="v">Slovanské údolí, Plzeň</div></div>
    <div style="margin-top:.6rem"><div class="k">Stav</div><div class="v">V prodeji</div></div>
  </div>
  <div class="hero__inner">
    <span class="chip-label" data-reveal>Plzeň · od roku 1991</span>
    <h1 class="hero__title" data-reveal data-delay="1">Stavíme tam, kde sami chceme bydlet.</h1>
    <p class="hero__sub" data-reveal data-delay="2">Rodinné domy, řadové domy a byty v Plzni a okolí. Od lokálního developera s 35letou tradicí — realizace i prodej pod jednou střechou.</p>
    <div class="hero__actions" data-reveal data-delay="3">
      ${btn('Prohlédnout projekty', '/projekty/', 'inverse', { lg: true })}
      ${btn('Sjednat prohlídku', '/kontakt/', 'ghost', { lg: true, arrow: false })}
    </div>
  </div>
  <a href="#main-scroll" class="scroll-cue" aria-hidden="true"><span class="line"></span> Objevujte</a>
  <span id="main-scroll"></span>
</section>`;
}

export function ctaBand() {
  return `<section class="cta-band">
  ${tape({ blue: false })}
  <div class="container cta-band__inner" data-reveal>
    <div>
      <h2 class="display">Váš nový soused<br>vás rád provede.</h2>
      <p class="lead">Ozveme se vám do 24 hodin — bez tlaku, s jasnými odpověďmi od člověka, který projekt zná.</p>
    </div>
    <div style="display:flex;gap:.9rem;flex-wrap:wrap">
      ${btn('Nezávazná poptávka', '/kontakt/', 'inverse', { lg: true })}
      <a class="btn btn--ghost btn--lg" href="tel:${site.contact.phoneHref}">${icon('phone')} ${esc(site.contact.phone)}</a>
    </div>
  </div>
</section>`;
}

function orgJsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.contact.company,
    url: site.url,
    telephone: site.contact.phoneHref,
    email: site.contact.email,
    foundingDate: '1991',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.street,
      addressLocality: 'Plzeň',
      postalCode: '326 00',
      addressCountry: 'CZ',
    },
    sameAs: [site.contact.facebook, site.contact.youtube],
  });
}
