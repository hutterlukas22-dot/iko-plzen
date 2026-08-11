import { btn, eyebrow } from '../components.js';

export function notFoundPage() {
  const body = `
<section class="section" style="min-height:70vh;display:grid;place-items:center;text-align:center;padding-top:calc(var(--header-h) + 3rem)">
  <div class="container container--narrow" data-reveal>
    ${eyebrow('Chyba 404')}
    <h1 class="display" style="margin:1rem 0 1rem">Tuhle stránku jsme nenašli.</h1>
    <p class="lead muted" style="max-width:44ch;margin-inline:auto">Možná byla přesunuta nebo už neexistuje. Zkuste některý z našich projektů.</p>
    <div style="margin-top:2rem;display:flex;gap:.9rem;justify-content:center;flex-wrap:wrap">
      ${btn('Zpět na úvod', '/', 'primary')}
      ${btn('Projekty', '/projekty/', 'secondary')}
    </div>
  </div>
</section>`;
  return { path: '/404.html', title: 'Stránka nenalezena', description: 'Stránka nebyla nalezena.', body };
}
