import { services } from '../data/site.js';
import { esc, icon } from '../lib/util.js';
import { eyebrow, btn } from '../components.js';
import { serviceBlock } from '../blocks.js';
import { ctaBand } from './home.js';

const cats = [
  { ic: 'home', t: 'Rodinné domy', d: 'Samostatné domy se zahradou a parkováním.' },
  { ic: 'layers', t: 'Řadové domy', d: 'Efektivní bydlení s vlastním vstupem i zahradou.' },
  { ic: 'users', t: 'Dvojdomy', d: 'Soukromí rodinného domu, výhoda sdílené stavby.' },
  { ic: 'building', t: 'Bytové domy', d: 'Městské byty s balkony, terasami a předzahrádkami.' },
  { ic: 'ruler', t: 'Příprava pozemků', d: 'Zainvestované pozemky pro individuální výstavbu.' },
  { ic: 'hammer', t: 'Výstavba pro investory', d: 'Realizace zakázek pro externí investory.' },
];

export function sluzbyPage() {
  const body = `
<section class="section--tight bg-brand" style="padding-top:calc(var(--header-h) + clamp(2rem,5vw,4rem))">
  <div class="container" data-reveal>
    ${eyebrow('Služby', { onbrand: true })}
    <h1 class="display balance" style="color:#fff;margin:.6rem 0 1rem;max-width:18ch">Dvě strany jednoho řemesla: development a stavba.</h1>
    <p class="lead" style="color:rgba(255,255,255,.9);max-width:56ch">IKO staví vlastní rezidenční projekty a zároveň realizuje výstavbu pro externí investory. Vše se stavební historií sahající do roku 1991.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="svc-cols">
      ${serviceBlock(services.development, true)}
      ${serviceBlock(services.construction, false)}
    </div>
  </div>
</section>

<section class="section bg-page">
  <div class="container">
    <div class="sec-head" data-reveal><div>${eyebrow('Co stavíme')}<h2 class="sec-head__title h1">Typy bydlení a činností</h2></div></div>
    <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))">
      ${cats
        .map(
          (c, i) => `<div class="svc" style="padding:clamp(1.6rem,3vw,2.2rem)" data-reveal data-delay="${(i % 3) + 1}">
        <div style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--blue-50);color:var(--iko-blue);display:grid;place-items:center;margin-bottom:1.1rem">
          <span style="width:22px;height:22px;display:block">${icon(c.ic)}</span>
        </div>
        <h3 style="font-size:var(--fs-h3)">${esc(c.t)}</h3>
        <p class="muted" style="margin-top:.5rem;font-size:var(--fs-sm)">${esc(c.d)}</p>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container split split--media-first">
    <div class="split__media split__media--wide reveal-media" data-reveal>
      <img src="/projects/cukrovarska-05-lg.jpg" alt="Detail architektury bytového domu Cukrovarská — cihelná clona a zeleň" loading="lazy" decoding="async">
    </div>
    <div data-reveal data-delay="1">
      ${eyebrow('Jedno kontaktní místo')}
      <h2 class="display" style="margin:.6rem 0 1.2rem">Od pozemku po klíče —<br>pod jednou střechou.</h2>
      <p class="muted" style="max-width:48ch">Přípravu, projekt, realizaci i prodej řešíte na jednom místě. Kvalitu hlídají naši stavbyvedoucí, financování pomůžeme zajistit a klientské změny zpracujeme interně.</p>
      <div style="margin-top:1.8rem;display:flex;gap:.9rem;flex-wrap:wrap">
        ${btn('Naše projekty', '/projekty/', 'primary')}
        ${btn('Kontaktovat nás', '/kontakt/', 'ghost-ink')}
      </div>
    </div>
  </div>
</section>

${ctaBand()}
`;
  return {
    path: '/sluzby/',
    title: 'Služby',
    description: 'Služby IKO — vlastní developerské projekty i výstavba pro investory: rodinné domy, řadové domy, dvojdomy, bytové domy a příprava pozemků v Plzni a okolí.',
    body,
    ogImage: '/projects/cukrovarska-01-lg.jpg',
  };
}
