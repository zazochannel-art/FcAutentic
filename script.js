const players = [
  {
    id: "FCA-DEMO-007",
    slug: "andrei-popescu",
    name: "Andrei Popescu",
    number: 7,
    position: "Atacant",
    category: "U16",
    birthdate: "2010-02-18",
    height: 173,
    weight: 65,
    foot: "Drept",
    nationality: "Moldova",
    city: "Chișinău",
    phone: "+373 60 700 007",
    email: "andrei.popescu@fcautentic.md",
    address: "Str. Test 7, Chișinău",
    attendance: 94,
    status: "Activ",
    dues: "Achitat",
    goals: 11,
    assists: 6,
    stats: { played: 16, started: 14, minutes: 1180, goals: 11, assists: 6, yellow: 1, red: 0, mvp: 3, rating: 8.6 },
    evolution: { performance: [62, 68, 72, 79, 83, 87], weight: [63, 63.5, 64, 64.5, 65], height: [170, 171, 172, 173], seasonProgress: 82, coachGoals: ["Finalizare rapidă", "Demarcări între linii", "Presing după pierdere"], completedGoals: ["Șut cu dreptul", "Atacarea spațiului"] },
    training: { motivated: 1, unmotivated: 0, history: ["Luni: prezent", "Marți: prezent", "Joi: prezent", "Vineri: prezent"] },
    evaluation: { technique: 86, speed: 89, strength: 72, stamina: 84, tactics: 80, discipline: 88, teamwork: 86, comment: "Profil demo: atacant activ, foarte util pentru testarea editării." },
    achievements: ["Jucător demo al lunii", "Cel mai bun marcator U16"],
    calendar: ["13 iunie: meci test", "15 iunie: antrenament tehnic", "18 iunie: evaluare staff"],
    documents: ["Contract demo", "Fișă medicală demo", "Acord parental demo"],
    media: ["Foto demo: gol", "Video demo: sprint", "Moment demo: MVP"],
    notifications: ["Cont demo pregătit pentru verificare", "Convocat la meciul de test"],
    personalNotes: "Jucător demo creat pentru verificarea completă a sistemului."
  },
  {
    id: "FCA-DEMO-010",
    slug: "david-munteanu",
    name: "David Munteanu",
    number: 10,
    position: "Mijlocaș",
    category: "U16",
    birthdate: "2010-06-04",
    height: 171,
    weight: 64,
    foot: "Stâng",
    nationality: "Moldova",
    city: "Chișinău",
    phone: "+373 60 700 010",
    email: "david.munteanu@fcautentic.md",
    address: "Str. Test 10, Chișinău",
    attendance: 91,
    status: "Activ",
    dues: "Achitat",
    goals: 6,
    assists: 12,
    stats: { played: 17, started: 15, minutes: 1260, goals: 6, assists: 12, yellow: 2, red: 0, mvp: 4, rating: 8.8 },
    evolution: { performance: [64, 69, 75, 80, 84, 89], weight: [62, 62.5, 63, 63.5, 64], height: [168, 169, 170, 171], seasonProgress: 86, coachGoals: ["Pase decisive", "Schimbare direcție", "Lider în linia mediană"], completedGoals: ["Execuții cu stângul", "Control orientat"] },
    training: { motivated: 1, unmotivated: 1, history: ["Luni: prezent", "Marți: prezent", "Joi: absent motivat", "Vineri: prezent"] },
    evaluation: { technique: 90, speed: 82, strength: 70, stamina: 86, tactics: 91, discipline: 84, teamwork: 92, comment: "Profil demo: mijlocaș creativ, ideal pentru testarea statisticilor și evaluărilor." },
    achievements: ["Cel mai bun pasator demo", "Jucătorul lunii U16"],
    calendar: ["14 iunie: antrenament tactic", "17 iunie: test fizic", "20 iunie: meci amical"],
    documents: ["Contract demo", "Fișă medicală demo", "Acord parental demo"],
    media: ["Foto demo: assist", "Video demo: pasă verticală", "Moment demo: căpitan"],
    notifications: ["Cont demo pregătit pentru verificare", "Antrenor: focus pe pase filtrante"],
    personalNotes: "Jucător demo creat pentru verificarea completă a sistemului."
  },
  {
    id: "FCA-2026-009",
    name: "Cristian Popa",
    number: 9,
    position: "Atacant",
    category: "U19",
    birthdate: "2008-03-14",
    height: 181,
    weight: 73,
    foot: "Drept",
    nationality: "Moldova",
    city: "Chișinău",
    phone: "+373 68 245 119",
    email: "cristian.popa@fcautentic.md",
    address: "Str. Ștefan cel Mare 41, Chișinău",
    attendance: 90,
    status: "Activ",
    dues: "Achitat",
    goals: 13,
    assists: 5,
    stats: { played: 18, started: 16, minutes: 1428, goals: 13, assists: 5, yellow: 2, red: 0, mvp: 4, rating: 8.7 },
    evolution: { performance: [64, 70, 68, 78, 82, 88], weight: [71, 71.5, 72, 72.4, 73], height: [178, 179, 180, 181], seasonProgress: 78, coachGoals: ["Finalizare cu ambele picioare", "Presing coordonat", "3 sprinturi maxime pe repriză"], completedGoals: ["Finalizare din prima", "Poziționare între fundași"] },
    training: { motivated: 2, unmotivated: 1, history: ["Luni: prezent", "Marți: prezent", "Joi: absent motivat", "Vineri: prezent"] },
    evaluation: { technique: 88, speed: 91, strength: 75, stamina: 84, tactics: 82, discipline: 86, teamwork: 89, comment: "Atacant decisiv, cu progres vizibil la presing și finalizare sub presiune." },
    achievements: ["Jucătorul lunii aprilie", "Cel mai bun marcator U19", "Cupa Municipală 2026"],
    calendar: ["13 iunie: meci vs Rapid Junior", "15 iunie: antrenament tactic", "18 iunie: ședință video"],
    documents: ["Contract semnat", "Fișă medicală actualizată", "Acord parental valid"],
    media: ["Foto: gol decisiv", "Video: sprint 30m", "Moment: MVP etapa 7"],
    notifications: ["Convocat pentru următorul meci", "Mesaj antrenor: lucru individual la finalizare", "Anunț: echipament deplasare vineri"]
  },
  {
    id: "FCA-2026-001",
    name: "Andrei Munteanu",
    number: 1,
    position: "Portar",
    category: "U19",
    birthdate: "2008-09-02",
    height: 187,
    weight: 78,
    foot: "Drept",
    nationality: "Moldova",
    city: "Ialoveni",
    phone: "+373 69 110 442",
    email: "andrei.munteanu@fcautentic.md",
    address: "Str. Independenței 12, Ialoveni",
    attendance: 96,
    status: "Activ",
    dues: "Achitat",
    goals: 0,
    assists: 1,
    stats: { played: 17, started: 17, minutes: 1530, goals: 0, assists: 1, yellow: 1, red: 0, mvp: 2, rating: 8.4 },
    evolution: { performance: [70, 74, 76, 81, 83, 86], weight: [76, 76.5, 77, 77.4, 78], height: [184, 185, 186, 187], seasonProgress: 82, coachGoals: ["Ieșiri pe centrări", "Distribuție rapidă", "Comunicare defensivă"], completedGoals: ["Reflexe 1v1", "Degajare precisă"] },
    training: { motivated: 1, unmotivated: 0, history: ["Luni: prezent", "Marți: prezent", "Joi: prezent", "Vineri: prezent"] },
    evaluation: { technique: 82, speed: 76, strength: 83, stamina: 80, tactics: 86, discipline: 92, teamwork: 88, comment: "Portar stabil, foarte bun la organizarea liniei defensive." },
    achievements: ["Clean sheet x6", "MVP etapa 3", "Turneu regional finalist"],
    calendar: ["13 iunie: meci vs Rapid Junior", "16 iunie: antrenament portari", "19 iunie: control medical"],
    documents: ["Contract semnat", "Fișă medicală actualizată", "Acord parental valid"],
    media: ["Foto: paradă 1v1", "Video: penalty apărat", "Moment: clean sheet"],
    notifications: ["Antrenament portari la ora 17:30", "Staff: verifică mănușile de meci"]
  },
  {
    id: "FCA-2026-006",
    name: "Dorin Lupu",
    number: 6,
    position: "Mijlocaș",
    category: "U19",
    birthdate: "2008-05-21",
    height: 176,
    weight: 69,
    foot: "Stâng",
    nationality: "Moldova",
    city: "Chișinău",
    phone: "+373 67 431 880",
    email: "dorin.lupu@fcautentic.md",
    address: "Bd. Dacia 63, Chișinău",
    attendance: 93,
    status: "Activ",
    dues: "Achitat",
    goals: 5,
    assists: 8,
    stats: { played: 18, started: 15, minutes: 1310, goals: 5, assists: 8, yellow: 3, red: 0, mvp: 3, rating: 8.5 },
    evolution: { performance: [66, 72, 75, 77, 84, 87], weight: [68, 68.2, 68.5, 68.8, 69], height: [174, 175, 175, 176], seasonProgress: 80, coachGoals: ["Pase verticale", "Schimbare ritm", "Recuperare după pierdere"], completedGoals: ["Cornere precise", "Control orientat"] },
    training: { motivated: 1, unmotivated: 1, history: ["Luni: prezent", "Marți: absent nemotivat", "Joi: prezent", "Vineri: prezent"] },
    evaluation: { technique: 89, speed: 82, strength: 72, stamina: 87, tactics: 90, discipline: 80, teamwork: 91, comment: "Coordonează bine jocul și creează avantaj între linii." },
    achievements: ["Cel mai bun pasator", "MVP etapa 5", "Cupa Municipală 2026"],
    calendar: ["14 iunie: recuperare", "15 iunie: antrenament tactic", "20 iunie: amical"],
    documents: ["Contract semnat", "Fișă medicală actualizată", "Acord parental valid"],
    media: ["Foto: assist decisiv", "Video: pasă verticală", "Moment: MVP"],
    notifications: ["Antrenor: focus pe recuperare defensivă", "Convocat pentru meciul amical"]
  },
  {
    id: "FCA-2026-004",
    name: "Mihai Ceban",
    number: 4,
    position: "Fundaș",
    category: "U19",
    birthdate: "2009-01-11",
    height: 183,
    weight: 76,
    foot: "Drept",
    nationality: "Moldova",
    city: "Durlești",
    phone: "+373 60 332 018",
    email: "mihai.ceban@fcautentic.md",
    address: "Str. Livezilor 8, Durlești",
    attendance: 84,
    status: "Recuperare",
    dues: "Restant",
    goals: 1,
    assists: 3,
    stats: { played: 14, started: 13, minutes: 1160, goals: 1, assists: 3, yellow: 4, red: 1, mvp: 1, rating: 7.8 },
    evolution: { performance: [62, 65, 69, 72, 70, 76], weight: [74, 74.5, 75, 75.5, 76], height: [181, 182, 183, 183], seasonProgress: 64, coachGoals: ["Revenire progresivă", "Dueluri aeriene", "Fără faulturi inutile"], completedGoals: ["Marcaj om la om"] },
    training: { motivated: 4, unmotivated: 0, history: ["Luni: recuperare", "Marți: prezent parțial", "Joi: absent motivat", "Vineri: prezent"] },
    evaluation: { technique: 76, speed: 74, strength: 86, stamina: 72, tactics: 84, discipline: 74, teamwork: 83, comment: "Fundaș puternic, în revenire după accidentare. Necesită dozaj atent." },
    achievements: ["Cel mai bun fundaș - februarie", "Gol decisiv din corner"],
    calendar: ["12 iunie: kinetoterapie", "15 iunie: antrenament parțial", "18 iunie: reevaluare medicală"],
    documents: ["Contract semnat", "Fișă medicală în monitorizare", "Acord parental valid"],
    media: ["Foto: duel aerian", "Video: tackling reușit"],
    notifications: ["Staff medical: fără contact intens", "Antrenor: revenire treptată"]
  },
  {
    id: "FCA-2026-011",
    name: "Vlad Rusu",
    number: 11,
    position: "Fundaș",
    category: "U19",
    birthdate: "2008-11-05",
    height: 179,
    weight: 72,
    foot: "Drept",
    nationality: "Moldova",
    city: "Chișinău",
    phone: "+373 68 552 904",
    email: "vlad.rusu@fcautentic.md",
    address: "Str. Alba Iulia 102, Chișinău",
    attendance: 91,
    status: "Activ",
    dues: "Achitat",
    goals: 2,
    assists: 4,
    stats: { played: 16, started: 14, minutes: 1225, goals: 2, assists: 4, yellow: 2, red: 0, mvp: 1, rating: 8.1 },
    evolution: { performance: [60, 66, 71, 74, 79, 81], weight: [70, 70.5, 71, 71.5, 72], height: [177, 178, 179, 179], seasonProgress: 74, coachGoals: ["Centrare din alergare", "Dublaj defensiv"], completedGoals: ["Blocaj la marginea careului"] },
    training: { motivated: 2, unmotivated: 0, history: ["Luni: prezent", "Marți: prezent", "Joi: prezent", "Vineri: absent motivat"] },
    evaluation: { technique: 80, speed: 84, strength: 78, stamina: 85, tactics: 82, discipline: 88, teamwork: 86, comment: "Foarte disciplinat tactic, util pe ambele faze." },
    achievements: ["Assist decisiv etapa 4", "Trofeu fair-play"],
    calendar: ["13 iunie: meci", "17 iunie: sală forță", "20 iunie: amical"],
    documents: ["Contract semnat", "Fișă medicală actualizată", "Acord parental valid"],
    media: ["Foto: sprint lateral", "Video: centrare assist"],
    notifications: ["Convocat în lotul de meci", "Antrenor: exersează centrările"]
  },
  {
    id: "FCA-2026-014",
    name: "Sergiu Ursu",
    number: 14,
    position: "Mijlocaș",
    category: "U16",
    birthdate: "2010-07-18",
    height: 171,
    weight: 63,
    foot: "Drept",
    nationality: "Moldova",
    city: "Chișinău",
    phone: "+373 61 900 304",
    email: "sergiu.ursu@fcautentic.md",
    address: "Str. Grenoble 22, Chișinău",
    attendance: 88,
    status: "Activ",
    dues: "Parțial",
    goals: 4,
    assists: 6,
    stats: { played: 15, started: 10, minutes: 930, goals: 4, assists: 6, yellow: 1, red: 0, mvp: 2, rating: 8.0 },
    evolution: { performance: [58, 63, 67, 73, 76, 80], weight: [61, 61.5, 62, 62.5, 63], height: [168, 169, 170, 171], seasonProgress: 71, coachGoals: ["Mai mult curaj la șut", "Pase sub presiune"], completedGoals: ["Preluare orientată"] },
    training: { motivated: 2, unmotivated: 1, history: ["Luni: prezent", "Marți: prezent", "Joi: absent motivat", "Vineri: absent nemotivat"] },
    evaluation: { technique: 84, speed: 83, strength: 66, stamina: 80, tactics: 77, discipline: 78, teamwork: 85, comment: "Talent bun tehnic, are nevoie de constanță la prezență." },
    achievements: ["Jucătorul lunii U16", "Cel mai bun assist"],
    calendar: ["14 iunie: U16 antrenament", "16 iunie: test tehnic", "21 iunie: turneu U16"],
    documents: ["Contract academie", "Fișă medicală actualizată", "Acord parental valid"],
    media: ["Foto: dribling", "Video: assist filtrant"],
    notifications: ["Achită diferența cotizației", "Convocat la turneu U16"]
  },
  {
    id: "FCA-2026-017",
    name: "Nicu Rotaru",
    number: 17,
    position: "Atacant",
    category: "U19",
    birthdate: "2009-04-30",
    height: 177,
    weight: 70,
    foot: "Stâng",
    nationality: "Moldova",
    city: "Băcioi",
    phone: "+373 60 771 225",
    email: "nicu.rotaru@fcautentic.md",
    address: "Str. Păcii 15, Băcioi",
    attendance: 73,
    status: "Monitorizat",
    dues: "Restant",
    goals: 7,
    assists: 2,
    stats: { played: 13, started: 8, minutes: 760, goals: 7, assists: 2, yellow: 2, red: 0, mvp: 1, rating: 7.7 },
    evolution: { performance: [55, 61, 66, 68, 72, 77], weight: [68, 68.5, 69, 69.5, 70], height: [175, 176, 177, 177], seasonProgress: 59, coachGoals: ["Prezență peste 85%", "Finalizare simplă", "Decizii rapide"], completedGoals: ["Demarcări în spatele apărării"] },
    training: { motivated: 3, unmotivated: 4, history: ["Luni: absent nemotivat", "Marți: prezent", "Joi: absent motivat", "Vineri: prezent"] },
    evaluation: { technique: 79, speed: 88, strength: 71, stamina: 74, tactics: 72, discipline: 66, teamwork: 76, comment: "Viteză excelentă, dar are nevoie de disciplină și prezență constantă." },
    achievements: ["Golul etapei", "Cel mai rapid sprint"],
    calendar: ["13 iunie: lot lărgit", "15 iunie: antrenament individual", "18 iunie: discuție staff"],
    documents: ["Contract semnat", "Fișă medicală actualizată", "Acord parental valid"],
    media: ["Foto: sprint", "Video: gol pe contraatac"],
    notifications: ["Staff: prezența este monitorizată", "Antrenor: obiectiv 3 antrenamente consecutive"]
  },
  {
    id: "FCA-2026-021",
    name: "Alexandru Sandu",
    number: 21,
    position: "Fundaș",
    category: "U16",
    birthdate: "2010-02-09",
    height: 174,
    weight: 67,
    foot: "Drept",
    nationality: "Moldova",
    city: "Chișinău",
    phone: "+373 69 880 114",
    email: "alexandru.sandu@fcautentic.md",
    address: "Str. Studenților 9, Chișinău",
    attendance: 86,
    status: "Activ",
    dues: "Achitat",
    goals: 1,
    assists: 2,
    stats: { played: 14, started: 12, minutes: 1040, goals: 1, assists: 2, yellow: 2, red: 0, mvp: 1, rating: 7.9 },
    evolution: { performance: [57, 62, 66, 70, 74, 79], weight: [65, 65.5, 66, 66.5, 67], height: [171, 172, 173, 174], seasonProgress: 70, coachGoals: ["Poziționare pe linie", "Prima pasă", "Dueluri corp la corp"], completedGoals: ["Intercepții laterale"] },
    training: { motivated: 2, unmotivated: 0, history: ["Luni: prezent", "Marți: prezent", "Joi: absent motivat", "Vineri: prezent"] },
    evaluation: { technique: 75, speed: 80, strength: 76, stamina: 82, tactics: 79, discipline: 87, teamwork: 84, comment: "Serios și atent, cu progres constant în duelurile defensive." },
    achievements: ["Trofeu fair-play", "Intervenția etapei"],
    calendar: ["14 iunie: U16 antrenament", "17 iunie: sală", "21 iunie: turneu U16"],
    documents: ["Contract academie", "Fișă medicală actualizată", "Acord parental valid"],
    media: ["Foto: blocaj defensiv", "Video: intercepție"],
    notifications: ["Convocat la turneu U16", "Staff: verificare echipament"]
  }
];

const savedPlayerDatabase = localStorage.getItem("fcAutenticPlayers");
if (savedPlayerDatabase) {
  try {
    const savedPlayers = JSON.parse(savedPlayerDatabase);
    if (Array.isArray(savedPlayers) && savedPlayers.length) {
      players.splice(0, players.length, ...savedPlayers);
    }
  } catch {
    localStorage.removeItem("fcAutenticPlayers");
  }
}

function savePlayerDatabase() {
  localStorage.setItem("fcAutenticPlayers", JSON.stringify(players));
}

const demoAccounts = [
  {
    email: "admin@fcautentic.md",
    password: "Admin123!",
    role: "admin",
    permissions: [
      "Vizualizare toți jucătorii",
      "Editare toți jucătorii",
      "Ștergere jucători",
      "Creare jucători noi",
      "Gestionare antrenori",
      "Gestionare statistici",
      "Gestionare prezențe",
      "Gestionare documente",
      "Acces complet la toate paginile"
    ]
  }
];

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

players.forEach((player) => {
  if (!player.slug) player.slug = slugify(player.name);
});

function ensureDemoPlayer(seed) {
  if (players.some((player) => player.id === seed.id || player.slug === seed.slug)) return;
  players.unshift(seed);
  savePlayerDatabase();
}

ensureDemoPlayer({
  id: "FCA-DEMO-007",
  slug: "andrei-popescu",
  name: "Andrei Popescu",
  number: 7,
  position: "Atacant",
  category: "U16",
  birthdate: "2010-02-18",
  height: 173,
  weight: 65,
  foot: "Drept",
  nationality: "Moldova",
  city: "Chișinău",
  phone: "+373 60 700 007",
  email: "andrei.popescu@fcautentic.md",
  address: "Str. Test 7, Chișinău",
  attendance: 94,
  status: "Activ",
  dues: "Achitat",
  goals: 11,
  assists: 6,
  stats: { played: 16, started: 14, minutes: 1180, goals: 11, assists: 6, yellow: 1, red: 0, mvp: 3, rating: 8.6 },
  evolution: { performance: [62, 68, 72, 79, 83, 87], weight: [63, 63.5, 64, 64.5, 65], height: [170, 171, 172, 173], seasonProgress: 82, coachGoals: ["Finalizare rapidă", "Demarcări între linii"], completedGoals: ["Șut cu dreptul"] },
  training: { motivated: 1, unmotivated: 0, history: ["Luni: prezent", "Marți: prezent", "Joi: prezent", "Vineri: prezent"] },
  evaluation: { technique: 86, speed: 89, strength: 72, stamina: 84, tactics: 80, discipline: 88, teamwork: 86, comment: "Profil demo pentru testarea editării." },
  achievements: ["Jucător demo al lunii", "Cel mai bun marcator U16"],
  calendar: ["13 iunie: meci test", "15 iunie: antrenament tehnic"],
  documents: ["Contract demo", "Fișă medicală demo", "Acord parental demo"],
  media: ["Foto demo: gol", "Video demo: sprint"],
  notifications: ["Cont demo pregătit pentru verificare"],
  personalNotes: "Jucător demo creat pentru verificarea completă a sistemului."
});

ensureDemoPlayer({
  id: "FCA-DEMO-010",
  slug: "david-munteanu",
  name: "David Munteanu",
  number: 10,
  position: "Mijlocaș",
  category: "U16",
  birthdate: "2010-06-04",
  height: 171,
  weight: 64,
  foot: "Stâng",
  nationality: "Moldova",
  city: "Chișinău",
  phone: "+373 60 700 010",
  email: "david.munteanu@fcautentic.md",
  address: "Str. Test 10, Chișinău",
  attendance: 91,
  status: "Activ",
  dues: "Achitat",
  goals: 6,
  assists: 12,
  stats: { played: 17, started: 15, minutes: 1260, goals: 6, assists: 12, yellow: 2, red: 0, mvp: 4, rating: 8.8 },
  evolution: { performance: [64, 69, 75, 80, 84, 89], weight: [62, 62.5, 63, 63.5, 64], height: [168, 169, 170, 171], seasonProgress: 86, coachGoals: ["Pase decisive", "Lider în linia mediană"], completedGoals: ["Execuții cu stângul"] },
  training: { motivated: 1, unmotivated: 1, history: ["Luni: prezent", "Marți: prezent", "Joi: absent motivat", "Vineri: prezent"] },
  evaluation: { technique: 90, speed: 82, strength: 70, stamina: 86, tactics: 91, discipline: 84, teamwork: 92, comment: "Profil demo pentru testarea statisticilor." },
  achievements: ["Cel mai bun pasator demo", "Jucătorul lunii U16"],
  calendar: ["14 iunie: antrenament tactic", "20 iunie: meci amical"],
  documents: ["Contract demo", "Fișă medicală demo", "Acord parental demo"],
  media: ["Foto demo: assist", "Video demo: pasă verticală"],
  notifications: ["Cont demo pregătit pentru verificare"],
  personalNotes: "Jucător demo creat pentru verificarea completă a sistemului."
});

const matches = [
  { date: "2026-06-13", short: "13 IUN", opponent: "Rapid Junior", place: "Acasă", time: "10:30", type: "Campionat" },
  { date: "2026-06-20", short: "20 IUN", opponent: "Academia Nord", place: "Deplasare", time: "12:00", type: "Amical" },
  { date: "2026-06-27", short: "27 IUN", opponent: "Steaua Sud", place: "Acasă", time: "09:45", type: "Cupa locală" }
];

const attendance = [
  { day: "Luni", value: 92, note: "22 din 24" },
  { day: "Marți", value: 88, note: "21 din 24" },
  { day: "Joi", value: 83, note: "20 din 24" },
  { day: "Vineri", value: 96, note: "23 din 24" }
];

const state = {
  query: "",
  position: "all",
  selectedPlayerId: "FCA-2026-009",
  editingPlayerId: null
};

const currentUser = {
  role: "admin",
  playerId: null
};

const playersTable = document.querySelector("#playersTable");
const playerCards = document.querySelector("#playerCards");
const matchList = document.querySelector("#matchList");
const fixtureGrid = document.querySelector("#fixtureGrid");
const attendanceBoard = document.querySelector("#attendanceBoard");
const duesList = document.querySelector("#duesList");
const searchInput = document.querySelector("#searchInput");
const positionFilter = document.querySelector("#positionFilter");
const playerDialog = document.querySelector("#playerDialog");
const playersCount = document.querySelector("#playersCount");
const loginScreen = document.querySelector("#loginScreen");
const appShell = document.querySelector("#appShell");
const loginForm = document.querySelector("#loginForm");
const profileBtn = document.querySelector("#profileBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const themeToggle = document.querySelector("#themeToggle");
const playerProfileContent = document.querySelector("#playerProfileContent");
const playerEditorContent = document.querySelector("#playerEditorContent");
const adminDashboardContent = document.querySelector("#adminDashboardContent");
const sidebarToggle = document.querySelector("#sidebarToggle");
const toastStack = document.querySelector("#toastStack");

function selectView(viewId) {
  document.body.classList.add("is-transitioning");
  window.setTimeout(() => document.body.classList.remove("is-transitioning"), 180);
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewId);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active-view", view.id === viewId);
  });
}

function showToast(message, type = "success") {
  if (!toastStack) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastStack.appendChild(toast);
  window.setTimeout(() => toast.classList.add("show"), 20);
  window.setTimeout(() => {
    toast.classList.remove("show");
    window.setTimeout(() => toast.remove(), 220);
  }, 3200);
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function calculateAge(birthdate) {
  const today = new Date();
  const birth = new Date(`${birthdate}T12:00:00`);
  let age = today.getFullYear() - birth.getFullYear();
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  return hadBirthday ? age : age - 1;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ro-RO", { dateStyle: "long" }).format(new Date(`${date}T12:00:00`));
}

function canViewPlayer(player) {
  return canEditPlayer() || currentUser.playerId === player.id;
}

function canEditPlayer() {
  return ["admin", "coach", "staff"].includes(currentUser.role);
}

function statCard(label, value) {
  return `<article><span>${label}</span><strong>${value}</strong></article>`;
}

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function metricRows(evaluation) {
  return Object.entries({
    Tehnică: evaluation.technique,
    Viteză: evaluation.speed,
    Forță: evaluation.strength,
    Rezistență: evaluation.stamina,
    "Inteligență tactică": evaluation.tactics,
    Disciplină: evaluation.discipline,
    "Spirit de echipă": evaluation.teamwork
  })
    .map(
      ([label, value]) => `
        <article class="skill-row">
          <div><span>${label}</span><strong>${value}/100</strong></div>
          <div class="bar"><span style="width: ${value}%"></span></div>
        </article>
      `
    )
    .join("");
}

function chartPoints(values) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  return values
    .map((value, index) => {
      const x = 20 + index * (380 / Math.max(values.length - 1, 1));
      const normalized = max === min ? 0.5 : (value - min) / (max - min);
      const y = 156 - normalized * 122;
      return `${x.toFixed(0)},${y.toFixed(0)}`;
    })
    .join(" ");
}

function qrCells(playerId) {
  return Array.from({ length: 36 }, (_, index) => {
    const code = playerId.charCodeAt(index % playerId.length);
    return `<span class="${(code + index) % 3 === 0 ? "empty" : ""}"></span>`;
  }).join("");
}

function parseList(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function editList(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function renderPhoto(player, className, label = "Poză profil jucător") {
  if (player.photo) {
    return `<img class="${className} profile-photo-image" src="${player.photo}" alt="${label}" />`;
  }
  return `<div class="${className}" aria-label="${label}">${initials(player.name)}</div>`;
}

function renderPlayerProfile(player = players.find((item) => item.id === state.selectedPlayerId)) {
  if (!playerProfileContent || !player) return;

  if (!canViewPlayer(player)) {
    playerProfileContent.innerHTML = `
      <section class="panel profile-panel restricted-profile">
        <h2>Profil restricționat</h2>
        <p>Acest profil poate fi vizualizat doar de jucătorul respectiv și de staff-ul autorizat.</p>
      </section>
    `;
    return;
  }

  const performancePoints = chartPoints(player.evolution.performance);
  const assistPoints = chartPoints(player.evolution.performance.map((value, index) => value - 6 + index * 2));
  const participation = player.attendance;
  const totalAbsences = player.training.motivated + player.training.unmotivated;

  playerProfileContent.innerHTML = `
    <div class="player-profile-hero">
      ${renderPhoto(player, "player-photo-large")}
      <div class="player-hero-info">
        <p class="eyebrow">Profil individual · ${player.id}</p>
        <h2>${player.name}</h2>
        <div class="player-tags">
          <span>#${player.number}</span>
          <span>${player.position}</span>
          <span>${player.category}</span>
          <span class="status-pill ${player.status === "Activ" ? "active" : ""}">${player.status}</span>
        </div>
      </div>
      <img class="profile-hero-logo" src="assets/fc-autentic-logo.png" alt="FC Autentic" />
    </div>

    <div class="profile-layout">
      <div class="profile-main">
        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Informații generale</p><h2>Date jucător</h2></div></div>
          <div class="info-grid">
            ${statCard("Data nașterii", formatDate(player.birthdate))}
            ${statCard("Vârsta", `${calculateAge(player.birthdate)} ani`)}
            ${statCard("Înălțime", `${player.height} cm`)}
            ${statCard("Greutate", `${player.weight} kg`)}
            ${statCard("Picior dominant", player.foot)}
            ${statCard("Naționalitate", player.nationality)}
            ${statCard("Oraș", player.city)}
            ${statCard("Telefon", player.phone)}
            ${statCard("Email", player.email)}
            <article class="wide-info"><span>Adresă</span><strong>${player.address}</strong></article>
          </div>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Statistici sportive</p><h2>Sezon curent</h2></div></div>
          <div class="player-stats-grid">
            ${statCard("Meciuri jucate", player.stats.played)}
            ${statCard("Meciuri titular", player.stats.started)}
            ${statCard("Minute", player.stats.minutes)}
            ${statCard("Goluri", player.stats.goals)}
            ${statCard("Assisturi", player.stats.assists)}
            ${statCard("Galbene", player.stats.yellow)}
            ${statCard("Roșii", player.stats.red)}
            ${statCard("MVP-uri", player.stats.mvp)}
            ${statCard("Media notelor", player.stats.rating)}
          </div>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Evoluție</p><h2>Performanță și progres</h2></div></div>
          <div class="performance-grid">
            <div class="chart-card">
              <svg class="performance-chart" viewBox="0 0 420 190" role="img" aria-label="Grafic evoluție performanțe">
                <polyline class="chart-area" points="${performancePoints} 400,170 20,170" />
                <polyline class="chart-line goals" points="${performancePoints}" />
                <polyline class="chart-line assists" points="${assistPoints}" />
              </svg>
              <div class="chart-legend">
                <span><i class="legend-red"></i>Performanță</span>
                <span><i class="legend-blue"></i>Ritm progres</span>
              </div>
            </div>
            <div class="performance-side">
              <article><span>Progres sezon curent</span><strong>${player.evolution.seasonProgress}%</strong><div class="bar"><span style="width: ${player.evolution.seasonProgress}%"></span></div></article>
              <article><span>Evoluție greutate</span><strong>${player.evolution.weight.at(-1)} kg</strong><small>${player.evolution.weight.join(" → ")} kg</small></article>
              <article><span>Evoluție înălțime</span><strong>${player.evolution.height.at(-1)} cm</strong><small>${player.evolution.height.join(" → ")} cm</small></article>
            </div>
          </div>
          <div class="goals-grid">
            <article><h3>Obiective antrenor</h3><ul>${listItems(player.evolution.coachGoals)}</ul></article>
            <article><h3>Obiective realizate</h3><ul>${listItems(player.evolution.completedGoals)}</ul></article>
          </div>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Antrenamente</p><h2>Prezențe și absențe</h2></div></div>
          <div class="player-stats-grid compact-stats">
            ${statCard("Prezență", `${participation}%`)}
            ${statCard("Absențe motivate", player.training.motivated)}
            ${statCard("Absențe nemotivate", player.training.unmotivated)}
            ${statCard("Total absențe", totalAbsences)}
          </div>
          <div class="attendance-history">${player.training.history.map((item) => `<span>${item}</span>`).join("")}</div>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Evaluarea antrenorului</p><h2>Profil de performanță</h2></div></div>
          <div class="skills-grid">${metricRows(player.evaluation)}</div>
          <blockquote>${player.evaluation.comment}</blockquote>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Realizări</p><h2>Trofee și distincții</h2></div></div>
          <div class="documents-grid">${player.achievements.map((item) => `<article><strong>${item}</strong><span>Înregistrat în profil</span><button type="button">Detalii</button></article>`).join("")}</div>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Calendar personal</p><h2>Program individual</h2></div></div>
          <div class="timeline-list">${player.calendar.map((item) => `<article>${item}</article>`).join("")}</div>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Documente</p><h2>Dosar jucător</h2></div></div>
          <div class="documents-grid">${player.documents.map((item) => `<article><strong>${item}</strong><span>Acces staff și jucător</span><button type="button">Vezi</button></article>`).join("")}</div>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Galerie media</p><h2>Fotografii și videoclipuri</h2></div></div>
          <div class="media-grid">${player.media.map((item) => `<article><div>${initials(player.name)}</div><strong>${item}</strong></article>`).join("")}</div>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Notificări</p><h2>Mesaje și convocări</h2></div></div>
          <div class="notification-list">${player.notifications.map((item) => `<article>${item}</article>`).join("")}</div>
        </section>

        <section class="panel profile-panel">
          <div class="panel-head"><div><p class="eyebrow">Note personale</p><h2>Observații staff</h2></div></div>
          <blockquote>${player.personalNotes || "Nu există note personale salvate pentru acest jucător."}</blockquote>
        </section>
      </div>

      <aside class="fifa-card" aria-label="Card digital FC Autentic">
        <div class="fifa-card-top">
          <strong>${Math.round(player.stats.rating * 10)}</strong>
          <span>${player.position.slice(0, 3).toUpperCase()}</span>
          <img src="assets/fc-autentic-logo.png" alt="FC Autentic" />
        </div>
        ${renderPhoto(player, "fifa-player-cutout", "Poză card digital")}
        <h3>${player.name}</h3>
        <div class="fifa-stats">
          <span><strong>${player.evaluation.speed}</strong>PAC</span>
          <span><strong>${player.evaluation.technique}</strong>TEC</span>
          <span><strong>${player.evaluation.tactics}</strong>TAC</span>
          <span><strong>${player.evaluation.stamina}</strong>STA</span>
          <span><strong>${player.evaluation.discipline}</strong>DIS</span>
          <span><strong>${player.evaluation.teamwork}</strong>ECH</span>
        </div>
        <div class="qr-code" aria-label="QR Code unic pentru ${player.id}">${qrCells(player.id)}</div>
        <p class="player-id">ID unic: ${player.id}</p>
      </aside>
    </div>
  `;
}

function openPlayerProfile(player, updateUrl = true) {
  if (!player) return;
  state.selectedPlayerId = player.id;
  renderPlayerProfile(player);
  selectView("playerProfile");
  if (updateUrl) {
    try {
      history.pushState({ playerId: player.id }, "", `/players/${player.slug}`);
    } catch {
      window.location.hash = `players/${player.slug}`;
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openPlayerEditor(player) {
  if (!player || !canEditPlayer()) return;
  state.editingPlayerId = player.id;
  renderPlayerEditor(player);
  selectView("playerEditor");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handlePlayerRoute() {
  const pathSlug = window.location.pathname.match(/\/players\/([^/]+)/)?.[1];
  const hashSlug = window.location.hash.match(/players\/([^/]+)/)?.[1];
  const slug = pathSlug || hashSlug;
  if (!slug) return false;
  const player = players.find((item) => item.slug === slug);
  if (!player) return false;
  openPlayerProfile(player, false);
  return true;
}

function updatePlayerStats(playerId, updates) {
  const player = players.find((item) => item.id === playerId);
  if (!player) return;
  Object.assign(player.stats, updates.stats || {});
  Object.assign(player.training, updates.training || {});
  Object.assign(player.evaluation, updates.evaluation || {});
  if (typeof updates.attendance === "number") player.attendance = updates.attendance;
  if (state.selectedPlayerId === playerId) renderPlayerProfile(player);
  savePlayerDatabase();
  renderPlayers();
  renderDues();
}

function renderPlayerEditor(player = players.find((item) => item.id === state.editingPlayerId)) {
  if (!playerEditorContent || !player) return;

  if (!canEditPlayer()) {
    playerEditorContent.innerHTML = `
      <section class="panel profile-panel restricted-profile">
        <h2>Editare restricționată</h2>
        <p>Doar administratorii și antrenorii autorizați pot modifica profilurile jucătorilor.</p>
      </section>
    `;
    return;
  }

  playerEditorContent.innerHTML = `
    <section class="editor-hero">
      ${renderPhoto(player, "player-photo-large")}
      <div>
        <p class="eyebrow">Editare profil · ${player.id}</p>
        <h2>${player.name}</h2>
        <span>Modificările se aplică doar acestui jucător.</span>
      </div>
    </section>

    <form class="panel editor-form" id="editPlayerForm">
      <input type="hidden" name="id" value="${player.id}" />

      <section class="editor-section">
        <div class="panel-head"><div><p class="eyebrow">Informații generale</p><h2>Date de bază</h2></div></div>
        <div class="editor-grid">
          <label>Poză de profil<input type="file" name="photo" accept="image/*" /></label>
          <label>Nume și prenume<input name="name" required value="${player.name}" /></label>
          <label>Număr tricou<input name="number" type="number" min="1" max="99" value="${player.number}" /></label>
          <label>Poziție<select name="position"><option ${player.position === "Portar" ? "selected" : ""}>Portar</option><option ${player.position === "Fundaș" ? "selected" : ""}>Fundaș</option><option ${player.position === "Mijlocaș" ? "selected" : ""}>Mijlocaș</option><option ${player.position === "Atacant" ? "selected" : ""}>Atacant</option></select></label>
          <label>Categoria<select name="category"><option ${player.category === "U13" ? "selected" : ""}>U13</option><option ${player.category === "U16" ? "selected" : ""}>U16</option><option ${player.category === "U19" ? "selected" : ""}>U19</option></select></label>
          <label>Data nașterii<input name="birthdate" type="date" value="${player.birthdate}" /></label>
          <label>Înălțime<input name="height" type="number" min="90" max="230" value="${player.height}" /></label>
          <label>Greutate<input name="weight" type="number" min="25" max="140" value="${player.weight}" /></label>
          <label>Picior dominant<select name="foot"><option ${player.foot === "Drept" ? "selected" : ""}>Drept</option><option ${player.foot === "Stâng" ? "selected" : ""}>Stâng</option><option ${player.foot === "Ambele" ? "selected" : ""}>Ambele</option></select></label>
          <label>Telefon<input name="phone" value="${player.phone}" /></label>
          <label>Email<input name="email" type="email" value="${player.email}" /></label>
          <label>Oraș<input name="city" value="${player.city}" /></label>
        </div>
      </section>

      <section class="editor-section">
        <div class="panel-head"><div><p class="eyebrow">Statistici</p><h2>Sportive și prezențe</h2></div></div>
        <div class="editor-grid">
          <label>Meciuri jucate<input name="played" type="number" min="0" value="${player.stats.played}" /></label>
          <label>Meciuri titular<input name="started" type="number" min="0" value="${player.stats.started}" /></label>
          <label>Minute jucate<input name="minutes" type="number" min="0" value="${player.stats.minutes}" /></label>
          <label>Goluri<input name="goals" type="number" min="0" value="${player.stats.goals}" /></label>
          <label>Assisturi<input name="assists" type="number" min="0" value="${player.stats.assists}" /></label>
          <label>Galbene<input name="yellow" type="number" min="0" value="${player.stats.yellow}" /></label>
          <label>Roșii<input name="red" type="number" min="0" value="${player.stats.red}" /></label>
          <label>MVP-uri<input name="mvp" type="number" min="0" value="${player.stats.mvp}" /></label>
          <label>Media notelor<input name="rating" type="number" min="1" max="10" step="0.1" value="${player.stats.rating}" /></label>
          <label>Prezență %<input name="attendance" type="number" min="0" max="100" value="${player.attendance}" /></label>
          <label>Absențe motivate<input name="motivated" type="number" min="0" value="${player.training.motivated}" /></label>
          <label>Absențe nemotivate<input name="unmotivated" type="number" min="0" value="${player.training.unmotivated}" /></label>
        </div>
      </section>

      <section class="editor-section">
        <div class="panel-head"><div><p class="eyebrow">Evaluarea antrenorului</p><h2>Scoruri și note</h2></div></div>
        <div class="editor-grid">
          <label>Tehnică<input name="technique" type="number" min="0" max="100" value="${player.evaluation.technique}" /></label>
          <label>Viteză<input name="speed" type="number" min="0" max="100" value="${player.evaluation.speed}" /></label>
          <label>Forță<input name="strength" type="number" min="0" max="100" value="${player.evaluation.strength}" /></label>
          <label>Rezistență<input name="stamina" type="number" min="0" max="100" value="${player.evaluation.stamina}" /></label>
          <label>Inteligență tactică<input name="tactics" type="number" min="0" max="100" value="${player.evaluation.tactics}" /></label>
          <label>Disciplină<input name="discipline" type="number" min="0" max="100" value="${player.evaluation.discipline}" /></label>
          <label>Spirit de echipă<input name="teamwork" type="number" min="0" max="100" value="${player.evaluation.teamwork}" /></label>
          <label class="editor-wide">Comentarii personalizate<textarea name="comment">${player.evaluation.comment}</textarea></label>
        </div>
      </section>

      <section class="editor-section">
        <div class="panel-head"><div><p class="eyebrow">Documente și note</p><h2>Dosar administrativ</h2></div></div>
        <div class="editor-grid">
          <label class="editor-wide">Documente<textarea name="documents">${editList(player.documents)}</textarea></label>
          <label class="editor-wide">Istoric prezențe<textarea name="history">${editList(player.training.history)}</textarea></label>
          <label class="editor-wide">Note personale<textarea name="personalNotes">${player.personalNotes || ""}</textarea></label>
        </div>
      </section>

      <div class="editor-actions">
        <button class="primary-btn" type="submit">Salvează</button>
        <button class="secondary-btn" type="button" id="cancelEditBtn">Anulează</button>
        <button class="danger-btn" type="button" id="deletePlayerBtn">Șterge jucător</button>
      </div>
    </form>
  `;
}

function renderAdminDashboard() {
  if (!adminDashboardContent) return;
  const totalGoals = players.reduce((sum, player) => sum + player.stats.goals, 0);
  const avgAttendance = Math.round(players.reduce((sum, player) => sum + player.attendance, 0) / players.length);
  const recentChanges = JSON.parse(localStorage.getItem("fcRecentChanges") || "[]").slice(-5).reverse();

  adminDashboardContent.innerHTML = `
    <section class="admin-metrics">
      <article><span>Total jucători</span><strong>${players.length}</strong></article>
      <article><span>Total antrenori</span><strong>4</strong></article>
      <article><span>Goluri club</span><strong>${totalGoals}</strong></article>
      <article><span>Prezență medie</span><strong>${avgAttendance}%</strong></article>
    </section>

    <div class="admin-grid">
      <section class="admin-card">
        <h3>Ultimele modificări</h3>
        <div class="timeline-list">
          ${
            recentChanges.length
              ? recentChanges.map((item) => `<article>${item}</article>`).join("")
              : "<article>Sistem demo inițializat pentru verificare.</article>"
          }
        </div>
      </section>

      <section class="admin-card">
        <h3>Statistici club</h3>
        <div class="documents-grid">
          <article><strong>${players.filter((player) => player.status === "Activ").length}</strong><span>Jucători activi</span><button type="button">Detalii</button></article>
          <article><strong>${players.filter((player) => player.category === "U16").length}</strong><span>Categoria U16</span><button type="button">Detalii</button></article>
          <article><strong>${players.filter((player) => player.dues !== "Achitat").length}</strong><span>Cotizații urmărite</span><button type="button">Detalii</button></article>
        </div>
      </section>
    </div>

    <section class="admin-card">
      <h3>Lista jucătorilor</h3>
      <div class="admin-player-list">
        ${players
          .map(
            (player) => `
              <article>
                <div>
                  <strong>${player.name}</strong>
                  <span>#${player.number} · ${player.position} · ${player.category} · /players/${player.slug}</span>
                </div>
                <div class="admin-player-actions">
                  <button class="secondary-btn" type="button" data-profile-link data-player-id="${player.id}">Vezi profil</button>
                  <button class="edit-profile-link" type="button" data-edit-profile data-player-id="${player.id}">Editează profil</button>
                  <button class="danger-btn" type="button" data-admin-delete data-player-id="${player.id}">Șterge profil</button>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function addRecentChange(message) {
  const changes = JSON.parse(localStorage.getItem("fcRecentChanges") || "[]");
  changes.push(`${new Date().toLocaleString("ro-RO")}: ${message}`);
  localStorage.setItem("fcRecentChanges", JSON.stringify(changes.slice(-12)));
}

function badgeClass(value) {
  if (["Activ", "Achitat"].includes(value)) return "ok";
  if (["Recuperare", "Parțial", "Monitorizat"].includes(value)) return "warn";
  return "danger";
}

function filteredPlayers() {
  const query = state.query.trim().toLowerCase();
  return players.filter((player) => {
    const matchesQuery = [player.name, player.position, player.status, player.dues]
      .join(" ")
      .toLowerCase()
      .includes(query);
    const matchesPosition = state.position === "all" || player.position === state.position;
    return matchesQuery && matchesPosition;
  });
}

function renderPlayers() {
  const visiblePlayers = filteredPlayers();
  playersCount.textContent = players.length;

  playersTable.innerHTML = visiblePlayers
    .map(
      (player) => `
        <tr>
          <td>
            <div class="player-name">
              <span class="avatar">${initials(player.name)}</span>
              ${player.name}
            </div>
          </td>
          <td>${player.position}</td>
          <td>${calculateAge(player.birthdate)}</td>
          <td>${player.attendance}%</td>
          <td><span class="badge ${badgeClass(player.status)}">${player.status}</span></td>
        </tr>
      `
    )
    .join("");

  playerCards.innerHTML = visiblePlayers
    .map(
      (player) => `
        <article class="player-card">
          <header>
            <span class="avatar">${initials(player.name)}</span>
            <div>
              <strong>${player.name}</strong>
              <p class="eyebrow">${player.position}</p>
            </div>
          </header>
          <dl>
            <div>
              <dt>Vârstă</dt>
              <dd>${calculateAge(player.birthdate)}</dd>
            </div>
            <div>
              <dt>Prezență</dt>
              <dd>${player.attendance}%</dd>
            </div>
            <div>
              <dt>Goluri</dt>
              <dd>${player.goals}</dd>
            </div>
            <div>
              <dt>Assist-uri</dt>
              <dd>${player.assists}</dd>
            </div>
          </dl>
          <button class="secondary-btn player-profile-link" type="button" data-profile-link data-player-id="${player.id}">Vezi profil</button>
          ${
            canEditPlayer()
              ? `<button class="edit-profile-link" type="button" data-edit-profile data-player-id="${player.id}">Editează profilul</button>`
              : ""
          }
        </article>
      `
    )
    .join("");
}

function renderMatches() {
  matchList.innerHTML = matches
    .map(
      (match) => `
        <article class="match-item">
          <div class="match-date">${match.short.replace(" ", "<br>")}</div>
          <div>
            <strong>FC Autentic vs ${match.opponent}</strong>
            <span>${match.type} · ${match.place} · ${match.time}</span>
          </div>
        </article>
      `
    )
    .join("");

  fixtureGrid.innerHTML = matches
    .map(
      (match) => `
        <article class="fixture-card">
          <time datetime="${match.date}">${new Intl.DateTimeFormat("ro-RO", {
            dateStyle: "full"
          }).format(new Date(`${match.date}T12:00:00`))}</time>
          <strong>FC Autentic vs ${match.opponent}</strong>
          <span>${match.type} · ${match.place} · ora ${match.time}</span>
        </article>
      `
    )
    .join("");
}

function renderAttendance() {
  attendanceBoard.innerHTML = attendance
    .map(
      (item) => `
        <article class="attendance-day">
          <strong>${item.day}</strong>
          <p>${item.note}</p>
          <div class="bar" aria-label="${item.value}% prezență">
            <span style="width: ${item.value}%"></span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderDues() {
  duesList.innerHTML = players
    .map(
      (player) => `
        <article class="dues-row">
          <div>
            <strong>${player.name}</strong>
            <span>${player.position}</span>
          </div>
          <span class="badge ${badgeClass(player.dues)}">${player.dues}</span>
        </article>
      `
    )
    .join("");
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.view === "playerProfile") renderPlayerProfile();
    if (button.dataset.view === "adminDashboard") renderAdminDashboard();
    selectView(button.dataset.view);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.matches("[data-profile-link]")) return;
  openPlayerProfile(players.find((item) => item.id === event.target.dataset.playerId));
});

document.addEventListener("click", (event) => {
  if (!event.target.matches("[data-edit-profile]")) return;
  openPlayerEditor(players.find((item) => item.id === event.target.dataset.playerId));
});

document.addEventListener("click", (event) => {
  if (event.target.id === "cancelEditBtn") {
    renderPlayerProfile(players.find((item) => item.id === state.selectedPlayerId));
    selectView("playerProfile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (event.target.id === "deletePlayerBtn") {
    const playerIndex = players.findIndex((item) => item.id === state.editingPlayerId);
    if (playerIndex === -1 || !canEditPlayer()) return;
    if (!window.confirm(`Ștergi definitiv profilul lui ${players[playerIndex].name}?`)) return;
    const deletedName = players[playerIndex].name;
    players.splice(playerIndex, 1);
    state.selectedPlayerId = players[0]?.id || null;
    state.editingPlayerId = null;
    addRecentChange(`Profil șters: ${deletedName}`);
    savePlayerDatabase();
    renderPlayers();
    renderDues();
    renderAdminDashboard();
    renderPlayerProfile(players[0]);
    selectView(players.length ? "playerProfile" : "players");
    showToast(`Profil șters: ${deletedName}.`, "warning");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.matches("[data-admin-delete]")) return;
  if (!canEditPlayer()) return;
  const playerIndex = players.findIndex((item) => item.id === event.target.dataset.playerId);
  if (playerIndex === -1) return;
  if (!window.confirm(`Ștergi definitiv profilul lui ${players[playerIndex].name}?`)) return;
  const deletedName = players[playerIndex].name;
  players.splice(playerIndex, 1);
  state.selectedPlayerId = players[0]?.id || null;
  addRecentChange(`Profil șters din Admin: ${deletedName}`);
  savePlayerDatabase();
  renderPlayers();
  renderDues();
  renderAdminDashboard();
  showToast(`Profil șters: ${deletedName}.`, "warning");
});

document.addEventListener("submit", async (event) => {
  if (event.target.id !== "editPlayerForm") return;
  event.preventDefault();
  if (!canEditPlayer()) return;

  const form = event.target;
  const data = new FormData(form);
  const player = players.find((item) => item.id === data.get("id"));
  if (!player) return;

  const photoFile = data.get("photo");
  if (photoFile && photoFile.size) {
    player.photo = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(photoFile);
    });
  }

  player.name = data.get("name").trim();
  player.number = Number(data.get("number"));
  player.position = data.get("position");
  player.category = data.get("category");
  player.birthdate = data.get("birthdate");
  player.height = Number(data.get("height"));
  player.weight = Number(data.get("weight"));
  player.foot = data.get("foot");
  player.phone = data.get("phone").trim();
  player.email = data.get("email").trim();
  player.city = data.get("city").trim();
  player.personalNotes = data.get("personalNotes").trim();
  player.documents = parseList(data.get("documents"));
  player.training.history = parseList(data.get("history"));

  player.attendance = Number(data.get("attendance"));
  Object.assign(player.stats, {
    played: Number(data.get("played")),
    started: Number(data.get("started")),
    minutes: Number(data.get("minutes")),
    goals: Number(data.get("goals")),
    assists: Number(data.get("assists")),
    yellow: Number(data.get("yellow")),
    red: Number(data.get("red")),
    mvp: Number(data.get("mvp")),
    rating: Number(data.get("rating"))
  });
  player.goals = player.stats.goals;
  player.assists = player.stats.assists;

  Object.assign(player.training, {
    motivated: Number(data.get("motivated")),
    unmotivated: Number(data.get("unmotivated"))
  });

  Object.assign(player.evaluation, {
    technique: Number(data.get("technique")),
    speed: Number(data.get("speed")),
    strength: Number(data.get("strength")),
    stamina: Number(data.get("stamina")),
    tactics: Number(data.get("tactics")),
    discipline: Number(data.get("discipline")),
    teamwork: Number(data.get("teamwork")),
    comment: data.get("comment").trim()
  });

  state.selectedPlayerId = player.id;
  state.editingPlayerId = null;
  player.slug = slugify(player.name);
  addRecentChange(`Profil actualizat: ${player.name}`);
  savePlayerDatabase();
  renderPlayers();
  renderDues();
  renderAdminDashboard();
  renderPlayerProfile(player);
  selectView("playerProfile");
  showToast(`Profil actualizat: ${player.name}.`);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderPlayers();
});

positionFilter.addEventListener("change", (event) => {
  state.position = event.target.value;
  renderPlayers();
});

document.querySelector("#sortMatchesBtn").addEventListener("click", () => {
  matches.sort((a, b) => a.date.localeCompare(b.date));
  renderMatches();
});

document.querySelector("#addPlayerBtn").addEventListener("click", () => {
  playerDialog.showModal();
});

document.querySelector("#savePlayerBtn").addEventListener("click", (event) => {
  const name = document.querySelector("#newName").value.trim();
  const position = document.querySelector("#newPosition").value;
  if (!name) return;
  event.preventDefault();
  const newId = `FCA-2026-${String(players.length + 22).padStart(3, "0")}`;
  players.push({
    id: newId,
    slug: slugify(name),
    name,
    number: players.length + 22,
    position,
    category: "U16",
    birthdate: "2010-01-01",
    height: 170,
    weight: 62,
    foot: "Drept",
    nationality: "Moldova",
    city: "Chișinău",
    phone: "Necompletat",
    email: `${name.toLowerCase().replaceAll(" ", ".")}@fcautentic.md`,
    address: "Necompletat",
    attendance: 100,
    status: "Activ",
    goals: 0,
    assists: 0,
    dues: "Achitat",
    stats: { played: 0, started: 0, minutes: 0, goals: 0, assists: 0, yellow: 0, red: 0, mvp: 0, rating: 7.0 },
    evolution: { performance: [50, 52, 54, 56, 58, 60], weight: [62], height: [170], seasonProgress: 10, coachGoals: ["Integrare în lot", "Prezență constantă"], completedGoals: [] },
    training: { motivated: 0, unmotivated: 0, history: ["Profil creat: fără istoric complet"] },
    evaluation: { technique: 60, speed: 60, strength: 60, stamina: 60, tactics: 60, discipline: 70, teamwork: 70, comment: "Profil nou creat. Evaluarea va fi completată de staff." },
    achievements: ["Profil creat în sistem"],
    calendar: ["Următorul antrenament: de confirmat"],
    documents: ["Contract: de încărcat", "Fișă medicală: de încărcat", "Acord parental: de încărcat"],
    media: ["Galerie goală"],
    notifications: ["Bun venit în platforma FC Autentic"]
  });
  document.querySelector("#newName").value = "";
  playerDialog.close();
  savePlayerDatabase();
  addRecentChange(`Jucător creat: ${name}`);
  renderPlayers();
  renderDues();
  renderAdminDashboard();
  showToast(`Jucător creat: ${name}.`);
});

document.querySelector("#noteForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const note = `${data.get("subject")}: ${data.get("details")}`;
  localStorage.setItem("staffNote", note);
  document.querySelector("#savedNote").textContent = "Nota a fost salvată local.";
  showToast("Nota pentru staff a fost salvată.");
  event.currentTarget.reset();
});

const savedStaffNote = localStorage.getItem("staffNote");
if (savedStaffNote) {
  document.querySelector("#savedNote").textContent = `Ultima notă: ${savedStaffNote}`;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  const account = demoAccounts.find(
    (item) => item.email === data.get("email") && item.password === data.get("password")
  );
  if (!account) {
    showToast("Pentru test folosește admin@fcautentic.md și parola Admin123!", "warning");
    return;
  }
  currentUser.role = account.role;
  currentUser.email = account.email;
  currentUser.permissions = account.permissions;
  loginScreen.classList.add("login-screen-exit");
  window.setTimeout(() => {
    loginScreen.hidden = true;
    appShell.hidden = false;
    loginScreen.classList.remove("login-screen-exit");
    renderPlayers();
    renderAdminDashboard();
    showToast("Autentificat ca Admin FC Autentic.");
  }, 260);
});

profileBtn.addEventListener("click", () => {
  openPlayerProfile(players.find((item) => item.id === state.selectedPlayerId), false);
});

logoutBtn.addEventListener("click", () => {
  appShell.hidden = true;
  loginScreen.hidden = false;
  loginForm.reset();
  showToast("Ai ieșit din cont.");
});

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  localStorage.setItem("fcTheme", isDark ? "dark" : "light");
  showToast(isDark ? "Dark mode activat." : "Light mode activat.");
});

sidebarToggle.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-collapsed");
  sidebarToggle.textContent = document.body.classList.contains("sidebar-collapsed") ? "›" : "‹";
});

if (localStorage.getItem("fcTheme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "Light mode";
  themeToggle.setAttribute("aria-pressed", "true");
}

renderPlayers();
renderMatches();
renderAttendance();
renderDues();
renderPlayerProfile();
renderAdminDashboard();
handlePlayerRoute();

window.addEventListener("popstate", handlePlayerRoute);
