import { esc, icon } from '../lib/util.js';
import { eyebrow, btn } from '../components.js';
import { faqList } from '../blocks.js';
import { ctaBand } from './home.js';

const steps = [
  { t: 'Výběr jednotky', d: 'Vyberte si byt nebo dům podle dispozice, plochy a patra. Pomůže vám interaktivní výběr podle podlaží i porovnávač jednotek.' },
  { t: 'Nezávazná rezervace', d: 'Vybranou jednotku vám na dohodnutou dobu blokujeme. Bez závazku a bez poplatku, než si vše v klidu promyslíte.' },
  { t: 'Financování', d: 'Projdeme s vámi možnosti financování a pomůžeme zajistit hypotéku. Poradíme s výší splátky i s načasováním.' },
  { t: 'Rezervační smlouva', d: 'Podpisem rezervační smlouvy a složením rezervačního poplatku je jednotka závazně vaše.' },
  { t: 'Klientské změny', d: 'Máte prostor upravit standard podle sebe — dispoziční i materiálové změny řešíme interně s naším studiem.' },
  { t: 'Smlouva a předání', d: 'Následuje smlouva o smlouvě budoucí, dokončení stavby a předání hotového domova s protokolem a klíči.' },
];

const financing = [
  { ic: 'wallet', t: 'Hypotéka', d: 'Provedeme vás nabídkami bank a pomůžeme vybrat řešení na míru — bez běhání po pobočkách.' },
  { ic: 'key', t: 'Vlastní zdroje', d: 'Kupujete-li z vlastního, nastavíme splátkový kalendář podle postupu výstavby.' },
  { ic: 'handshake', t: 'Kombinace', d: 'Část vlastními prostředky, část hypotékou — poradíme s optimálním poměrem.' },
];

const faqs = [
  { q: 'Jak dlouho platí nezávazná rezervace?', a: 'Vybranou jednotku vám blokujeme po dohodnutou dobu (obvykle několik dní), abyste měli klid na rozmyšlenou i na jednání s bankou. Konkrétní podmínky vám sdělíme u konkrétní jednotky.' },
  { q: 'Mohu si upravit dispozici nebo standard bytu?', a: 'Ano. Klientské změny — dispoziční i materiálové — zpracováváme interně ve spolupráci s projektovým studiem. Rozsah závisí na fázi výstavby dané jednotky.' },
  { q: 'Pomůžete mi se zajištěním hypotéky?', a: 'Pomůžeme. Projdeme s vámi nabídky bank a pomůžeme vybrat financování na míru. Cílem je, abyste vše vyřídili s minimem starostí.' },
  { q: 'Kdy platím jakou částku?', a: 'Platby jsou navázané na jednotlivé kroky — rezervační poplatek, smlouvu o smlouvě budoucí a doplatek při předání. Přesný splátkový kalendář dostanete ke konkrétní jednotce.' },
  { q: 'Co všechno je součástí ceny?', a: 'Rozsah dodávky je uvedený v podkladech ke každé jednotce (prodejní list a katalogový list). Rádi vám ho projdeme položku po položce.' },
  { q: 'Jak probíhá předání?', a: 'Po kolaudaci vás pozveme na předání, kde společně zkontrolujeme byt, sepíšeme protokol a předáme klíče. Případné připomínky řešíme obratem.' },
];

export function pruvodceNakupemPage() {
  const body = `
<section class="section--tight" style="padding-top:calc(var(--header-h) + clamp(2.5rem,6vw,5rem))">
  <div class="container container--narrow" data-reveal>
    ${eyebrow('Průvodce nákupem')}
    <h1 class="display balance" style="margin:1rem 0 1.2rem;max-width:20ch">Cesta k novému domovu, krok za krokem.</h1>
    <p class="lead muted" style="max-width:60ch">Provedeme vás celým procesem od výběru jednotky až po předání klíčů — přehledně, bez tlaku a s pomocí, kdykoli ji budete potřebovat.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Proces koupě')}<h2 class="sec-head__title h1">Šest kroků k rezervaci</h2></div></div>
    <div class="steps">
      ${steps.map((s, i) => `<div class="step" data-reveal data-delay="${(i % 3) + 1}"><div class="step__n">${i + 1}</div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section bg-page">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Financování')}<h2 class="sec-head__title h1">Jak koupi zaplatit</h2>
    <p class="lead muted">S financováním vám aktivně pomůžeme — ať začínáte, nebo měníte bydlení.</p></div></div>
    <div class="svc-cols" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))">
      ${financing.map((f, i) => `<div class="svc" data-reveal data-delay="${(i % 3) + 1}">
        <div style="width:48px;height:48px;border-radius:var(--radius-md);background:var(--blue-50);color:var(--iko-blue);display:grid;place-items:center;margin-bottom:1.1rem"><span style="width:24px;height:24px;display:block">${icon(f.ic)}</span></div>
        <h3 style="font-size:var(--fs-h3)">${esc(f.t)}</h3><p class="muted" style="margin-top:.5rem;font-size:var(--fs-sm)">${esc(f.d)}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container split" style="align-items:center">
    <div class="split__media reveal-media" data-reveal>
      <img src="/projects/cukrovarska-07-lg.jpg" alt="Interiér bytu — prostor pro klientské změny standardu" loading="lazy" decoding="async">
    </div>
    <div data-reveal data-delay="1">
      ${eyebrow('Klientské změny')}
      <h2 class="display" style="margin:.6rem 0 1.1rem">Standard, který si upravíte podle sebe.</h2>
      <p class="muted" style="max-width:46ch">Dispoziční i materiálové úpravy zpracováváme interně ve spolupráci s projektovým studiem. Domov tak vznikne přesně podle vašich představ — a vy máte jednoho partnera na všechno.</p>
      <div style="margin-top:1.8rem">${btn('Vybrat jednotku', '/projekty/', 'primary')}</div>
    </div>
  </div>
</section>

<section class="section bg-page">
  <div class="container container--narrow">
    <div class="sec-head" data-reveal><div>${eyebrow('Časté dotazy')}<h2 class="sec-head__title h1">Než zvednete telefon</h2></div></div>
    <div data-reveal>${faqList(faqs)}</div>
  </div>
</section>

${ctaBand()}
`;
  return {
    path: '/pruvodce-nakupem/',
    title: 'Průvodce nákupem',
    description: 'Průvodce nákupem nemovitosti u IKO — proces koupě krok za krokem, možnosti financování, klientské změny standardu a časté dotazy (FAQ).',
    body,
    ogImage: '/projects/cukrovarska-07-lg.jpg',
    jsonLd: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }),
  };
}
