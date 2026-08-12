import { esc, icon, fmtPrice } from './lib/util.js';
import { floorLabel } from './data/units.js';

const ST = { available: 'Volný', reserved: 'Rezervováno', sold: 'Prodáno' };
export const statusPill = (s) => `<span class="spill spill--${s}"><span class="dot"></span>${ST[s] || s}</span>`;
const areaTxt = (a) => `${String(a).replace('.', ',')} m²`;

// data attributes shared by rows + tiles (drive client filtering/sorting)
const dataAttrs = (u) =>
  `data-unit="${esc(u.id)}" data-project="${esc(u.projectSlug)}" data-disp="${esc(u.disposition)}" ` +
  `data-status="${u.status}" data-area="${u.area}" data-price="${u.price || 0}" data-num="${typeof u.num === 'number' ? u.num : 0}" data-type="${esc(u.type)}"`;

function unitRow(u) {
  const sold = u.status === 'sold';
  return `<a href="/jednotka/?id=${esc(u.id)}" class="urow${sold ? ' urow--sold' : ''}" ${dataAttrs(u)}>
    <img class="urow__thumb" src="${u.img}" alt="Půdorys ${esc(u.label)}" loading="lazy" decoding="async">
    <div class="urow__cell--name">
      <div class="urow__name">${esc(u.label)}</div>
      <div class="urow__sub">${esc(u.projectName)}</div>
      <div class="urow__specs">${esc(u.disposition)} · ${areaTxt(u.area)}${u.floor ? ' · ' + esc(u.floor) : ''} · ${ST[u.status]}</div>
    </div>
    <div class="urow__cell--disp urow__v">${esc(u.disposition)}</div>
    <div class="urow__cell--area urow__v">${areaTxt(u.area)}</div>
    <div class="urow__cell--floor urow__v">${u.floor ? esc(u.floor) : '—'}</div>
    <div class="urow__cell--status">${statusPill(u.status)}</div>
    <div class="urow__cell--price urow__price">${fmtPrice(u.price)}</div>
    <div class="urow__cta">${icon('arrow-right')}</div>
  </a>`;
}

function unitTile(u) {
  const sold = u.status === 'sold';
  return `<a href="/jednotka/?id=${esc(u.id)}" class="ucard${sold ? ' ucard--sold' : ''}" ${dataAttrs(u)}>
    <div class="ucard__media">
      <span class="badge badge--${u.status} badge--onmedia"><span class="dot"></span>${ST[u.status]}</span>
      <img src="${u.img}" alt="Půdorys ${esc(u.label)}" loading="lazy" decoding="async">
      <span class="ucard__disp">${esc(u.disposition)}</span>
    </div>
    <div class="ucard__body">
      <div class="ucard__name">${esc(u.label)}</div>
      <div class="ucard__specs"><span><b>${areaTxt(u.area)}</b></span>${u.floor ? `<span>${esc(u.floor)}</span>` : ''}${u.orient ? `<span>${esc(u.orient)}</span>` : ''}</div>
      <div class="ucard__foot">
        <span class="ucard__price">${fmtPrice(u.price)}</span>
        <span class="pcard__more">Detail ${icon('arrow-right')}</span>
      </div>
    </div>
  </a>`;
}

// Marketplace filters only — for separate blue section on projects page
export function unitMarketplaceBar({ units, projects = [], ranges, showProjectFilter = true }) {
  const chip = (val, label, group, sel = false) =>
    `<button class="tag${sel ? ' is-selected' : ''}" data-filter="${group}" data-value="${esc(val)}">${esc(label)}</button>`;
  const dispChips = ['Vše', ...ranges.dispositions].map((d) => chip(d === 'Vše' ? 'vse' : d, d, 'disp', d === 'Vše')).join('');
  const statusChips = [['vse', 'Vše'], ['available', 'Volné'], ['reserved', 'Rezervováno'], ['sold', 'Prodáno']]
    .map(([v, l], i) => chip(v, l, 'status', i === 0)).join('');
  const projectOptions = ['<option value="vse">Všechny projekty</option>', ...projects.map((p) => `<option value="${esc(p.slug)}">${esc(p.name)}</option>`)].join('');
  return `<div class="mkt-bar">
      ${showProjectFilter ? `<div class="mkt-group">
        <span class="mkt-group__label">Projekt</span>
        <select class="control" data-filter-select="project">${projectOptions}</select>
      </div>` : ''}
      <div class="mkt-group"><span class="mkt-group__label">Dispozice</span><div class="mkt-chips">${dispChips}</div></div>
      <div class="mkt-group"><span class="mkt-group__label">Stav</span><div class="mkt-chips">${statusChips}</div></div>
      <div class="mkt-group"><span class="mkt-group__label">Plocha (m²)</span><div class="mkt-range"><input class="control" type="number" inputmode="numeric" data-filter-min="area" placeholder="od" min="0"><span>–</span><input class="control" type="number" inputmode="numeric" data-filter-max="area" placeholder="do"></div></div>
      <div class="mkt-group mkt-spacer"><span class="mkt-group__label">Řazení</span><select class="control" data-sort><option value="num">Doporučené</option><option value="price-asc">Cena: od nejnižší</option><option value="price-desc">Cena: od nejvyšší</option><option value="area-asc">Plocha: od nejmenší</option><option value="area-desc">Plocha: od největší</option></select></div>
    </div>`;
}

// full data map for the modal / detail page (client reads by id)
export const unitJSON = (units) =>
  `<script type="application/json" data-units>${JSON.stringify(
    Object.fromEntries(
      units.map((u) => [u.id, {
        label: u.label, project: u.projectName, projectSlug: u.projectSlug,
        disposition: u.disposition, area: u.area,
        floor: u.floor, status: u.status, price: u.price, orient: u.orient,
        parking: u.parking, cellar: u.cellar, terrace: u.terrace, balcony: u.balcony,
        img: u.img, type: u.type, plot: u.plot || null,
      }])
    )
  ).replace(/</g, '\\u003c')}</script>`;

/**
 * Unit marketplace: filters + Seznam/Dlaždice, server-rendered rows & tiles
 * (data-* driven client filtering/sorting; works without JS as a full list).
 * hideBar: set to true when filters are shown separately in blue section
 */
export function unitMarketplace({ units, projects = [], ranges, showProjectFilter = true, hideBar = false }) {
  const chip = (val, label, group, sel = false) =>
    `<button class="tag${sel ? ' is-selected' : ''}" data-filter="${group}" data-value="${esc(val)}">${esc(label)}</button>`;
  const dispChips = ['Vše', ...ranges.dispositions].map((d) => chip(d === 'Vše' ? 'vse' : d, d, 'disp', d === 'Vše')).join('');
  const statusChips = [['vse', 'Vše'], ['available', 'Volné'], ['reserved', 'Rezervováno'], ['sold', 'Prodáno']]
    .map(([v, l], i) => chip(v, l, 'status', i === 0)).join('');
  const projectOptions = ['<option value="vse">Všechny projekty</option>', ...projects.map((p) => `<option value="${esc(p.slug)}">${esc(p.name)}</option>`)].join('');

  return `<div class="mkt" data-marketplace>
    ${!hideBar ? `<div class="mkt-bar">
      ${showProjectFilter ? `<div class="mkt-group">
        <span class="mkt-group__label">Projekt</span>
        <select class="control" data-filter-select="project">${projectOptions}</select>
      </div>` : ''}
      <div class="mkt-group"><span class="mkt-group__label">Dispozice</span><div class="mkt-chips">${dispChips}</div></div>
      <div class="mkt-group"><span class="mkt-group__label">Stav</span><div class="mkt-chips">${statusChips}</div></div>
      <div class="mkt-group"><span class="mkt-group__label">Plocha (m²)</span><div class="mkt-range"><input class="control" type="number" inputmode="numeric" data-filter-min="area" placeholder="od" min="0"><span>–</span><input class="control" type="number" inputmode="numeric" data-filter-max="area" placeholder="do"></div></div>
      <div class="mkt-group mkt-spacer"><span class="mkt-group__label">Řazení</span><select class="control" data-sort><option value="num">Doporučené</option><option value="price-asc">Cena: od nejnižší</option><option value="price-desc">Cena: od nejvyšší</option><option value="area-asc">Plocha: od nejmenší</option><option value="area-desc">Plocha: od největší</option></select></div>
    </div>` : ''}

    <div class="mkt-head">
      <span class="mkt-count" data-count><b>${units.length}</b> jednotek</span>
      <div class="vtoggle" data-view style="margin-left:auto"><button data-view-btn="list" class="is-active">${icon('layers')} Seznam</button><button data-view-btn="tiles">${icon('building')} Dlaždice</button></div>
      <span class="mkt-reset" data-reset>Zrušit filtry</span>
    </div>

    <div class="ulist" data-view-list>
      <div class="ulist__head"><span></span><span>Jednotka</span><span>Dispozice</span><span>Plocha</span><span>Podlaží</span><span>Stav</span><span>Cena</span><span></span></div>
      <div data-rows>${units.map(unitRow).join('')}</div>
    </div>
    <div class="utiles" data-view-tiles style="display:none">${units.map(unitTile).join('')}</div>
    <div class="empty" data-empty hidden>Žádná jednotka neodpovídá zvoleným filtrům.</div>

    <div class="demo-note">${icon('shield-check')}<span>Dispozice a půdorysy vycházejí z reálných podkladů IKO. Ceny, plochy a dostupnost jsou v této ukázce demonstrační a v ostrém provozu je nahradí data z CMS.</span></div>
    ${unitJSON(units)}
  </div>`;
}

/** Interactive floor selector for a project detail (building tabs → floors → units). */
export function floorSelector(buildings, projectName) {
  if (!buildings.length) return '';
  const multi = buildings.length > 1;
  const tabs = multi
    ? `<div class="fsel-tabs" data-fsel-tabs>${buildings.map((b, i) => `<button data-building="${i}" class="${i === 0 ? 'is-active' : ''}">${esc(b.building || 'Dům')}</button>`).join('')}</div>`
    : '';

  return `<div class="fsel" data-floorsel>
    <div class="fsel-side">
      ${tabs}
      <div class="fsel-floors" data-fsel-floors></div>
    </div>
    <div class="fsel-stage" data-fsel-stage></div>
    <script type="application/json" data-fsel-data>${JSON.stringify(
      buildings.map((b) => ({
        building: b.building,
        floors: b.floors.map((f) => ({
          code: f.code, label: f.label, img: f.img,
          units: f.units.map((u) => ({ id: u.id, label: `Byt ${u.num}`, disposition: u.disposition, area: u.area, price: u.price, status: u.status, floor: u.floor })),
        })),
      }))
    ).replace(/</g, '\\u003c')}</script>
  </div>`;
}

/** One modal shell per page; populated client-side from data-units JSON. */
export function unitModalShell() {
  return `<div class="umodal" data-umodal aria-hidden="true" role="dialog" aria-label="Detail jednotky">
    <div class="umodal__panel">
      <button class="umodal__close" data-umodal-close aria-label="Zavřít">${icon('x')}</button>
      <div class="umodal__media" data-umodal-media><img src="" alt=""></div>
      <div class="umodal__body" data-umodal-body></div>
    </div>
  </div>`;
}
