import { site, principles } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, btn, statBand } from '../components.js';
import { principlesGrid } from '../blocks.js';
import { ctaBand } from './home.js';

const pillars = [
  { ic: 'handshake', t: 'Důvěra souseda', d: 'Jednáte přímo s tím, kdo dům staví a prodává. Bez prostředníků, bez alibismu — s odpovědností, kterou rodinná firma unese svým jménem.' },
  { ic: 'shield-check', t: 'Kvalita provedení', d: 'Realizaci vedou naši vlastní stavbyvedoucí a mistři. Kvalitu hlídáme od základů po předání klíčů, ne přes anonymní subdodávky.' },
  { ic: 'map-pin', t: 'Blízký vztah k lokalitě', d: 'Stavíme tam, kde se sami vyznáme. Známe Plzeň, její čtvrti i to, jak bude místo fungovat za deset let — a podle toho vybíráme pozemky.' },
];

export function procIkoPage() {
  const body = `
<section class="section--tight bg-brand" style="padding-top:calc(var(--header-h) + clamp(2rem,5vw,4rem))">
  <div class="container" data-reveal>
    ${eyebrow('Proč IKO', { onbrand: true })}
    <h1 class="display balance" style="color:#fff;margin:.6rem 0 1rem;max-width:20ch">Soused-stavitel. Stavíme tam, kde bychom sami chtěli bydlet.</h1>
    <p class="lead" style="color:rgba(255,255,255,.92);max-width:60ch">Nejsme anonymní developer. Jsme rodinná firma z Plzně, která za každým domem stojí svým jménem — a která se do svých čtvrtí ráda vrací jako soused, ne jako dodavatel.</p>
  </div>
</section>

<section class="section">
  <div class="container split split--media-first">
    <div class="split__media reveal-media" data-reveal>
      <img src="/projects/slovanske-udoli-11-lg.jpg" alt="Lidé na terase v rezidenční čtvrti postavené firmou IKO" loading="lazy" decoding="async">
    </div>
    <div data-reveal data-delay="1">
      ${eyebrow('Koncept')}
      <h2 class="display" style="margin:.6rem 0 1.2rem">Co znamená<br>„soused-stavitel".</h2>
      <div class="prose muted">
        <p>Soused-stavitel je někdo, kdo staví domy tak, jako by v nich měl bydlet on sám — protože často opravdu staví ve čtvrtích, které dobře zná a má rád. Nejde jen o metry čtvereční, ale o to, jak se v místě bude žít.</p>
        <p>Tenhle přístup drží pohromadě tři věci: důvěru, kvalitu řemesla a blízký vztah k lokalitě. Právě ty z IKO dělají partnera pro rozhodnutí, které děláte jednou za život.</p>
      </div>
      <div style="margin-top:1.8rem">${btn('Naše projekty', '/projekty/', 'secondary')}</div>
    </div>
  </div>
</section>

<section class="section--tight bg-page">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Tři pilíře')}<h2 class="sec-head__title h1">Na čem stavíme důvěru</h2></div></div>
    <div class="card-grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))">
      ${pillars.map((p, i) => `<div class="svc" data-reveal data-delay="${(i % 3) + 1}">
        <div style="width:48px;height:48px;border-radius:var(--radius-md);background:var(--blue-50);color:var(--iko-blue);display:grid;place-items:center;margin-bottom:1.1rem"><span style="width:24px;height:24px;display:block">${icon(p.ic)}</span></div>
        <h3 style="font-size:var(--fs-h3)">${esc(p.t)}</h3>
        <p class="muted" style="margin-top:.5rem;font-size:var(--fs-sm)">${esc(p.d)}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="bg-ink"><div class="container">${statBand(site.stats, true)}</div></section>

<section class="section">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Výhody pro klienty')}<h2 class="sec-head__title h1">Šest důvodů, proč u nás kupujete klidněji</h2></div></div>
    ${principlesGrid(principles)}
  </div>
</section>

${ctaBand()}
`;
  return {
    path: '/proc-iko/',
    title: 'Proč IKO',
    description: 'Proč IKO — koncept „soused-stavitel": důvěra, kvalita provedení a blízký vztah k lokalitám v Plzni. Rodinná developerská firma od roku 1991.',
    body,
    ogImage: '/projects/slovanske-udoli-11-lg.jpg',
  };
}
