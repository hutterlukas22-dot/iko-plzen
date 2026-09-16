import { esc, icon } from './lib/util.js';

/* ---------- Meta grid --------------------------------------------------- */
export const metaGrid = (meta) =>
  `<div class="meta-grid">${meta
    .map((m) => `<div class="cell"><div class="k">${esc(m.k)}</div><div class="v">${esc(m.v)}</div></div>`)
    .join('')}</div>`;

/* ---------- Editorial gallery ------------------------------------------- */
export function gallery(p) {
  const prefix = p.imgPrefix || p.slug;
  return `<div class="gallery" data-gallery>${p.gallery
    .map((g, n) => {
      const lg = `/projects/${prefix}-${String(g.i).padStart(2, '0')}-lg.jpg`;
      const sm = `/projects/${prefix}-${String(g.i).padStart(2, '0')}-sm.jpg`;
      return `<figure class="${g.span}" data-reveal data-full="${lg}">
        <img src="${sm}" alt="${esc(g.alt)}" loading="lazy" decoding="async">
      </figure>`;
    })
    .join('')}</div>`;
}

/* ---------- Location: text beside a separate map preview ---------------- */
export const mapPreview = (label = 'Plzeň') => `<div class="mapviz" role="img" aria-label="Ukázková mapa lokality ${esc(label)}">
    <div class="mapviz__grid"></div>
    <svg class="mapviz__roads" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path d="M-20 210 C 80 190, 150 240, 240 200 S 380 150, 430 175"/>
      <path d="M60 -20 C 90 80, 40 150, 90 240 S 150 330, 130 360"/>
      <path d="M-20 90 L 430 60"/>
      <path d="M250 -20 C 240 90, 300 150, 280 260"/>
      <path class="mapviz__river" d="M-20 260 C 120 250, 160 300, 300 280 S 420 300, 440 290"/>
    </svg>
    <span class="mapviz__blob mapviz__blob--a"></span>
    <span class="mapviz__blob mapviz__blob--b"></span>
    <div class="mapviz__pin">${icon('map-pin')}</div>
    <span class="mapviz__tag">Ukázková mapa</span>
  </div>`;

export const locationCard = (place) => `<div class="loc" data-reveal>
    <div class="loc__text">
      <div class="eyebrow">${icon('map-pin')} Lokalita</div>
      <h3 class="h2" style="margin:.5rem 0 1rem">${esc(place.name)}</h3>
      <div class="prose muted">${place.text.split('. ').reduce((acc, s, i, arr) => {
        const sentence = s + (i < arr.length - 1 ? '.' : '');
        return acc + (i % 2 === 0 ? (i ? '</p>' : '') + '<p>' : ' ') + esc(sentence);
      }, '') + '</p>'}</div>
    </div>
    ${mapPreview(place.name)}
  </div>`;

/* ---------- Pipeline (Připravujeme) card -------------------------------- */
/* Same tile the news section used, so the client can keep adding entries in the
   same shape; the whole card opens the project's detail. */
export function pipelineCard(p, idx = 0) {
  const img = p.gallery && p.gallery[0];
  return `<article class="ncard" data-reveal data-delay="${(idx % 3) + 1}">
    <a class="ncard__link" href="/pripravujeme/${p.slug}/" aria-label="${esc(p.name)} — detail"></a>
    <div class="ncard__media reveal-media">
      <span class="ncard__cat">Připravujeme</span>
      ${img ? `<img src="${img.src}" alt="${esc(img.alt)}" loading="lazy" decoding="async">` : placeholder('Vizualizace připravujeme')}
    </div>
    <div class="ncard__body">
      <div class="ncard__meta">${icon('map-pin', 'inline-ic')} ${esc(p.location)}${p.units ? ` · ${p.units} jednotek` : ''}</div>
      <h3 class="ncard__title">${esc(p.name)}</h3>
      <p class="ncard__excerpt">${esc(p.excerpt)}</p>
      <span class="tlink" style="margin-top:auto">Zobrazit projekt ${icon('arrow-right')}</span>
    </div>
  </article>`;
}

/* Branded stand-in for imagery that does not exist yet. */
export const placeholder = (label = '') =>
  `<div class="pjc__ph" aria-hidden="true"><span>IKO</span>${label ? `<small>${esc(label)}</small>` : ''}</div>`;

/* ---------- Team card --------------------------------------------------- */
export function teamCard(p, idx = 0) {
  const initials = p.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return `<article class="tcard" data-reveal data-delay="${(idx % 3) + 1}">
    <div class="tcard__avatar" aria-hidden="true">${esc(initials)}</div>
    <div class="tcard__body">
      <h3 class="tcard__name">${esc(p.name)}</h3>
      <div class="tcard__role">${esc(p.role)}</div>
      ${p.note ? `<p class="tcard__note">${esc(p.note)}</p>` : ''}
      <div class="tcard__contact">
        ${p.phone ? `<a href="tel:${esc(p.phoneHref || p.phone)}">${icon('phone')} ${esc(p.phone)}</a>` : ''}
        ${p.email ? `<a href="mailto:${esc(p.email)}">${icon('mail')} ${esc(p.email)}</a>` : ''}
      </div>
    </div>
  </article>`;
}

/* ---------- Current project tile ---------------------------------------- */
/* Image, title and button all open the internal detail page; the project's own
   website, where one exists, is a secondary link under the button. */
export function currentProjectCard(p, meta, idx = 0) {
  const m = meta[p.status] || meta.selling;
  const href = `/projekty/${p.slug}/`;
  const facts = [
    ['Dokončení', p.completion || 'Upřesníme'],
    ['Počet jednotek', p.units ? String(p.units) : '—'],
  ];
  return `<article class="pjc" data-reveal data-delay="${(idx % 3) + 1}">
    <a class="pjc__media" href="${href}" tabindex="-1" aria-hidden="true">
      <span class="badge badge--${m.cls} badge--onmedia"><span class="dot"></span>${esc(m.label)}</span>
      ${p.img ? `<img src="${p.img}" alt="" loading="lazy" decoding="async">` : placeholder()}
    </a>
    <div class="pjc__body">
      <div class="pjc__loc">${icon('map-pin')} ${esc(p.location)}</div>
      <h3 class="pjc__name"><a href="${href}">${esc(p.name)}</a></h3>
      <dl class="pjc__facts">${facts
        .map((f) => `<div><dt>${f[0]}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl>
      <div class="pjc__actions">
        <a class="btn btn--secondary btn--block pjc__cta" href="${href}">Zobrazit projekt <span class="arrow">${icon('arrow-right')}</span></a>
        ${p.web ? `<a class="tlink pjc__web" href="${p.web}" target="_blank" rel="noopener">Web projektu ${icon('arrow-up-right')}</a>` : ''}
      </div>
    </div>
  </article>`;
}

/* ---------- Sales contact (broker card) --------------------------------- */
export function agentCard(p, { onDark = false } = {}) {
  const initials = p.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return `<div class="agent${onDark ? ' agent--dark' : ''}">
    <div class="agent__avatar" aria-hidden="true">${esc(initials)}</div>
    <div class="agent__b">
      <span class="agent__k">Váš kontakt pro tuto jednotku</span>
      <b class="agent__name">${esc(p.name)}</b>
      <span class="agent__role">${esc(p.role)}</span>
      <div class="agent__links">
        ${p.phone ? `<a href="tel:${esc(p.phoneHref || p.phone)}">${icon('phone')} ${esc(p.phone)}</a>` : ''}
        ${p.email ? `<a href="mailto:${esc(p.email)}">${icon('mail')} ${esc(p.email)}</a>` : ''}
      </div>
    </div>
  </div>`;
}

/* ---------- FAQ accordion ----------------------------------------------- */
export const faqList = (items) => `<div class="faq">${items
  .map((f) => `<details class="faq__item">
    <summary class="faq__q">${esc(f.q)}<span class="faq__icon">${icon('plus')}</span></summary>
    <div class="faq__a"><p>${esc(f.a)}</p></div>
  </details>`)
  .join('')}</div>`;

/* ---------- Timeline ---------------------------------------------------- */
export const timeline = (items) =>
  `<div class="timeline">${items
    .map(
      (m) => `<div class="tl-item" data-reveal>
      <div class="tl-year">${esc(m.year)}</div>
      <div class="tl-body"><h3>${esc(m.t)}</h3><p>${esc(m.d)}</p></div>
    </div>`
    )
    .join('')}</div>`;

/* ---------- Principles (Proč IKO) --------------------------------------- */
export const principlesGrid = (items) =>
  `<div class="principles">${items
    .map(
      // no 01/02/03 numbering — the client reads it as a ranking
      (p, i) => `<div class="principle" data-reveal data-delay="${(i % 2) + 1}">
      <h3 class="principle__t">${esc(p.t)}</h3>
      <p>${esc(p.d)}</p>
    </div>`
    )
    .join('')}</div>`;

/* ---------- Service block ----------------------------------------------- */
export const serviceBlock = (s, brand = false) => `<div class="svc${brand ? ' svc--brand' : ''}" data-reveal>
    <div class="svc__k">${esc(s.k)}</div>
    <h3>${esc(s.t)}</h3>
    <p style="${brand ? 'color:rgba(255,255,255,.9)' : 'color:var(--text-muted)'}">${esc(s.d)}</p>
    <ul class="svc__list">${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  </div>`;

/* ---------- Career card ------------------------------------------------- */
export const careerCard = (c) => `<div class="career-card" data-reveal>
    <div class="career-card__head">
      <div>
        <div class="eyebrow">Otevřená pozice</div>
        <h3 class="h1" style="margin-top:.5rem">${esc(c.title)}</h3>
        <div class="pill-row" style="margin-top:1rem">
          <span class="tag">${esc(c.location)}</span>
          <span class="tag">${esc(c.type)}</span>
        </div>
      </div>
      <div style="text-align:right">
        <div class="salary">${esc(c.salary)}</div>
        <div class="muted" style="font-size:var(--fs-sm)">${esc(c.salaryNote)}</div>
      </div>
    </div>
    <div style="padding:clamp(1.5rem,3vw,2.4rem);border-bottom:1px solid var(--border-subtle)">
      <p style="max-width:64ch">${esc(c.intro)}</p>
    </div>
    <div class="career-card__body">
      <div class="career-col">
        <h4>Co u nás budete dělat</h4>
        <ul>${c.responsibilities.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
        <h4 style="margin-top:1.6rem">Co od vás očekáváme</h4>
        <ul>${c.requirements.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>
      <div class="career-col">
        <h4>Co nabízíme</h4>
        <ul>${c.offer.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>
    </div>
  </div>`;

/* ---------- Contact form (real validation, endpoint-ready) -------------- */
export function contactForm({ compact = false, unitContext = false } = {}) {
  return `<form class="form-card" data-contact-form novalidate action="/api/lead" method="post" aria-label="Kontaktní formulář">
    <div data-form-fields>
      ${unitContext ? `<div class="form-ctx" data-form-ctx>
        <img class="form-ctx__img" data-form-ctx-img src="" alt="">
        <span class="form-ctx__b">
          <span class="form-ctx__k">Poptávaná jednotka</span>
          <b data-form-ctx-name>—</b>
          <small data-form-ctx-sub></small>
        </span>
      </div>
      <input type="hidden" name="unit" data-form-unit>
      <input type="hidden" name="unitUrl" data-form-unit-url>` : ''}
      <div class="form-grid">
        <div class="field"><label for="cf-fname">Jméno <span class="req">*</span></label>
          <input class="control" id="cf-fname" name="firstName" type="text" autocomplete="given-name" required placeholder="Jan">
          <span class="err">Vyplňte prosím jméno.</span></div>
        <div class="field"><label for="cf-lname">Příjmení <span class="req">*</span></label>
          <input class="control" id="cf-lname" name="lastName" type="text" autocomplete="family-name" required placeholder="Novák">
          <span class="err">Vyplňte prosím příjmení.</span></div>
      </div>
      <div class="form-grid" style="margin-top:1.1rem">
        <div class="field"><label for="cf-email">E-mail <span class="req">*</span></label>
          <input class="control" id="cf-email" name="email" type="email" autocomplete="email" required placeholder="jan@email.cz">
          <span class="err">Zadejte platný e-mail.</span></div>
        <div class="field"><label for="cf-phone">Telefon</label>
          <input class="control" id="cf-phone" name="phone" type="tel" autocomplete="tel" placeholder="+420">
          <span class="err">Zadejte platné telefonní číslo.</span></div>
      </div>
      <div class="field" style="margin-top:1.1rem"><label for="cf-interest">${unitContext ? 'Co potřebujete' : 'Zajímá mě'}</label>
        <select class="control" id="cf-interest" name="interest">
          ${unitContext
            ? `<option>Domluvit prohlídku</option><option>Poslat cenovou nabídku a podklady</option>
               <option>Poradit s financováním</option><option>Rezervovat tuto jednotku</option><option>Mám jiný dotaz</option>`
            : `<option>Rodinný dům</option><option>Řadový dům</option><option>Dvojdům</option>
               <option>Byt</option><option>Nevím, poraďte mi</option><option>Kariéra / pozice stavbyvedoucí</option>`}
        </select></div>
      ${compact ? '' : `<div class="field" style="margin-top:1.1rem"><label for="cf-msg">Zpráva</label>
        <textarea class="control" id="cf-msg" name="message" placeholder="Napište nám, co potřebujete…"></textarea></div>`}
      <label class="field" style="flex-direction:row;gap:.6em;align-items:flex-start;margin-top:1.1rem;font-weight:500;font-size:var(--fs-sm)">
        <input type="checkbox" name="consent" required style="margin-top:.25em;width:18px;height:18px;accent-color:var(--iko-blue)">
        <span>Souhlasím se zpracováním osobních údajů pro účely vyřízení poptávky. <span class="req">*</span></span>
      </label>
      <div class="err" data-consent-err style="margin-top:.4rem;display:none">Bez souhlasu bohužel nemůžeme poptávku odeslat.</div>
      <button class="btn btn--primary btn--lg btn--block" type="submit" style="margin-top:1.4rem">
        Odeslat poptávku <span class="arrow">${icon('arrow-right')}</span></button>
      <p class="form-note">Ozveme se vám do 24 hodin. Bez tlaku, s jasnými odpověďmi.</p>
    </div>
    <div class="form-success" data-form-success hidden>
      <div class="ok">${icon('check')}</div>
      <h3 class="h2">Formulář je vyplněný správně.</h3>
      <p class="muted" style="margin:.5rem auto 1.4rem;max-width:42ch">Otevřeli jsme vám předvyplněný e-mail — stačí ho odeslat. Pokud se neotevřel, použijte tlačítko níže nebo nám zavolejte.</p>
      <div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
        <a class="btn btn--primary" data-mail-link href="#">${icon('mail')} Otevřít e-mail</a>
        <button class="btn btn--secondary" type="button" data-form-reset>Vyplnit znovu</button>
      </div>
    </div>
  </form>`;
}
