import { allUnits } from '../data/units.js';
import { icon } from '../lib/util.js';
import { eyebrow, btn } from '../components.js';
import { unitJSON } from '../units-ui.js';

export function porovnatPage() {
  const body = `
<section class="section" style="padding-top:calc(var(--header-h) + clamp(2rem,5vw,4rem))">
  <div class="container">
    <div class="sec-head" data-reveal>
      <div>${eyebrow('Porovnávač')}<h2 class="sec-head__title h1">Porovnejte si vybrané jednotky</h2>
      <p class="lead muted">Přidávejte byty a domy tlačítkem „Porovnat" u jednotlivých jednotek a srovnejte je vedle sebe.</p></div>
      ${btn('Vybrat jednotky', '/projekty/', 'secondary')}
    </div>
    <div data-compare-root></div>
  </div>
</section>
${unitJSON(allUnits)}
`;
  return {
    path: '/porovnat/',
    title: 'Porovnávač jednotek',
    description: 'Porovnávač jednotek IKO — srovnejte si vybrané byty a domy vedle sebe podle dispozice, plochy, patra, ceny a stavu.',
    body,
  };
}
