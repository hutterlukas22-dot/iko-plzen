// IKO — site-wide content. Single source of truth. Czech, formal (vy).
// Facts sourced from ikoplzen.cz and the IKO Design System. No invented data.

export const site = {
  name: 'IKO stavby s.r.o.',
  shortName: 'IKO',
  domain: 'ikoplzen.cz',
  url: 'https://www.ikoplzen.cz',
  founded: 1991,
  years: 35, // 1991 → 2026
  tagline: 'Stavíme tam, kde sami chceme bydlet.',
  description:
    'Rodinná stavební a developerská firma z Plzně. Od roku 1991 stavíme a prodáváme rezidenční bydlení — rodinné domy, řadové domy, dvojdomy i byty — v Plzni a okolí.',
  contact: {
    company: 'IKO stavby s.r.o.',
    street: 'Vltavínová 1334/3',
    city: '326 00 Plzeň — Černice',
    phone: '371 656 911',
    phoneHref: '+420371656911',
    careersPhone: '371 656 922',
    careersPhoneHref: '+420371656922',
    email: 'projekty@ikoplzen.cz',
    careersEmail: 'general@ikostavby.cz',
    ico: 'Krajský soud Plzeň, oddíl C, vložka 26510',
    facebook: 'https://www.facebook.com/ikostavbyplzen',
    youtube: 'https://www.youtube.com/@ikoplzen5446',
    instagram: null, // client to supply
    linkedin: null,  // client to supply
  },
  nav: [
    { href: '/projekty/', label: 'Projekty' },
    { href: '/proc-iko/', label: 'Proč IKO' },
    { href: '/pruvodce-nakupem/', label: 'Průvodce nákupem' },
    { href: '/tym/', label: 'Tým' },
    { href: '/aktuality/', label: 'Aktuality' },
    { href: '/o-nas/', label: 'O nás' },
    { href: '/sluzby/', label: 'Služby' },
    { href: '/kariera/', label: 'Kariéra' },
    { href: '/kontakt/', label: 'Kontakt' },
  ],
  // Trust numbers — all verifiable from company materials.
  stats: [
    { v: '35', l: 'let na trhu', s: 'Rodinná firma z Plzně od roku 1991' },
    { v: '1875+', l: 'postavených bytových jednotek', s: 'Od roku 1991 po dnešek' },
    { v: '19+', l: 'realizovaných kompletních projektů', s: 'Celé obytné lokality' },
    { v: '1400+', l: 'připravovaných jednotek', s: 'V 9 lokalitách' },
  ],
};

// "Proč IKO" — six reasons, wording supplied by the client.
export const principles = [
  {
    t: 'Stavíme sami, ne jen zadáváme',
    d: 'Máme vlastní stavební zkušenost a průběh realizace držíme pod kontrolou. Díky tomu víme, co se na stavbě děje, a dokážeme řešit věci přímo, ne přes řetězec prostředníků.',
  },
  {
    t: 'Bydlení, které má kontext',
    d: 'Nevnímáme pozemek jako prázdnou plochu pro co nejvíce jednotek. Hledáme rovnováhu mezi domy, prostorem, zelení, dopravou a soukromím — aby lokalita dobře sloužila lidem, kteří v ní budou žít.',
  },
  {
    t: 'Plzeň známe jako domov, ne jako trh',
    d: 'Stavíme především na okrajích Plzně a v jejím blízkém okolí. Známe charakter jednotlivých lokalit, jejich možnosti i to, co jim může skutečně prospět.',
  },
  {
    t: 'Od prvního dotazu k předání klíčů',
    d: 'Prodej zajišťujeme přímo. Bez provize pro realitního zprostředkovatele a bez přeposílání mezi firmami. Máte jeden tým, jasné informace a konkrétní lidi, na které se můžete obrátit.',
  },
  {
    t: 'Domov podle vás',
    d: 'Kde to projekt umožňuje, řešíme klientské změny individuálně — přímo v našem zázemí a ve spolupráci s projektanty. Protože domov má odpovídat vašemu životu, ne jen původnímu půdorysu.',
  },
  {
    t: 'Zkušenost, která nekončí podpisem smlouvy',
    d: 'Od roku 1991 jsme realizovali stavby pro investory i vlastní obytné projekty. Víme, že důvěra se nestaví reklamou, ale kvalitou práce a tím, jak se k lidem chováme i poté, co převezmou svůj nový domov.',
  },
];

// Company milestones — timeline. Only documented facts.
export const milestones = [
  {
    year: '1991',
    t: 'IKO vzniká',
    d: 'Firma zahajuje činnost jako stavební společnost — dodávky staveb na klíč včetně zajištění projektu, stavebního povolení a kolaudace.',
  },
  {
    year: '2003',
    t: 'Přechod k developmentu',
    d: 'IKO rozšiřuje činnost o developerskou výstavbu zaměřenou na rezidenční bydlení — rodinné domy, řadové domy a bytové domy.',
  },
  {
    year: '2017',
    t: 'Stavba roku Plzeňského kraje',
    d: 'Rezidenční lokalita Újezd — Na Dražkách získává ocenění Stavba roku Plzeňského kraje 2017.',
  },
  {
    year: '2026',
    t: 'Jedna značka, jeden portál',
    d: 'IKO sjednocuje roztříštěné projektové microsite do jednoho silného portálu ikoplzen.cz s interaktivním vyhledáváním nemovitostí.',
  },
];

// Services — two sides of the business.
// Services — wording supplied by the client.
export const services = {
  development: {
    k: 'Development',
    t: 'Od pozemku k novému domovu.',
    d: 'Vlastní developerské projekty připravujeme od první myšlenky až po předání klíčů. Hledáme perspektivní místa v Plzni a blízkém okolí, prověřujeme jejich možnosti a navrhujeme bydlení, které dává smysl lidem i lokalitě. Zajišťujeme přípravu území, projektovou a povolovací část, realizaci, prodej i klientský servis.',
    items: [
      'vyhledání a přípravu pozemků',
      'návrh a koordinaci projektu',
      'inženýring a povolovací proces',
      'výstavbu domů a infrastruktury',
      'prodej nemovitostí bez zprostředkovatelů',
      'klientské změny a podporu při financování',
    ],
  },
  construction: {
    k: 'Stavby pro externí investory',
    t: 'Vaše vize. Naše zkušenost ze stavby.',
    d: 'Realizujeme také stavby pro soukromé i firemní investory. Máme zkušenosti s novostavbami, rekonstrukcemi i modernizacemi — výrobní a administrativní areály, zdravotnická zařízení, skladové haly, penziony i další občanské a komerční stavby.',
    items: [
      'realizaci novostaveb, rekonstrukcí a modernizací',
      'koordinaci stavby a profesí',
      'zkušené vedení stavby a dohled nad kvalitou',
      'kontrolu termínů, rozpočtu a postupu prací',
      'odpovědnost za kvalitně dokončené dílo',
    ],
  },
};

// Career — real posting from ikoplzen.cz. No invented salaries/benefits.
export const career = {
  title: 'Stavbyvedoucí',
  location: 'Plzeň a okolí',
  type: 'Hlavní pracovní poměr',
  salary: '60 000 – 90 000 Kč',
  salaryNote: 'dle zkušeností a autorizace',
  intro:
    'Hledáme zkušeného stavbyvedoucího do stabilní a prosperující rodinné firmy. Povedete realizaci vlastních developerských projektů IKO v Plzni a okolí.',
  responsibilities: [
    'Řízení stavby a vedení pracovníků',
    'Sledování harmonogramu a kvality provedení',
    'Komunikace s investorem a stavebním dozorem',
  ],
  offer: [
    'HPP se standardní pracovní dobou (Plzeň a okolí)',
    'Stabilní, prosperující firma s prostorem pro rozvoj',
    'Mobilní telefon, notebook a osobní automobil',
    'Nástupní mzda 60 000 – 90 000 Kč dle zkušeností a autorizace',
    'Výkonnostní odměny a benefity',
  ],
  requirements: [
    'Střední nebo vysoká škola stavebního směru',
    'Minimálně 5 let praxe ve stavebnictví',
    'Klientský a příjemný přístup',
    'Řidičský průkaz skupiny B',
    'Práce na PC; znalost AutoCADu a systému Kros výhodou',
  ],
};
