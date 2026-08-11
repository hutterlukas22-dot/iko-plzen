import { newsSorted, newsCategories } from '../data/news.js';
import { esc } from '../lib/util.js';
import { eyebrow } from '../components.js';
import { newsCard } from '../blocks.js';
import { ctaBand } from './home.js';

export function aktualityPage() {
  const chips = newsCategories
    .map((c, i) => `<button class="tag${i === 0 ? ' is-selected' : ''}" data-news-filter data-value="${c === 'Vše' ? 'vse' : esc(c)}">${esc(c)}</button>`)
    .join('');

  const body = `
<section class="section--tight" style="padding-top:calc(var(--header-h) + clamp(2.5rem,6vw,5rem))">
  <div class="container" data-reveal>
    ${eyebrow('Aktuality')}
    <h1 class="display balance" style="margin:1rem 0 1rem;max-width:20ch">Co je nového u IKO</h1>
    <p class="lead muted" style="max-width:60ch">Kolaudace, zahájení prodeje, dny otevřených dveří i novinky ze společnosti — vše na jednom místě, ať nemusíte obcházet jednotlivé projekty.</p>
  </div>
</section>

<section class="section--tight" data-news-root>
  <div class="container">
    <div class="pill-row" data-reveal style="margin-bottom:2rem">${chips}</div>
    <div class="card-grid" data-news-grid>
      ${newsSorted.map((n, i) => newsCard(n, i)).join('')}
    </div>
    <div class="empty" data-news-empty hidden>V této kategorii zatím nic nemáme.</div>
  </div>
</section>

${ctaBand()}
`;
  return {
    path: '/aktuality/',
    title: 'Aktuality',
    description: 'Aktuality IKO — kolaudace, zahájení prodeje, dny otevřených dveří a novinky ze všech projektů na jednom místě.',
    body,
    ogImage: newsSorted[0].image.replace('-sm.jpg', '-lg.jpg'),
  };
}
