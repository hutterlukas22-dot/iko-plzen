import { career, site } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow } from '../components.js';
import { careerCard } from '../blocks.js';

const perks = [
  { ic: 'shield-check', t: 'Stabilita', d: 'Prosperující rodinná firma s 35letou historií a plným pořadníkem projektů.' },
  { ic: 'building', t: 'Vlastní projekty', d: 'Povedete realizaci vlastních developerských projektů IKO, ne anonymní subdodávky.' },
  { ic: 'users', t: 'Přímé jednání', d: 'Krátké rozhodovací cesty a přímá komunikace napříč firmou.' },
];

export function karieraPage() {
  const body = `
<section class="section--tight" style="padding-top:calc(var(--header-h) + clamp(2.5rem,6vw,5rem))">
  <div class="container container--narrow" data-reveal>
    ${eyebrow('Kariéra')}
    <h1 class="display balance" style="margin:1rem 0 1.2rem;max-width:18ch">Dobré stavby začínají dobrými lidmi.</h1>
    <p class="lead muted" style="max-width:58ch">Za každým domem, dokončenou stavbou a spokojeným klientem stojí práce lidí, kterým na výsledku opravdu záleží. V IKO stavby už více než 35 let vytváříme projekty, které mění Plzeň a její okolí v místa pro dobrý život.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="card-grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))">
      ${perks
        .map(
          (p, i) => `<div class="svc" data-reveal data-delay="${(i % 3) + 1}">
        <div style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--blue-50);color:var(--iko-blue);display:grid;place-items:center;margin-bottom:1.1rem"><span style="width:22px;height:22px;display:block">${icon(p.ic)}</span></div>
        <h3 style="font-size:var(--fs-h3)">${esc(p.t)}</h3>
        <p class="muted" style="margin-top:.5rem;font-size:var(--fs-sm)">${esc(p.d)}</p>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section bg-page">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Aktuálně hledáme')}<h2 class="sec-head__title h1">Volná pozice</h2></div></div>
    ${careerCard(career)}
    <div class="form-card" data-reveal style="margin-top:1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap">
      <div>
        <h3 style="font-size:var(--fs-h3)">Zaujala vás pozice?</h3>
        <p class="muted" style="margin-top:.4rem">Ozvěte se nám — rádi se s vámi potkáme.</p>
      </div>
      <div style="display:flex;gap:.8rem;flex-wrap:wrap">
        <a class="btn btn--primary btn--lg" href="tel:${site.contact.careersPhoneHref}">${icon('phone')} ${esc(site.contact.careersPhone)}</a>
        <a class="btn btn--secondary btn--lg" href="mailto:${site.contact.careersEmail}?subject=Kariéra%20—%20${encodeURIComponent(career.title)}">${icon('mail')} Napsat e-mail</a>
      </div>
    </div>
  </div>
</section>

<!-- Open application — so people can apply even when no role is listed -->
<section class="section bg-page">
  <div class="container split" style="align-items:start">
    <div data-reveal>
      ${eyebrow('Nenašli jste svou pozici?')}
      <h2 class="display" style="margin:.6rem 0 1.2rem">To neznamená, že se nemůžeme potkat.</h2>
      <div class="prose muted" style="max-width:48ch">
        <p>Pošlete nám svůj životopis a pár vět o tom, čemu se věnujete a co by vás u nás zajímalo. Zařadíme vás do naší databáze uchazečů a ozveme se, jakmile se objeví příležitost, která by vám mohla sedět.</p>
        <p>Každý životopis si osobně projdeme. Pokud uvidíme prostor pro spolupráci, ozveme se vám.</p>
      </div>
      <h3 style="font-size:var(--fs-h4);margin:1.6rem 0 .6rem">Zajímá nás především</h3>
      <ul class="ticks">
        ${['praxe ve stavebnictví, developmentu nebo technických oborech',
           'zodpovědný přístup a chuť dotahovat věci do konce',
           'schopnost spolupracovat a komunikovat na rovinu',
           'zájem učit se a podílet se na kvalitních projektech']
          .map((t) => `<li>${icon('check')}<span>${esc(t)}</span></li>`).join('')}
      </ul>
    </div>
    <div data-reveal data-delay="1">
      <div class="opencv">
        <h3>Pošlete nám svůj životopis</h3>
        <p>Stačí připojit CV a krátkou zprávu: jaké máte zkušenosti, o jakou oblast se zajímáte a proč byste chtěli pracovat právě s námi.</p>
        <a class="btn btn--primary btn--lg btn--block" href="mailto:${site.contact.careersEmail}?subject=${encodeURIComponent('Životopis do databáze uchazečů')}">${icon('mail')} ${esc(site.contact.careersEmail)}</a>
        <a class="btn btn--secondary btn--block" href="tel:${site.contact.careersPhoneHref}" style="margin-top:.7rem">${icon('phone')} ${esc(site.contact.careersPhone)}</a>
      </div>
    </div>
  </div>
</section>
`;
  return {
    path: '/kariera/',
    title: 'Kariéra',
    description: `Kariéra v IKO — aktuálně hledáme pozici ${career.title} v Plzni. Stabilní rodinná firma, vlastní developerské projekty, ${career.salary}.`,
    body,
    jsonLd: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: career.title,
      employmentType: 'FULL_TIME',
      hiringOrganization: { '@type': 'Organization', name: site.contact.company, sameAs: site.url },
      jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Plzeň', addressCountry: 'CZ' } },
      description: career.intro,
    }),
  };
}
