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
    city: '326 00 Plzeň',
    phone: '371 656 911',
    phoneHref: '+420371656911',
    careersPhone: '371 656 922',
    careersPhoneHref: '+420371656922',
    email: 'iko@ikoplzen.cz',
    ico: 'Krajský soud Plzeň, oddíl C, vložka 26510',
    facebook: 'https://www.facebook.com/ikostavbyplzen',
    youtube: 'https://www.youtube.com/@ikoplzen5446',
  },
  nav: [
    { href: '/projekty/', label: 'Projekty' },
    { href: '/o-nas/', label: 'O nás' },
    { href: '/sluzby/', label: 'Služby' },
    { href: '/kariera/', label: 'Kariéra' },
    { href: '/kontakt/', label: 'Kontakt' },
  ],
  // Trust numbers — all verifiable from company materials.
  stats: [
    { v: '35', l: 'let na trhu', s: 'Rodinná firma z Plzně od roku 1991' },
    { v: '100 %', l: 'vlastní kapitál', s: 'Bez rizika zastavení projektu' },
    { v: '1', l: 'dodavatel', s: 'Realizace i prodej pod jednou střechou' },
    { v: '2003', l: 'developerská činnost', s: 'Vlastní rezidenční projekty' },
  ],
};

// "Proč IKO" — reframed advantages (from Výhody pro klienty). Real, not generic.
export const principles = [
  {
    t: 'Prodej bez prostředníků',
    d: 'Prodej nemovitostí probíhá zcela v naší režii, bez účasti dalších zprostředkovatelů. Jednáte přímo s tím, kdo dům staví.',
  },
  {
    t: 'Klientské změny',
    d: 'Vyjdeme vstříc vašim požadavkům na úpravy. Změny zpracováváme interně ve spolupráci s projectstudio8.',
  },
  {
    t: 'Vlastní stavební dozor',
    d: 'Realizaci vedou naši stavbyvedoucí a mistři. Kvalitu hlídáme my — od základů po předání klíčů.',
  },
  {
    t: 'Pomoc s financováním',
    d: 'Poradíme a pomůžeme se zajištěním financování koupě nemovitosti, ať začínáte nebo měníte bydlení.',
  },
  {
    t: 'Jedno kontaktní místo',
    d: 'Veškeré dotazy vyřídíte na jednom místě. Bez přehazování mezi firmami, bez ztraceného času.',
  },
  {
    t: 'Vertikální integrace',
    d: 'Kupujete jistotu, ne jen metry čtvereční. Vlastní kapitál, vlastní realizace, vlastní prodej.',
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
export const services = {
  development: {
    k: 'Development',
    t: 'Vlastní rezidenční projekty',
    d: 'Připravujeme, stavíme a prodáváme vlastní rezidenční projekty v Plzni a okolí — od výběru pozemku po předání hotového domova.',
    items: [
      'Realizace vlastních developerských projektů',
      'Rodinné domy, dvojdomy a řadové domy',
      'Bytové domy',
      'Příprava pozemků pro individuální výstavbu',
      'Realitní činnost v rámci vlastního developmentu',
    ],
  },
  construction: {
    k: 'Stavební činnost',
    t: 'Výstavba pro investory',
    d: 'Stavíme také na zakázku pro externí investory. Přinášíme 35 let řemesla, vlastní realizační tým a spolehlivé vedení stavby.',
    items: [
      'Výstavba pro externí investory',
      'Dodávky staveb na klíč',
      'Zajištění projektu a inženýrská činnost',
      'Vedení stavby vlastními stavbyvedoucími',
      'Stavební dozor a kontrola kvality',
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
