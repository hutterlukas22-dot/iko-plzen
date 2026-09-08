import { site, principles } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, btn, statBand } from '../components.js';
import { principlesGrid } from '../blocks.js';
import { ctaBand } from './home.js';

const pillars = [
  { ic: 'handshake', t: 'Přímé jednání', d: 'Jednáte přímo s tím, kdo dům staví a prodává. Bez prostředníků, bez alibismu — s odpovědností, kterou rodinná firma unese svým jménem.' },
  { ic: 'shield-check', t: 'Kvalita provedení', d: 'Realizaci vedou naši vlastní stavbyvedoucí a mistři. Kvalitu hlídáme od základů po předání klíčů, ne přes anonymní subdodávky.' },
  { ic: 'map-pin', t: 'Blízký vztah k lokalitě', d: 'Stavíme tam, kde se sami vyznáme. Známe Plzeň, její čtvrti i to, jak bude místo fungovat za deset let — a podle toho vybíráme pozemky.' },
];

export function procIkoPage() {
  const body = `
<section class="section--tight bg-brand" style="padding-top:calc(var(--header-h) + clamp(2rem,5vw,4rem))">
  <div class="container" data-reveal>
    ${eyebrow('Proč IKO', { onbrand: true })}
    <h1 class="display balance" style="color:#fff;margin:.6rem 0 1rem;max-width:22ch">Protože nový domov není položka v ceníku.</h1>
    <p class="lead" style="color:rgba(255,255,255,.92);max-width:62ch">Výběr developera není jen o ceně za metr nebo hezké vizualizaci. Je to rozhodnutí na roky dopředu. O lokalitě, kvalitě stavby, každodenním pohodlí i o tom, kdo zvedne telefon, když něco potřebujete vyřešit.</p>
  </div>
</section>

<section class="section">
  <div class="container split split--media-first">
    <div class="split__media reveal-media" data-reveal>
      <img src="/photos/home-lokalita-lg.jpg" alt="Dokončená obytná lokalita IKO v Plzni" loading="lazy" decoding="async">
    </div>
    <div data-reveal data-delay="1">
      ${eyebrow('Koncept')}
      <h2 class="display" style="margin:.6rem 0 1.2rem">Stavební firma<br>i developer.</h2>
      <div class="prose muted">
        <p>V IKO stavby spojujeme zkušenost stavební firmy s přístupem developera, který zná své projekty od první čáry až po předání klíčů.</p>
        <p>Stavíme v Plzni a blízkém okolí, kde jsme doma — a za každým projektem si stojíme vlastním jménem.</p>
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

<section class="bg-brand"><div class="container">${statBand(site.stats, true)}</div></section>

<section class="section">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Výhody pro klienty')}<h2 class="sec-head__title h1">6 důvodů, proč u nás kupujete klidněji</h2></div></div>
    ${principlesGrid(principles)}
  </div>
</section>

${ctaBand()}
`;
  return {
    path: '/proc-iko/',
    title: 'Proč IKO',
    description: 'Proč IKO — stavební firma i developer v jednom. Zkušenost od roku 1991, projekty v Plzni a okolí, prodej bez prostředníků.',
    body,
    ogImage: '/projects/slovanske-udoli-11-lg.jpg',
  };
}
