// IKO — Aktuality (news feed). Demo content for the prototype; a CMS replaces it.
export const newsCategories = ['Vše', 'Zahájení prodeje', 'Kolaudace', 'Den otevřených dveří', 'Novinka'];

export const news = [
  {
    slug: 'zahajeni-prodeje-slovanske-udoli-bd2',
    date: '2026-07-28',
    category: 'Zahájení prodeje',
    project: 'Rezidence Slovanské údolí',
    title: 'Spouštíme prodej bytů v BD2 na Slovanském údolí',
    excerpt: 'Do nabídky přidáváme dvacet nových bytů 1+kk až 4+kk v druhém bytovém domě. Nejlepší dispozice mizí první — ozvěte se nám.',
    image: '/projects/slovanske-udoli-05-sm.jpg',
  },
  {
    slug: 'den-otevrenych-dveri-cukrovarska',
    date: '2026-07-15',
    category: 'Den otevřených dveří',
    project: 'Bytový dům Cukrovarská',
    title: 'Den otevřených dveří v Bytovém domě Cukrovarská',
    excerpt: 'Přijďte si prohlédnout vzorový byt i společné prostory. Náš tým vám na místě odpoví na vše kolem koupě i financování.',
    image: '/projects/cukrovarska-04-sm.jpg',
  },
  {
    slug: 'kolaudace-radobycice-brizova-1etapa',
    date: '2026-06-30',
    category: 'Kolaudace',
    project: 'Radobyčice — Břízová',
    title: 'První etapa Radobyčice — Břízová zkolaudována',
    excerpt: 'Rodinné a řadové domy první etapy jsou dokončené a připravené k předání novým majitelům. Gratulujeme sousedům!',
    image: '/projects/radobycice-05-sm.jpg',
  },
  {
    slug: 'financovani-spoluprace-refin',
    date: '2026-06-10',
    category: 'Novinka',
    project: null,
    title: 'Pomůžeme vám s hypotékou přímo u nás',
    excerpt: 'Rozšiřujeme poradenství k financování. Provedeme vás nabídkami bank a pomůžeme vybrat řešení na míru — bez běhání po pobočkách.',
    image: '/projects/cukrovarska-06-sm.jpg',
  },
  {
    slug: 'slovanske-udoli-vnitroblok-hotovy',
    date: '2026-05-22',
    category: 'Novinka',
    project: 'Rezidence Slovanské údolí',
    title: 'Vnitroblok Slovanského údolí dostává finální podobu',
    excerpt: 'Dokončujeme sadové úpravy, dětské prvky a pěší trasy. Čtvrť tak získává klidné srdce pro každodenní život.',
    image: '/projects/slovanske-udoli-13-sm.jpg',
  },
  {
    slug: 'novy-web-ikoplzen',
    date: '2026-05-05',
    category: 'Novinka',
    project: null,
    title: 'Sjednocujeme projekty do jednoho portálu',
    excerpt: 'Všechny naše projekty i volné jednotky najdete nově na jednom místě, s interaktivním výběrem bytu podle patra.',
    image: '/projects/slovanske-udoli-06-sm.jpg',
  },
];

export const newsSorted = news.slice().sort((a, b) => b.date.localeCompare(a.date));
export const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${Number(d)}. ${Number(m)}. ${y}`;
};
