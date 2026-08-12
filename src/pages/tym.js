import { site } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow } from '../components.js';
import { teamCard } from '../blocks.js';
import { ctaBand } from './home.js';

import { team } from '../data/team.js';

export function tymPage() {
  const body = `
<section class="section--tight" style="padding-top:calc(var(--header-h) + clamp(2.5rem,6vw,5rem))">
  <div class="container container--narrow" data-reveal>
    ${eyebrow('Tým')}
    <h1 class="display balance" style="margin:1rem 0 1.2rem;max-width:18ch">Lidé, se kterými stavíte váš domov.</h1>
    <p class="lead muted" style="max-width:58ch">U IKO jednáte s konkrétními lidmi, ne s call centrem. Seznamte se s těmi, kteří vás provedou od prvního dotazu po předání klíčů.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))">
      ${team.map((p, i) => teamCard(p, i)).join('')}
    </div>
    <div class="demo-note">${icon('shield-check')}<span>Jména, fotografie a kontakty jsou v této ukázce demonstrační. V ostrém provozu je nahradí skutečný tým IKO.</span></div>
  </div>
</section>

<section class="section--tight bg-page">
  <div class="container grid-2" style="align-items:center">
    <div data-reveal>
      ${eyebrow('Kontakt')}
      <h2 class="display" style="margin:.5rem 0 1rem">Nevíte, na koho se obrátit?</h2>
      <p class="muted" style="max-width:44ch">Napište nebo zavolejte na centrální kontakt a my vás nasměrujeme na správného člověka.</p>
    </div>
    <div data-reveal data-delay="1" style="display:flex;flex-direction:column;gap:1rem">
      <a class="btn btn--primary btn--lg" href="tel:${site.contact.phoneHref}">${icon('phone')} ${esc(site.contact.phone)}</a>
      <a class="btn btn--secondary btn--lg" href="mailto:${site.contact.email}">${icon('mail')} ${esc(site.contact.email)}</a>
    </div>
  </div>
</section>

${ctaBand()}
`;
  return {
    path: '/tym/',
    title: 'Tým',
    description: 'Tým IKO — lidé, kteří vás provedou koupí nemovitosti od prvního dotazu po předání klíčů. Prodej, stavba, klientské změny a financování.',
    body,
  };
}
