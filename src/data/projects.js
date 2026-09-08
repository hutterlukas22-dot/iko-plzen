// IKO — project portfolio data. Drives listing + detail pages + SEO routes.
// Imagery: real IKO project visualizations (optimized). Facts only — no invented
// prices/areas except Radobyčice unit specs, which come from the IKO Design System.

const P = (slug, i, size = 'lg') => `/projects/${slug}-${String(i).padStart(2, '0')}-${size}.jpg`;

export const projects = [
  /* ---------------------------------------------------------------- */
  {
    slug: 'rezidence-slovanske-udoli',
    imgPrefix: 'slovanske-udoli',
    name: 'Rezidence Slovanské údolí',
    status: 'aktualni',
    statusLabel: 'V prodeji',
    location: 'Plzeň — Slovanské údolí',
    kind: 'Bytové domy · dvojdomy · řadové domy',
    cover: P('slovanske-udoli', 1, 'sm'),
    coverAlt: 'Bytové domy Rezidence Slovanské údolí s barevnými fasádami a zelení, pohled z ulice',
    hero: P('slovanske-udoli', 6),
    heroVideo: '/video/hero-slovanske-udoli.mp4',
    interiorImg: 11,
    heroAlt: 'Letecký pohled na Rezidenci Slovanské údolí — nová rezidenční čtvrť v zeleném údolí v Plzni',
    intro:
      'Nová rezidenční čtvrť v zeleném plzeňském údolí. Bytové domy, dvojdomy a řadové domy propojené parkovou zelení a klidnými pěšími trasami — místo, kde má bydlení lidské měřítko.',
    description: [
      'Rezidence Slovanské údolí je naším největším aktuálním rezidenčním projektem. Vyrůstá v přírodním údolí na okraji Plzně, kde zástavbu rámuje vzrostlá zeleň, potok a stávající lesní svahy. Domy jsme rozmístili tak, aby si zachovaly soukromí a zároveň těžily z výhledů a otevřeného horizontu.',
      'Čtvrť kombinuje bytové domy s předzahrádkami a balkony, rodinné dvojdomy a řadové domy. Vzniká tak různorodá, ale sourodá komunita — od prvního bydlení až po prostorný rodinný domov. Veřejný prostor je navržený pro pěší a pro setkávání, ne pro auta.',
    ],
    meta: [
      { k: 'Lokalita', v: 'Plzeň — Slovanské údolí' },
      { k: 'Typ', v: 'Bytové a rodinné domy' },
      { k: 'Stav', v: 'V prodeji' },
      { k: 'Developer', v: 'IKO stavby s.r.o.' },
    ],
    composition: [
      { name: 'Bytové domy', code: 'BD1 · BD2', note: 'Byty s balkony a předzahrádkami', status: 'available' },
      { name: 'Rodinné dvojdomy', code: 'RDD 01–04', note: 'Samostatné vstupy, zahrada', status: 'available' },
      { name: 'Řadové rodinné domy', code: 'ŘRD 05–10', note: 'Vlastní parkování a zahrada', status: 'available' },
    ],
    gallery: [
      { i: 1, alt: 'Uliční pohled na bytové domy Slovanské údolí', span: 'g-span-4' },
      { i: 9, alt: 'Lidé procházející se po zelené pěší cestě mezi domy', span: 'g-span-2' },
      { i: 13, alt: 'Vnitroblok s rodinami a dětmi na trávníku', span: 'g-span-3' },
      { i: 3, alt: 'Cyklista v ulici mezi barevnými bytovými domy', span: 'g-span-3' },
      { i: 7, alt: 'Letecký pohled na řadové domy v zeleni', span: 'g-span-2' },
      { i: 11, alt: 'Terasa řadového domu s posezením a břízou', span: 'g-span-2' },
      { i: 15, alt: 'Řada rodinných domů podél zeleného pásu', span: 'g-span-2' },
      { i: 5, alt: 'Bytový dům s parkováním a zelenou střechou přístřešku', span: 'g-span-6' },
    ],
    place: {
      name: 'Slovanské údolí, Plzeň',
      text: 'Klidná rezidenční lokalita v zeleném údolí na jihu Plzně, s dostupností centra, škol i přírody. Zástavbu obklopuje les a otevřená krajina.',
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'bytovy-dum-cukrovarska',
    imgPrefix: 'cukrovarska',
    name: 'Bytový dům Cukrovarská',
    status: 'aktualni',
    statusLabel: 'V prodeji',
    location: 'Plzeň — Cukrovarská',
    kind: 'Městský bytový dům',
    cover: P('cukrovarska', 3, 'sm'),
    coverAlt: 'Cihelná fasáda bytového domu Cukrovarská s předzahradou a zelení',
    hero: P('cukrovarska', 1),
    heroVideo: '/video/hero-cukrovarska.mp4',
    interiorImg: 6,
    heroAlt: 'Bytový dům Cukrovarská — současná cihelná architektura se zelenými terasami v ulici v Plzni',
    intro:
      'Městský bytový dům, který citlivě doplňuje zavedenou plzeňskou ulici. Cihelná fasáda, zelené terasy a byty navržené pro každodenní pohodlí — bydlení ve městě, které zůstává klidné.',
    description: [
      'Bytový dům Cukrovarská je příkladem citlivé městské dostavby. Objem domu i materiály — cihla, dřevo a zeleň — navazují na charakter okolní zástavby a zároveň přinášejí současný architektonický výraz. Předsazené terasy s popínavou zelení dávají fasádě měkkost a rezidentům soukromí.',
      'Uvnitř nabízí dům světlé byty s velkorysými okny, předzahrádkami v přízemí a terasami ve vyšších podlažích. Návrh klade důraz na akustický a tepelný komfort a na kvalitní materiály v interiéru.',
    ],
    meta: [
      { k: 'Lokalita', v: 'Plzeň — Cukrovarská' },
      { k: 'Typ', v: 'Bytový dům' },
      { k: 'Stav', v: 'V prodeji' },
      { k: 'Charakter', v: 'Cihelná fasáda, zelené terasy' },
    ],
    composition: [
      { name: 'Byty s předzahrádkou', code: 'Přízemí', note: 'Vlastní vstup a předzahrádka', status: 'available' },
      { name: 'Byty s terasou', code: 'Vyšší podlaží', note: 'Předsazené terasy se zelení', status: 'available' },
      { name: 'Interiér', code: 'Standard IKO', note: 'Kvalitní materiály, velká okna', status: 'available' },
    ],
    gallery: [
      { i: 1, alt: 'Nároží bytového domu Cukrovarská s cihelnou fasádou a stromem', span: 'g-span-4' },
      { i: 4, alt: 'Zelené terasy s posezením a popínavou zelení', span: 'g-span-2' },
      { i: 6, alt: 'Interiér obývacího pokoje s kuchyní a zeleným gaučem', span: 'g-span-3' },
      { i: 7, alt: 'Interiér obývacího prostoru s jídelnou', span: 'g-span-3' },
      { i: 3, alt: 'Čelní pohled na fasádu domu s předzahradou a lidmi', span: 'g-span-2' },
      { i: 5, alt: 'Detail kryté lodžie s cihelnou clonou', span: 'g-span-2' },
      { i: 8, alt: 'Uliční pohled na bytový dům Cukrovarská', span: 'g-span-2' },
      { i: 2, alt: 'Bytový dům se vzrostlým stromem v kontextu ulice', span: 'g-span-6' },
    ],
    place: {
      name: 'Cukrovarská, Plzeň',
      text: 'Zavedená městská ulice s dobrou dostupností centra i služeb. Dostavba respektuje měřítko a atmosféru okolí.',
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'radobycice-brizova',
    imgPrefix: 'radobycice',
    name: 'Radobyčice — Břízová',
    status: 'aktualni',
    statusLabel: 'V prodeji',
    location: 'Plzeň — Radobyčice',
    kind: 'Rodinné domy · dvojdomy · řadové domy',
    cover: P('radobycice', 2, 'sm'),
    coverAlt: 'Moderní rodinný dvojdům v projektu Radobyčice — Břízová',
    hero: P('radobycice', 2),
    heroVideo: '/video/hero-radobycice.mp4',
    interiorImg: 5,
    heroAlt: 'Rodinné domy v projektu Radobyčice — Břízová v Plzni, moderní architektura s předzahradou',
    intro:
      'Klidná rezidenční čtvrť rodinných, řadových a dvojdomů v Radobyčicích. Čistá současná architektura, promyšlené dispozice a navazující rekonstrukce Břízové ulice.',
    description: [
      'Radobyčice — Břízová je čtvrť rodinného bydlení na jižním okraji Plzně. Nabízí samostatné rodinné domy, dvojdomy a řadové domy s vlastními zahradami a parkováním. Architektura sází na čisté tvary, kvalitní materiály a energeticky úsporná řešení.',
      'Domy jsou připraveny k prodeji v několika velikostech a dispozicích. Ke každému domu patří pozemek, parkovací stání a zázemí pro moderní rodinu.',
    ],
    meta: [
      { k: 'Lokalita', v: 'Plzeň — Radobyčice' },
      { k: 'Typ', v: 'Rodinné domy' },
      { k: 'Stav', v: 'V prodeji' },
      { k: 'Energetika', v: 'Tepelné čerpadlo + FVE' },
    ],
    // Unit specs sourced from the IKO Design System (ui_kits/web).
    units: [
      { name: 'Dvojdům A', layout: '5+kk', area: '142 m²', plot: 'A1–A6', price: '12 900 000 Kč', status: 'available' },
      { name: 'Dvojdům B', layout: '5+kk', area: '138 m²', plot: 'B1–B6', price: '12 400 000 Kč', status: 'available' },
      { name: 'Řadový dům', layout: '4+kk', area: '118 m²', plot: '1–8', price: '10 400 000 Kč', status: 'reserved' },
      { name: 'Rodinný dům A', layout: '6+kk', area: '168 m²', plot: 'A1–A2', price: '14 200 000 Kč', status: 'available' },
      { name: 'Rodinný dům B', layout: '6+kk', area: '172 m²', plot: 'B1–B2', price: '14 800 000 Kč', status: 'sold' },
    ],
    gallery: [
      { i: 2, alt: 'Rodinný dvojdům A s parkováním a živým plotem', span: 'g-span-3' },
      { i: 3, alt: 'Rodinný dvojdům B s vozem na příjezdové cestě', span: 'g-span-3' },
      { i: 4, alt: 'Řadové domy s pěší cestou a zelení', span: 'g-span-2' },
      { i: 5, alt: 'Samostatný rodinný dům se zahradou v podvečerním světle', span: 'g-span-2' },
      { i: 6, alt: 'Rodinný dům s garáží a předzahradou', span: 'g-span-2' },
      { i: 1, alt: 'Letecký pohled na celou čtvrť Radobyčice — Břízová', span: 'g-span-6' },
    ],
    place: {
      name: 'Radobyčice, Plzeň',
      text: 'Příměstská lokalita na jihu Plzně u řeky Radbuzy — klid, zeleň a dobrá dostupnost centra. Součástí projektu je i rekonstrukce Břízové ulice.',
    },
  },
];

// Currently prepared / selling elsewhere (no dedicated gallery yet).
/* Current offer, as supplied by the client. `web` is the project's own site — the
   tile CTA goes there once the URL is known; until then it falls back to the
   internal detail page (`slug`). Projects without imagery render a branded
   placeholder rather than borrowing another project's photo. */
export const currentProjects = [
  { name: 'Rezidence Slovanské údolí', location: 'Plzeň — Slovanské údolí', status: 'selling',
    completion: '2028', units: 75, slug: 'rezidence-slovanske-udoli', web: null, img: P('slovanske-udoli', 6) },
  { name: 'Ke Střílně, Zruč — Senec', location: 'Zruč — Senec', status: 'selling',
    completion: '2027', units: 14, slug: null, web: null, img: null },
  { name: 'Mýto A1, U Sladovny', location: 'Mýto u Rokycan', status: 'selling',
    completion: '2026', units: 17, slug: null, web: null, img: null },
  { name: 'Nové Skvrňany BD 03', location: 'Plzeň — Skvrňany', status: 'selling',
    completion: '2026', units: 51, slug: null, web: null, img: null },
  { name: 'Újezd — jih, I. etapa', location: 'Plzeň — Újezd', status: 'soldout',
    completion: '2026', units: null, slug: null, web: null, img: '/photos/ujezd-jih-lg.jpg' },
  { name: 'Bytový dům Cukrovarská', location: 'Plzeň — Cukrovarská', status: 'preparing',
    completion: null, units: 12, slug: 'bytovy-dum-cukrovarska', web: null, img: P('cukrovarska', 1) },
];

export const projectStatusMeta = {
  selling: { label: 'V prodeji', cls: 'available' },
  preparing: { label: 'Připravujeme', cls: 'reserved' },
  soldout: { label: 'Vyprodáno', cls: 'sold' },
};

/* In preparation — descriptions supplied by the client. */
export const pipeline = [
  { name: 'Újezd — jih, 2. etapa', location: 'Plzeň — Újezd', units: 242,
    note: 'V návaznosti na probíhající výstavbu 1. etapy připravujeme pokračování výstavby v této lokalitě. Celkem se bude jednat o 242 bytových jednotek v bytových a řadových rodinných domech. Součástí bude i 6 nebytových jednotek pro zlepšení občanské vybavenosti a vybudování kompletní technické a dopravní infrastruktury včetně ploch zeleně a ploch pro sportování.' },
  { name: 'K Cihelnám, Černice', location: 'Plzeň — Černice', units: 70,
    note: 'Trojice bytových domů sevřených do jednoho obytného celku s vnitroblokem plným zeleně a herních prvků. Objekty obsahují 6 samostatných vstupů ve třech nadzemních a jednom podzemním podlaží, na střechách pobytové terasy pro společné využití a v suterénu parkování pro obyvatele. Celkem 70 bytových jednotek nedaleko nově vznikajícího víceúčelového sportoviště.' },
  { name: 'Radobyčice — jih 2', location: 'Plzeň — Radobyčice', units: 77,
    note: 'Pokračování unikátního projektu rodinného bydlení na okraji Plzně. Domy typů A–E jsou navrženy tak, aby byly v souladu s charakterem území. Celkem 77 bytových jednotek v podobě řadových domů s vlastními zahradami, garážemi nebo parkovacími stáními, včetně komunikací, veřejného prostoru a herních prvků.' },
];

/* Completed developments — real photography of finished localities. */
export const completed = [
  { name: 'Obytná lokalita Plzeň Újezd, jih — 1. etapa', location: 'Plzeň — Újezd', years: '2019 — 2027',
    img: '/photos/ujezd-jih-sm.jpg',
    note: 'Území o rozloze 4,99 ha zahrnuje 154 bytů v bytových domech, 35 řadových domů a 15 samostatných rodinných domů. Byty 1+kk až 4+kk s výměrami 29,5 až 103,9 m², včetně balkonů, lodžií a teras.' },
  { name: 'Radobyčice — Břízová', location: 'Plzeň — Radobyčice', years: '2023 — 2026',
    img: P('radobycice', 2, 'sm'),
    note: 'Projekt zahrnoval 25 bytových jednotek — 8 v řadových rodinných domech, 12 v rodinných dvojdomech a 5 v samostatných rodinných domech. Nejklidnější lokalita pro bydlení v této části města.' },
  { name: 'Radobyčice — západ', location: 'Plzeň — Radobyčice', years: '2017 — 2023',
    img: '/photos/radobycice-zapad-sm.jpg',
    note: 'Výstavba 25 řadových rodinných domů, 24 bytů v řadových rodinných domech a 15 samostatných rodinných domů, včetně kompletní technické a dopravní infrastruktury.' },
  { name: 'Obytná lokalita Plzeň Újezd, Na Dražkách', location: 'Plzeň — Újezd', years: '2015 — 2018',
    award: 'Stavba roku Plzeňského kraje 2017', img: '/photos/ujezd-drazkach-sm.jpg',
    note: 'Kompletní technická a dopravní infrastruktura, 4 bytové domy s 69 bytovými jednotkami, 14 řadových domů a 4 dvojdomy. Součástí lokality je odpočinkový prostor s dětským hřištěm.' },
  { name: 'K Plzenci 3, Plzeň — Černice', location: 'Plzeň — Černice', years: '2013 — 2017',
    img: '/photos/k-plzenci-3-sm.jpg',
    note: 'Polyfunkční domy 1, 2, 3 a 5 s celkem 52 bytovými jednotkami, 9 nebytovými jednotkami o výměře 1 001,7 m² a administrativními prostory o výměře 1 233,3 m².' },
  { name: 'K Plzenci 4, Plzeň — Černice', location: 'Plzeň — Černice', years: '2013 — 2015',
    img: '/photos/k-plzenci-4-sm.jpg',
    note: 'Deset řadových domů rozdělených do dvou řad stojících naproti sobě.' },
  { name: '8 rodinných domů v Radobyčicích', location: 'Plzeň — Radobyčice', years: '2013 — 2014',
    img: '/photos/radobycice-8rd-sm.jpg',
    note: 'Nepodsklepené dvoupodlažní objekty obdélníkového tvaru s plochou střechou, navržené jako typová zhuštěná zástavba doplňující okolní zástavbu.' },
];

export const statusMeta = {
  available: { label: 'Volné', cls: 's-available' },
  reserved: { label: 'Rezervováno', cls: 's-reserved' },
  sold: { label: 'Prodáno', cls: 's-sold' },
};

export const getProject = (slug) => projects.find((p) => p.slug === slug);
