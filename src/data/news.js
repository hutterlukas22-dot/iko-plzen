// IKO — Aktuality. One sample post kept as a template for the client to copy
// when adding real news; the CMS replaces this list.
export const newsCategories = ['Vše', 'Zahájení prodeje', 'Kolaudace', 'Den otevřených dveří', 'Novinka'];

export const news = [
  {
    slug: 'novy-web-iko',
    date: '2026-08-12',
    category: 'Novinka',
    project: null,
    title: 'Spuštěn nový web IKO s unikátním vyhledávačem nemovitostí',
    excerpt: 'Všechny probíhající projekty i volné jednotky najdete nově na jednom místě — s filtrováním podle dispozice, plochy i stavu a s porovnáváním jednotek.',
    image: '/photos/home-lokalita-sm.jpg',
  },
];

export const newsSorted = news.slice().sort((a, b) => b.date.localeCompare(a.date));
export const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${Number(d)}. ${Number(m)}. ${y}`;
};
