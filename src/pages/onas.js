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
    <h1 class="display balance" style="margin:1rem auto 1.4rem;max-width:16ch">Nejdřív místo. Pak dům. Nakonec domov.</h1>
    <p class="lead muted balance" style="max-width:60ch;margin-inline:auto">Domov nezačíná ve chvíli, kdy otočíte klíčem ve dveřích. Začíná mnohem dřív — výběrem místa, promyšleným návrhem a poctivě odvedenou prací na stavbě. Právě tak pracujeme v IKO stavby už od roku 1991.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container reveal-media" data-reveal>
    <img src="/photos/ujezd-drazkach-lg.jpg" alt="Dokončená obytná lokalita Újezd — Na Dražkách, oceněná Stavba roku Plzeňského kraje 2017" style="width:100%;border-radius:var(--radius-lg);aspect-ratio:16/8;object-fit:cover" loading="lazy" decoding="async">
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
      <img src="/photos/radobycice-zapad-lg.jpg" alt="Dokončené řadové domy v lokalitě Radobyčice — západ" loading="lazy" decoding="async">
    </div>
    <div data-reveal data-delay="1">
      ${eyebrow('Náš přístup')}
      <h2 class="display" style="margin:.6rem 0 1.2rem">Stavíme komunity,<br>ne jen domy.</h2>
      <div class="prose muted">
        <p>Lokality vybíráme stejně pečlivě jako naši klienti. Zajímá nás dostupnost, zeleň, sousedství i to, jak bude místo fungovat za deset let.</p>
        <p>Protože prodáváme ve vlastní režii, jednáte přímo s těmi, kdo dům staví. Bez prostředníků.</p>
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
