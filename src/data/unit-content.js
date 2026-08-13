/* ==========================================================================
   IKO — editorial + contextual content for the unit detail template.

   Everything here is DEMO content shaped the way a CMS would deliver it, so the
   implementer can swap the source without touching the components:

     story[]   → editorial modules   { kind, eyebrow, title, text, img, alt, credit }
     stages[]  → project timeline    { label, done, current }
     nearby[]  → location amenities  { icon, label }
     rooms()   → room breakdown      { name, area }

   Nothing here asserts a fact about a real IKO unit. Room areas are derived from
   the unit's own area so the numbers stay internally consistent; real values come
   from the catalogue sheet via the CMS.
   ========================================================================== */

/* Material / atmosphere photography (Unsplash) — used only where IKO has no
   asset of its own. Project imagery is always preferred and always labelled as a
   visualisation so it is never mistaken for site photography. */
const U = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const materials = [
  { img: U('photo-1785333765025-3796bb7d1ce2'), alt: 'Sluneční světlo a stíny dopadající na dřevěnou podlahu', t: 'Dřevěná podlaha', d: 'Plovoucí podlaha v pokojích — teplý povrch, na který každé ráno stoupnete.' },
  { img: U('photo-1655370425442-1dcdc665782b'), alt: 'Detail dlažby v chodbě', t: 'Velkoformátová dlažba', d: 'V koupelně a chodbě. Snadná údržba, klidná kresba bez vzorů.' },
  { img: U('photo-1529047033375-f402d3da24ca'), alt: 'Stín okenního rámu na světlé stěně', t: 'Světlo a stínění', d: 'Izolační trojskla a venkovní žaluzie — světlo si pustíte, kdy chcete.' },
  { img: U('photo-1544551950-db18acf4c5be'), alt: 'Jemná textilie závěsu v denním světle', t: 'Klid a akustika', d: 'Tichý dům díky konstrukci a oknům. Doma slyšíte hlavně sebe.' },
];

/* Editorial modules, in the order they appear. `kind` drives the layout. */
export const story = {
  living: {
    kind: 'lifestyle',
    eyebrow: 'Život v prostoru',
    title: 'Místo, které se přizpůsobí vašemu dni.',
    text: 'Ranní káva u okna. Večeře s přáteli. Tichý večer, když všichni usnou. Dispozice je navržená tak, aby zvládla obojí — společné i vlastní.',
  },
  plan: {
    eyebrow: 'Dispozice',
    title: 'Každý metr má svůj smysl.',
    text: 'Podívejte se, jak je jednotka řešená. Kliknutím si půdorys otevřete ve větším.',
  },
  material: {
    kind: 'material',
    eyebrow: 'Materiály',
    title: 'Materiály, které budete vnímat každý den.',
    text: 'Povrchy vybíráme podle toho, jak stárnou a jak se na ně sahá — ne podle katalogu.',
  },
};

/* Project timeline. `current` marks the stage the project is in today. */
export const stages = [
  { label: 'Pozemek', done: true },
  { label: 'Výstavba', done: false, current: true },
  { label: 'Dokončení', done: false },
  { label: 'Kolaudace', done: false },
  { label: 'Předání', done: false },
];

/* What is around. Deliberately without distances — real walking times come from
   the CMS; inventing them would be presenting fiction as fact. */
export const nearby = [
  { icon: 'car', label: 'MHD' },
  { icon: 'users', label: 'Škola a školka' },
  { icon: 'home', label: 'Obchody' },
  { icon: 'leaf', label: 'Park a zeleň' },
  { icon: 'shield-check', label: 'Lékař' },
  { icon: 'map-pin', label: 'Centrum Plzně' },
];

/* Why IKO — drawn from information already published on the site. */
export const trust = [
  { icon: 'calendar', t: '35 let na trhu', d: 'Stavíme od roku 1991, rezidenční projekty od roku 2003.' },
  { icon: 'map-pin', t: 'Lokální developer', d: 'Stavíme a prodáváme v Plzni a okolí — v lokalitách, které známe.' },
  { icon: 'handshake', t: 'Vše pod jednou střechou', d: 'Příprava, realizace i prodej. Za kvalitou stojí konkrétní lidé.' },
  { icon: 'users', t: 'Jednáte přímo s námi', d: 'Bez prostředníků. Ozveme se do 24 hodin.' },
];

/* Demo room breakdown, derived from the unit so the figures stay consistent with
   the area shown elsewhere. Replaced by real room data from the catalogue sheet. */
const LAYOUTS = {
  '1+kk': [['Obývací pokoj s kuchyňským koutem', 0.52], ['Koupelna s WC', 0.14], ['Chodba', 0.12], ['Komora', 0.07]],
  '2+kk': [['Obývací pokoj s kuchyňským koutem', 0.42], ['Ložnice', 0.24], ['Koupelna', 0.11], ['WC', 0.04], ['Chodba', 0.12], ['Komora', 0.07]],
  '3+kk': [['Obývací pokoj s kuchyňským koutem', 0.34], ['Ložnice', 0.19], ['Pokoj', 0.14], ['Koupelna', 0.08], ['WC', 0.03], ['Chodba', 0.14], ['Komora', 0.05]],
  '4+kk': [['Obývací pokoj s kuchyňským koutem', 0.30], ['Ložnice', 0.17], ['Pokoj', 0.13], ['Pokoj', 0.12], ['Koupelna', 0.08], ['WC', 0.03], ['Chodba', 0.12], ['Komora', 0.05]],
};
LAYOUTS['5+kk'] = [...LAYOUTS['4+kk'].slice(0, 4), ['Pokoj', 0.10], ...LAYOUTS['4+kk'].slice(4)];
LAYOUTS['6+kk'] = LAYOUTS['5+kk'];

export function rooms(disposition, area) {
  const spec = LAYOUTS[disposition] || LAYOUTS['2+kk'];
  const total = spec.reduce((s, [, r]) => s + r, 0);
  return spec.map(([name, r]) => ({ name, area: Math.round((area * r / total) * 10) / 10 }));
}
