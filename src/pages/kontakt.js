import { site } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, statBand } from '../components.js';
import { contactForm, locationCard } from '../blocks.js';

export function kontaktPage() {
  const c = site.contact;
  const line = (ic, k, v, href) =>
    `<div class="contact-line"><div class="ic">${icon(ic)}</div><div><div class="k">${esc(k)}</div>${href ? `<a class="v" href="${href}">${esc(v)}</a>` : `<div class="v">${esc(v)}</div>`}</div></div>`;

  const body = `
<section class="section" style="padding-top:calc(var(--header-h) + clamp(2rem,5vw,4rem))">
  <div class="container grid-2" style="align-items:start">
    <div data-reveal>
      ${eyebrow('Kontakt')}
      <h1 class="display balance" style="margin:1rem 0 1.2rem;max-width:18ch">Začněme u vašich představ.</h1>
      <p class="lead muted" style="max-width:46ch">Řekněte nám, co hledáte. My vám představíme možnosti, které pro vás připadají v úvahu. Osobně, srozumitelně a bez zbytečných frází.</p>
      <div class="contact-lines">
        ${line('map-pin', 'Adresa', `${c.company}, ${c.street}, ${c.city}`)}
        ${line('phone', 'Telefon', c.phone, `tel:${c.phoneHref}`)}
        ${line('mail', 'E-mail', c.email, `mailto:${c.email}`)}
      </div>
      <div style="display:flex;gap:1.4rem;margin-top:2rem">
        <div class="stat stat--ink"><div class="stat__v">24h</div><div class="stat__l">doba odezvy</div></div>
        <div class="stat stat--ink"><div class="stat__v">35</div><div class="stat__l">let zkušeností</div></div>
      </div>
      <div class="social-row">
        ${[['facebook', 'Facebook'], ['youtube', 'YouTube'], ['instagram', 'Instagram'], ['linkedin', 'LinkedIn']]
          .filter(([k]) => c[k]) // only networks we actually have a URL for
          .map(([k, l]) => `<a href="${c[k]}" aria-label="${l} IKO" target="_blank" rel="noopener">${icon(k)}</a>`)
          .join('')}
      </div>
    </div>
    <div data-reveal data-delay="1">
      ${contactForm({ compact: false })}
    </div>
  </div>
</section>

<section class="section--tight bg-page">
  <div class="container split split--media-first">
    <figure class="split__media reveal-media" data-reveal style="margin:0">
      <img src="/photos/sidlo-lg.jpg" alt="Sídlo IKO stavby ve Vltavínové ulici v Plzni-Černicích" loading="lazy" decoding="async">
    </figure>
    <div data-reveal data-delay="1">
      ${eyebrow('Kde nás najdete')}
      <h2 class="display" style="margin:.6rem 0 1.2rem">Vltavínová 3 není<br>jen naše adresa.</h2>
      <div class="prose muted">
        <p>Sídlo naší společnosti najdete v Plzni-Černicích, v administrativním domě, který jsme sami postavili. Je to také ukázka naší práce.</p>
        <p>Pokud přijíždíte autem, stačí do navigace zadat <strong>Vltavínová 3, Plzeň</strong> — ta vás zavede přímo k našemu sídlu. Zaparkujete přímo před domem, případně v některé z přilehlých ulic.</p>
      </div>
      <div class="contact-lines" style="margin-top:1.6rem">
        ${line('map-pin', 'Adresa', `${c.street}, ${c.city}, 4. patro`)}
      </div>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    ${locationCard({ name: 'Plzeň — Černice', text: `${c.company} sídlí na adrese ${c.street}, ${c.city}. Osobní schůzku i prohlídku projektu si domluvíme podle vás.` })}
  </div>
</section>
`;
  return {
    path: '/kontakt/',
    title: 'Kontakt',
    description: `Kontakt na IKO stavby s.r.o. — ${c.street}, ${c.city}. Telefon ${c.phone}, e-mail ${c.email}. Nezávazná poptávka bydlení online.`,
    body,
  };
}
