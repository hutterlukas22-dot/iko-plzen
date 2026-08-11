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
      <h1 class="display balance" style="margin:1rem 0 1.2rem;max-width:16ch">Váš nový soused vás rád provede.</h1>
      <p class="lead muted" style="max-width:44ch">Ozveme se vám do 24 hodin — bez tlaku, s jasnými odpověďmi od člověka, který projekt zná.</p>
      <div class="contact-lines">
        ${line('map-pin', 'Adresa', `${c.company}, ${c.street}, ${c.city}`)}
        ${line('phone', 'Telefon', c.phone, `tel:${c.phoneHref}`)}
        ${line('mail', 'E-mail', c.email, `mailto:${c.email}`)}
      </div>
      <div style="display:flex;gap:1.4rem;margin-top:2rem">
        <div class="stat stat--ink"><div class="stat__v">24h</div><div class="stat__l">doba odezvy</div></div>
        <div class="stat stat--ink"><div class="stat__v">35</div><div class="stat__l">let zkušeností</div></div>
      </div>
      <div style="margin-top:2rem;display:flex;gap:1rem">
        <a href="${c.facebook}" aria-label="Facebook IKO" class="contact-line" style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--blue-50);color:var(--iko-blue);display:grid;place-items:center"><span style="width:20px">${icon('facebook')}</span></a>
        <a href="${c.youtube}" aria-label="YouTube IKO" class="contact-line" style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--blue-50);color:var(--iko-blue);display:grid;place-items:center"><span style="width:22px">${icon('youtube')}</span></a>
      </div>
    </div>
    <div data-reveal data-delay="1">
      ${contactForm({ compact: false })}
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    ${locationCard({ name: 'Plzeň', text: `${c.company} sídlí na adrese ${c.street}, ${c.city}. Osobní schůzku i prohlídku projektu si domluvíme podle vás.` })}
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
