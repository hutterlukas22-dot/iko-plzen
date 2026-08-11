// IKO — apartment units marketplace data.
// Apartment units + floor plans are generated from real IKO sale-sheet PDFs
// (dispozice + floor-plan images are real). Prices, exact areas, floors and
// availability are DEMO placeholders — a CMS/implementer replaces them with real data.
import { readFileSync } from 'node:fs';
import { projects } from './projects.js';

const gen = JSON.parse(readFileSync(new URL('./units.generated.json', import.meta.url), 'utf8'));

const PROJECT_OF = {
  'cukrovarska': { slug: 'bytovy-dum-cukrovarska', name: 'Bytový dům Cukrovarská', city: 'Plzeň' },
  'slovanske-bd1': { slug: 'rezidence-slovanske-udoli', name: 'Rezidence Slovanské údolí', city: 'Plzeň' },
  'slovanske-bd2': { slug: 'rezidence-slovanske-udoli', name: 'Rezidence Slovanské údolí', city: 'Plzeň' },
};

const normFloor = (code) => code.replace(/^(\d)(NP|PP)$/, '$1.$2'); // '2NP' -> '2.NP'
const floorOrder = (code) => {
  const m = code.match(/^(\d)\.(NP|PP)$/);
  if (!m) return 0;
  return m[2] === 'PP' ? -Number(m[1]) : Number(m[1]);
};
export const floorLabel = (code) => {
  const m = code.match(/^(\d)\.(NP|PP)$/);
  if (!m) return code;
  if (m[2] === 'PP') return 'Suterén';
  if (m[1] === '1') return 'Přízemí';
  return `${Number(m[1]) - 1}. patro`;
};

// ---- Flat marketplace list (apartments) ----
export const apartmentUnits = [];
for (const [key, b] of Object.entries(gen)) {
  const pj = PROJECT_OF[key];
  for (const u of b.units) {
    apartmentUnits.push({
      id: `${key}-${u.num}`,
      projectSlug: pj.slug, projectName: pj.name, city: pj.city,
      building: b.building, buildingKey: key,
      label: `Byt ${u.num}${b.building ? ' · ' + b.building : ''}`,
      num: u.num, disposition: u.disposition, area: u.area, floor: u.floor,
      status: u.status, price: u.price, orient: u.orient,
      parking: u.parking, cellar: u.cellar, terrace: u.terrace, balcony: u.balcony,
      img: u.img, type: 'Byt',
    });
  }
}

// ---- Radobyčice houses as units (real data from projects.js) ----
const rado = projects.find((p) => p.slug === 'radobycice-brizova');
export const houseUnits = (rado?.units || []).map((u, i) => ({
  id: `radobycice-${i + 1}`,
  projectSlug: rado.slug, projectName: rado.name, city: 'Plzeň',
  building: null, buildingKey: 'radobycice',
  label: u.name,
  num: u.name, disposition: u.layout, area: parseFloat(u.area), floor: null,
  status: u.status, price: parseInt(String(u.price).replace(/\D/g, '')) || null, orient: null,
  parking: true, cellar: false, terrace: false, balcony: false,
  img: `/projects/radobycice-${String((i % 6) + 1).padStart(2, '0')}-sm.jpg`, type: 'Dům', plot: u.plot,
}));

export const allUnits = [...apartmentUnits, ...houseUnits];

// distinct projects that actually have units, in display order
export const unitProjects = [];
for (const u of allUnits) if (!unitProjects.some((p) => p.slug === u.projectSlug))
  unitProjects.push({ slug: u.projectSlug, name: u.projectName });

// ranges for filter defaults
export const unitRanges = {
  area: [Math.floor(Math.min(...allUnits.map((u) => u.area))), Math.ceil(Math.max(...allUnits.map((u) => u.area)))],
  price: [Math.min(...allUnits.map((u) => u.price || Infinity)), Math.max(...allUnits.map((u) => u.price || 0))],
  dispositions: [...new Set(allUnits.map((u) => u.disposition))].sort(),
};

// ---- Per-project building/floor structure for the floor selector ----
export function projectBuildings(slug) {
  const out = [];
  for (const [key, b] of Object.entries(gen)) {
    if (PROJECT_OF[key].slug !== slug) continue;
    const floors = b.floors
      .map((f) => {
        const code = normFloor(f.code);
        const units = b.units
          .filter((u) => u.floor === code)
          .map((u) => ({ ...u, id: `${key}-${u.num}`, projectName: PROJECT_OF[key].name, building: b.building }))
          .sort((a, z) => a.num - z.num);
        return { code, label: floorLabel(code), img: f.img, units, order: floorOrder(code) };
      })
      .sort((a, z) => z.order - a.order); // top floor first
    out.push({ key, building: b.building, floors, unitCount: b.units.length });
  }
  return out;
}

// units belonging to a site project (flat), for the marketplace on a detail page
export const projectUnitList = (slug) => allUnits.filter((u) => u.projectSlug === slug);
