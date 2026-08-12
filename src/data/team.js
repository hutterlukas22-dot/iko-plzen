// IKO — people. DEMO names/contacts for the prototype; a CMS supplies the real team.
export const team = [
  { id: 'novak', name: 'Jan Novák', role: 'Jednatel', note: 'Vede firmu i výběr lokalit. Za IKO ručí svým jménem.', email: 'iko@ikoplzen.cz' },
  { id: 'svobodova', name: 'Petra Svobodová', role: 'Vedoucí prodeje', note: 'První kontakt pro zájemce — provede vás nabídkou i rezervací.', phone: '371 656 916', phoneHref: '+420371656916', email: 'projekty@ikoplzen.cz' },
  { id: 'dvorak', name: 'Martin Dvořák', role: 'Hlavní stavbyvedoucí', note: 'Odpovídá za kvalitu provedení na stavbách IKO.', phone: '371 656 911', phoneHref: '+420371656911' },
  { id: 'markova', name: 'Lucie Marková', role: 'Klientské změny', note: 'Pomůže upravit standard bytu podle vašich představ.', email: 'projekty@ikoplzen.cz' },
  { id: 'benes', name: 'Tomáš Beneš', role: 'Financování', note: 'Poradí s hypotékou i splátkovým kalendářem.', email: 'iko@ikoplzen.cz' },
  { id: 'horakova', name: 'Eva Horáková', role: 'Administrativa a smlouvy', note: 'Připraví smluvní dokumentaci a provede vás podpisy.', phone: '371 656 911', phoneHref: '+420371656911' },
  { id: 'kral', name: 'Ondřej Král', role: 'Prodej — Cukrovarská', note: 'Provede vás nabídkou bytů v Cukrovarské.', phone: '371 656 917', phoneHref: '+420371656917', email: 'projekty@ikoplzen.cz' },
  { id: 'nova', name: 'Klára Nová', role: 'Prodej — Radobyčice', note: 'Zodpoví vše k rodinným a řadovým domům.', phone: '371 656 918', phoneHref: '+420371656918', email: 'projekty@ikoplzen.cz' },
];

export const byId = (id) => team.find((p) => p.id === id) || team[1];

// Which salesperson looks after which project — shown on the unit detail page so
// the visitor knows who will answer, the way a broker card does.
export const salesContact = {
  'rezidence-slovanske-udoli': 'svobodova',
  'bytovy-dum-cukrovarska': 'kral',
  'radobycice-brizova': 'nova',
};

export const initialsOf = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
