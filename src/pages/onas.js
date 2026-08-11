import { site, milestones, principles } from '../data/site.js';
import { esc } from '../lib/util.js';
import { eyebrow, btn, statBand } from '../components.js';
import { timeline, principlesGrid } from '../blocks.js';
import { ctaBand } from './home.js';

export function onasPage() {
  const body = `
<section class="section--tight" style="padding-top:calc(var(--header-h) + clamp(2.5rem,6vw,5rem))">
  <div class="container container--narrow" style="text-align:center" data-reveal>
    ${eyebrow('O nás')}
    <h1 class="display balance" style="margin:1rem auto 1.4rem;max-width:16ch">Rodinná firma, která v Plzni staví od roku 1991.</h1>
    <p class="lead muted balance" style="max-width:60ch;margin-inline:auto">Začínali jsme jako stavební firma dodávající domy na klíč. Dnes připravujeme, stavíme a prodáváme vlastní rezidenční projekty — a stále platí, že stavíme tam, kde bychom sami chtěli bydlet.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container reveal-media" data-reveal>
    <img src="/projects/slovanske-udoli-06-lg.jpg" alt="Letecký pohled na rozsáhlou rezidenční čtvrť Slovanské údolí realizovanou firmou IKO" style="width:100%;border-radius:var(--radius-lg);aspect-ratio:16/8;object-fit:cover" loading="lazy" decoding="async">
  </div>
</section>

<section class="bg-brand"><div class="container">${statBand(site.stats, true)}</div></section>

<section class="section" aria-labelledby="tl-h">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Náš příběh')}<h2 class="sec-head__title h1" id="tl-h">Cesta od stavební firmy k developerovi</h2></div></div>
    ${timeline(milestones)}
  </div>
</section>

<section class="section bg-page">
  <div class="container split split--media-first">
    <div class="split__media reveal-media" data-reveal>
      <img src="/projects/cukrovarska-02-lg.jpg" alt="Bytový dům Cukrovarská ve zavedené plzeňské ulici se vzrostlým stromem" loading="lazy" decoding="async">
    </div>
    <div data-reveal data-delay="1">
      ${eyebrow('Náš přístup')}
      <h2 class="display" style="margin:.6rem 0 1.2rem">Stavíme komunity,<br>ne jen domy.</h2>
      <div class="prose muted">
        <p>Lokality vybíráme stejně pečlivě jako naši klienti. Zajímá nás dostupnost, zeleň, sousedství i to, jak bude místo fungovat za deset let.</p>
        <p>Protože prodáváme ve vlastní režii, jednáte přímo s těmi, kdo dům staví. Bez prostředníků, bez přehazování zodpovědnosti — s jistotou, kterou rodinná firma s 35letou historií unese.</p>
      </div>
      <div style="margin-top:1.8rem">${btn('Naše projekty', '/projekty/', 'secondary')}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Proč IKO')}<h2 class="sec-head__title h1">V čem je rozdíl</h2></div></div>
    ${principlesGrid(principles)}
  </div>
</section>

${ctaBand()}
`;
  return {
    path: '/o-nas/',
    title: 'O nás',
    description: 'IKO stavby s.r.o. — rodinná stavební a developerská firma z Plzně od roku 1991. Náš příběh, hodnoty a přístup k rezidenční výstavbě.',
    body,
    ogImage: '/projects/slovanske-udoli-06-lg.jpg',
  };
}
