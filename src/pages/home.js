import { site, principles, milestones, services } from '../data/site.js';
import { projects } from '../data/projects.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, sectionHead, btn, statBand, tape, IKO_MARK } from '../components.js';
import { projectRow, principlesGrid, serviceBlock, timeline, newsCard } from '../blocks.js';
import { newsSorted } from '../data/news.js';

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
      <img src="/photos/home-domov-lg.jpg" alt="Dokončený rodinný dům IKO s terasou v Plzni-Černicích" loading="lazy" decoding="async">
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
      title: 'V čem jsme lepší',
      lead: 'Prodáváme ve vlastní režii, bez prostředníků. To, co slíbíme, také postavíme.',
    })}
    ${principlesGrid(principles)}
  </div>
</section>

<!-- media bleeds to the section's top, right and bottom edges, so it sits outside
     the container; on mobile it falls back into the flow below the copy -->
<section class="section bg-ink edge-band" aria-labelledby="story-h">
  <div class="container edge-band__inner">
    <div data-reveal>
      ${eyebrow('35 let', { onbrand: true })}
      <h2 class="display" style="color:#fff;margin:.6rem 0 1.2rem">Zkušenost, kterou<br>je vidět na domech.</h2>
      <p style="color:var(--gray-300);max-width:46ch">Od první stavby v roce 1991 po dnešní rezidenční čtvrti. Podívejte se, jak se z rodinné stavební firmy stal jeden z etablovaných plzeňských developerů.</p>
      <div style="margin-top:1.8rem">${btn('Celý příběh IKO', '/o-nas/', 'inverse')}</div>
    </div>
  </div>
  <figure class="edge-band__media">
    <img src="/photos/home-lokalita-lg.jpg" alt="Dokončená obytná lokalita IKO v Plzni-Černicích" loading="lazy" decoding="async">
  </figure>
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

<section class="section" aria-labelledby="news-h">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Aktuality',
      title: 'Co je nového u IKO',
      lead: 'Kolaudace, zahájení prodeje i dny otevřených dveří — novinky ze všech projektů na jednom místě.',
      action: btn('Všechny aktuality', '/aktuality/', 'secondary'),
    })}
    <div class="card-grid">${newsSorted.slice(0, 3).map((n, i) => newsCard(n, i)).join('')}</div>
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

/* Hero carousel — one slide per current offer, each with the client's own clip. */
const heroSlides = [
  { tab: 'Slovanské údolí — byty', name: 'Rezidence Slovanské údolí — byty', location: 'Plzeň — Slovanské údolí',
    status: 'V prodeji', video: '/video/hero-slovanske-byty.mp4', poster: '/projects/slovanske-udoli-05-lg.jpg',
    href: '/projekty/rezidence-slovanske-udoli/' },
  { tab: 'Slovanské údolí — domy', name: 'Rezidence Slovanské údolí — domy', location: 'Plzeň — Slovanské údolí',
    status: 'V prodeji', video: '/video/hero-slovanske-domy.mp4', poster: '/projects/slovanske-udoli-11-lg.jpg',
    href: '/projekty/rezidence-slovanske-udoli/' },
  { tab: 'Cukrovarská', name: 'Bytový dům Cukrovarská', location: 'Plzeň — Cukrovarská',
    status: 'Připravujeme', video: '/video/hero-cukrovarska.mp4', poster: '/projects/cukrovarska-01-lg.jpg',
    href: '/projekty/bytovy-dum-cukrovarska/' },
];

function hero() {
  const slides = heroSlides
    .map(
      (s, i) => `<div class="hero__slide${i === 0 ? ' is-active' : ''}" data-slide="${i}">
      <video class="hero__video" poster="${s.poster}" muted loop playsinline
        preload="${i === 0 ? 'auto' : 'none'}" aria-hidden="true" tabindex="-1"
        data-src="${s.video}"${i === 0 ? ` src="${s.video}"` : ''}></video>
    </div>`
    )
    .join('');

  const nav = heroSlides
    .map(
      (s, i) => `<button class="hero__dot${i === 0 ? ' is-active' : ''}" data-goto="${i}"
      aria-label="Zobrazit projekt ${esc(s.name)}"${i === 0 ? ' aria-current="true"' : ''}>
      <span class="hero__dot-bar"><span class="hero__dot-fill"></span></span>
      <span class="hero__dot-label">${esc(s.tab)}</span>
    </button>`
    )
    .join('');

  const meta = heroSlides
    .map(
      (s, i) => `<a class="hero__meta-item${i === 0 ? ' is-active' : ''}" data-meta="${i}" href="${s.href}">
      <span class="k">Aktuální projekt</span>
      <span class="v">${esc(s.name)}</span>
      <span class="hero__meta-status">${icon('map-pin')} ${esc(s.location)} · ${esc(s.status)}</span>
    </a>`
    )
    .join('');

  return `<section class="hero" data-hero data-carousel>
  <div class="hero__media">${slides}</div>
  <div class="hero__scrim"></div>
  <div class="hero__inner">
    <span class="hero__eyebrow" data-reveal>Plzeň · od roku 1991</span>
    <h1 class="hero__title" data-reveal data-delay="1">Stavíme tam, kde sami chceme bydlet.</h1>
    <p class="hero__sub" data-reveal data-delay="2">Protože domov není jen místo, kde žijete. Je to místo, kam se každý den chcete vracet.</p>
    <p class="hero__sub hero__sub--2" data-reveal data-delay="2">Tvoříme rodinné domy, řadové domy a byty v Plzni a jejím okolí. Vybíráme místa, která mají budoucnost, navrhujeme domy pro skutečný život a celý proces držíme pod jednou střechou.</p>
    <div class="hero__actions" data-reveal data-delay="3">
      ${btn('Prohlédnout projekty', '/projekty/', 'inverse', { lg: true })}
      ${btn('Sjednat prohlídku', '/kontakt/', 'ghost', { lg: true, arrow: false })}
    </div>
  </div>
  <div class="hero__bar">
    <div class="hero__meta">${meta}</div>
    <div class="hero__nav" aria-label="Přepínač projektů">${nav}</div>
  </div>
  <span id="main-scroll"></span>
</section>`;
}

/* IKO bands layered over each other at angles, as in the brand manual. They carry
   the drawn logotype, not set type — Pepi ships only Regular and Bold, so no
   typeset weight matches the mark's density. Each band scrolls on its own
   (duplicated content, translated -50%). */
function tapeBlock() {
  const cell = Array.from({ length: 9 }, () => `<span>${IKO_MARK}</span>`).join('');
  const bands = [1, 2, 3, 4]
    .map((i) => `<div class="tband tband--${i}"><div class="tband__t">${cell}${cell}</div></div>`)
    .join('');
  return `<div class="tapeblock" aria-hidden="true">${bands}</div>`;
}

export function ctaBand() {
  // The bands sit outside the container so they can bleed to the section's top,
  // left and bottom edges instead of stopping at the gutter.
  return `<section class="cta-band" id="zacnime">
  ${tapeBlock()}
  <div class="container cta-band__inner" data-reveal>
    <div class="cta-band__c">
      <h2 class="display">Začněme u vašich představ.</h2>
      <p class="lead">Řekněte nám, co hledáte. My vám představíme možnosti, které nejlépe odpovídají vašim potřebám.</p>
      <div style="display:flex;gap:.9rem;flex-wrap:wrap;margin-top:1.8rem">
        ${btn('Nezávazná poptávka', '/kontakt/', 'inverse', { lg: true })}
        <a class="btn btn--ghost btn--lg" href="tel:${site.contact.phoneHref}">${icon('phone')} ${esc(site.contact.phone)}</a>
      </div>
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
