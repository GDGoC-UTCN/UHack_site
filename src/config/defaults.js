// ══════════════════════════════════════════════════════
// "U" HACK — Default Hackathon Config
// All editable data lives here. Overrides are stored in
// localStorage under the key 'uhack-config'.
// ══════════════════════════════════════════════════════

export const DEFAULT_CONFIG = {
  // ── General ─────────────────────────────────────────
  general: {
    adminPassword: 'uhack2026',        // change after first login
    eventName:     '"U" HACK!',
    edition:       '2026',
    countdownTarget: '2026-04-24T17:30:00',
    locationRO:    '📍 Sediu MSG · Strada Croitorilor, nr. 12-14, Cluj-Napoca',
    locationEN:    '📍 MSG HQ · Strada Croitorilor, nr. 12-14, Cluj-Napoca',
    emailContact:  'gdgoc.utcn@gmail.com',
    instagramUrl:  'https://www.instagram.com/gdgoc.utcn/',
    linkedinUrl:   'https://www.linkedin.com/company/gdgoc-utcn',
    facebookUrl:   'https://www.facebook.com/gdgoc.utcn',
    registrationOpen: true,
    registrationFormUrl: 'https://forms.gle/placeholder',
  },

  // ── Schedule ─────────────────────────────────────────
  schedule: {
    vineri: [
      { id: 'v1', time: '16:00', type: 'logistics', titleRO: 'Check-in & Înregistrare Echipe', titleEN: 'Team Check-in & Registration', descRO: 'Înregistrarea echipelor la sediul MSG, Strada Croitorilor nr. 12-14, Cluj-Napoca.', descEN: 'Team registration at MSG HQ, Strada Croitorilor no. 12-14, Cluj-Napoca.', link: '' },
      { id: 'v2', time: '17:30', type: 'ceremony', titleRO: 'Opening Ceremony & Anunțarea Temelor', titleEN: 'Opening Ceremony & Theme Announcement', descRO: 'Ceremonia de deschidere oficială și anunțarea celor 3 teme ale hackathonului.', descEN: 'Official opening ceremony and announcement of the 3 hackathon themes.', link: 'https://meet.google.com/bjd-zpbk-igf' },
      { id: 'v3', time: '18:00', type: 'workshop', titleRO: 'Workshop 1 — Sports Analytics by "U" Cluj', titleEN: 'Workshop 1 — Sports Analytics by "U" Cluj', descRO: 'Susținut de Gabriel Giurgiu, Director Sportiv FC Universitatea Cluj.', descEN: 'Hosted by Gabriel Giurgiu, Sports Director of FC Universitatea Cluj.', link: '' },
      { id: 'v4', time: '19:00', type: 'workshop', titleRO: 'Workshop 2 — Merge with Confidence', titleEN: 'Workshop 2 — Merge with Confidence', descRO: 'Arta de a lucra în echipă fără conflicte, susținut de .msg Romania.', descEN: 'The art of teamwork without conflicts, hosted by .msg Romania.', link: '' },
      { id: 'v5', time: '20:00', type: 'break',    titleRO: 'Dinner', titleEN: 'Dinner', descRO: 'Pauză de masă.', descEN: 'Meal break.', link: '' },
      { id: 'v6', time: '21:15', type: 'logistics', titleRO: 'How to Redeem Google Cloud Credits', titleEN: 'How to Redeem Google Cloud Credits', descRO: 'Sesiune scurtă de activare a creditelor Google Cloud.', descEN: 'Short session on activating Google Cloud credits.', link: 'https://meet.google.com/dii-fcgj-wzc' },
      { id: 'v7', time: '21:30', type: 'logistics', titleRO: 'Hands-on Google Cloud Credits', titleEN: 'Hands-on Google Cloud Credits', descRO: 'Practică directă cu activarea Google Cloud.', descEN: 'Hands-on practice with Google Cloud activation.', link: '' },
      { id: 'v8', time: '22:00', type: 'coding',   titleRO: 'Start Coding Session 🚀', titleEN: 'Start Coding Session 🚀', descRO: 'Start oficial al sesiunii de coding. 48 de ore de inovație încep acum!', descEN: 'Official start of the coding session. 48 hours of innovation begin now!', link: '' },
    ],
    sambata: [
      { id: 's1', time: '00:00', type: 'coding',   titleRO: 'Online Coding Session', titleEN: 'Online Coding Session', descRO: 'Sesiune de coding overnight pentru echipele care lucrează de acasă.', descEN: 'Overnight coding session for remote teams.', link: '' },
      { id: 's2', time: '08:00', type: 'coding',   titleRO: 'Coding Session Continues', titleEN: 'Coding Session Continues', descRO: 'Continuarea dezvoltării proiectelor la sediu.', descEN: 'Continue building projects on-site.', link: '' },
      { id: 's3', time: '11:30', type: 'break',    titleRO: 'Lunch Break', titleEN: 'Lunch Break', descRO: 'Pauză de prânz.', descEN: 'Lunch break.', link: '' },
      { id: 's4', time: '12:00', type: 'workshop', titleRO: 'Workshop 3 — Firebase Genkit + AI Agent', titleEN: 'Workshop 3 — Firebase Genkit + AI Agent', descRO: 'Building a small AI agent end-to-end, susținut de Google Developer Expert Sasha Denisov.', descEN: 'Building a small AI agent end-to-end, hosted by Google Developer Expert Sasha Denisov.', link: 'https://meet.google.com/pjq-tkvc-nna' },
      { id: 's5', time: '13:00', type: 'workshop', titleRO: 'Workshop 4 — Production-Ready Football AI', titleEN: 'Workshop 4 — Production-Ready Football AI', descRO: 'ADK, Agent Engine & Intelligent Database, susținut de Google Developer Expert.', descEN: 'ADK, Agent Engine & Intelligent Database, hosted by Google Developer Expert.', link: 'https://meet.google.com/edo-yqsn-rbv' },
      { id: 's6', time: '14:00', type: 'ceremony', titleRO: 'Sosirea Echipei Oficiale FC "U" Cluj ⚽', titleEN: 'Official FC "U" Cluj Team Arrival ⚽', descRO: 'Sosirea reprezentanților oficiali ai echipei FC Universitatea Cluj.', descEN: 'Arrival of official FC Universitatea Cluj representatives.', link: '' },
      { id: 's7', time: '14:00', type: 'coding',   titleRO: 'Coding Session', titleEN: 'Coding Session', descRO: 'Continuarea lucrului la proiecte.', descEN: 'Continue working on your projects.', link: '' },
      { id: 's8', time: '17:30', type: 'break',    titleRO: 'Dinner Break', titleEN: 'Dinner Break', descRO: 'Pauză de masă.', descEN: 'Meal break.', link: '' },
      { id: 's9', time: '18:00', type: 'workshop', titleRO: 'Workshop 5 — Agentic AI with ADK', titleEN: 'Workshop 5 — Agentic AI with ADK', descRO: 'Susținut de Google Developer Expert Gabriel Preda.', descEN: 'Hosted by Google Developer Expert Gabriel Preda.', link: 'https://meet.google.com/hjv-emec-aiw' },
      { id: 's10', time: '19:00', type: 'coding',  titleRO: 'Evening Coding Session', titleEN: 'Evening Coding Session', descRO: 'Sesiune intensivă de coding — ultimele ore înainte de deadline.', descEN: 'Intensive coding session — final hours before deadline.', link: '' },
    ],
    duminica: [
      { id: 'd1', time: '00:00', type: 'coding',   titleRO: 'Online Coding Session', titleEN: 'Online Coding Session', descRO: 'Ultima sesiune de coding overnight.', descEN: 'Last overnight coding session.', link: '' },
      { id: 'd2', time: '08:00', type: 'coding',   titleRO: 'Final Coding Session', titleEN: 'Final Coding Session', descRO: 'Ultimele ore de development — finalizare proiecte.', descEN: 'Last hours of development — finalize projects.', link: '' },
      { id: 'd3', time: '11:30', type: 'break',    titleRO: 'Lunch Break', titleEN: 'Lunch Break', descRO: 'Ultima pauză de masă a hackathonului.', descEN: 'Last meal break of the hackathon.', link: '' },
      { id: 'd4', time: '12:00', type: 'deadline', titleRO: '⏱️ CODE SUBMISSION DEADLINE', titleEN: '⏱️ CODE SUBMISSION DEADLINE', descRO: 'Deadline-ul final. Niciun commit ulterior nu va fi luat în considerare!', descEN: 'Final deadline. No commits after this time will be accepted!', link: '', highlight: true },
      { id: 'd5', time: '12:30', type: 'ceremony', titleRO: 'Project Presentations', titleEN: 'Project Presentations', descRO: 'Fiecare echipă prezintă soluția — ~5 minute + Q&A.', descEN: 'Each team presents their solution — ~5 min + Q&A.', link: '' },
      { id: 'd6', time: '15:00', type: 'logistics', titleRO: 'Jury Deliberation', titleEN: 'Jury Deliberation', descRO: 'Juriul deliberează și stabilește câștigătorii.', descEN: 'The jury deliberates and selects winners.', link: '' },
      { id: 'd7', time: '16:00', type: 'ceremony', titleRO: '�� Prize Ceremony', titleEN: '🏆 Prize Ceremony', descRO: 'Ceremonia de premiere — anunțarea câștigătorilor.', descEN: 'Award ceremony — winners announced.', link: '', highlight: true },
      { id: 'd8', time: '17:00', type: 'logistics', titleRO: 'Networking Session', titleEN: 'Networking Session', descRO: 'Networking cu reprezentanții clubului, sponsorii și mentorii.', descEN: 'Networking with club representatives, sponsors, and mentors.', link: '' },
      { id: 'd9', time: '19:00', type: 'logistics', titleRO: 'Venue Closes', titleEN: 'Venue Closes', descRO: 'Închiderea oficială a evenimentului.', descEN: 'Official closing of the event.', link: '' },
    ],
  },

  // ── Themes ───────────────────────────────────────────
  themes: [
    {
      id: 'th1', number: '01', icon: '⚽', color: '#a78bfa',
      titleRO: 'Smart Match Insights', titleEN: 'Smart Match Insights',
      taglineRO: 'Transformă datele în decizii tactice', taglineEN: 'Turn data into tactical decisions',
      descRO: 'Construiește un sistem AI care analizează meciuri și generează insight-uri: scor AI per jucător, unde s-a pierdut mingea, cine a rupt liniile adverse.',
      descEN: 'Build an AI system that analyzes matches and generates insights: AI score per player, where the ball was lost, who broke defensive lines.',
      bulletsRO: ['Player performance scoring cu AI', 'Heatmaps & ball possession analysis', 'Tactical pattern recognition', 'Match event detection'],
      bulletsEN: ['AI-powered player performance scoring', 'Heatmaps & ball possession analysis', 'Tactical pattern recognition', 'Match event detection'],
    },
    {
      id: 'th2', number: '02', icon: '🔍', color: '#34d399',
      titleRO: 'Transfer & Scouting Assistant', titleEN: 'Transfer & Scouting Assistant',
      taglineRO: 'Descoperă talentul înainte de concurență', taglineEN: 'Discover talent before the competition',
      descRO: 'Dezvoltă un asistent inteligent care recomandă jucători bazat pe pozițiile libere, stilul de joc și compatibilitatea cu lotul.',
      descEN: "Build an intelligent assistant that recommends players based on open squad positions, playing style, and squad compatibility.",
      bulletsRO: ['Similarity matching între jucători', 'Position & style fit scoring', 'Integration cu date publice', 'Natural language query interface'],
      bulletsEN: ['Player similarity matching', 'Position & style fit scoring', 'Integration with public data', 'Natural language query interface'],
    },
    {
      id: 'th3', number: '03', icon: '🎯', color: '#fbbf24',
      titleRO: 'Opponent Analysis', titleEN: 'Opponent Analysis',
      taglineRO: 'Cunoaște-ți adversarul înainte de fluier', taglineEN: 'Know your opponent before kick-off',
      descRO: 'Creează un sistem care analizează jocul adversarului — identifică patterns de atac, vulnerabilități defensive și jucători cheie.',
      descEN: "Build a system that analyzes the opponent's game — identify attack patterns, defensive vulnerabilities, and key players.",
      bulletsRO: ['Opponent formation & style detection', 'Key player identification', 'Weakness exploitation recommendations', 'Pre-match tactical briefing generator'],
      bulletsEN: ['Opponent formation & style detection', 'Key player identification', 'Weakness exploitation recommendations', 'Pre-match tactical briefing generator'],
    },
  ],

  // ── Submission ───────────────────────────────────────
  submission: {
    deadlineRO: 'Duminică, 26 Aprilie — 12:00',
    deadlineEN: 'Sunday, April 26 — 12:00',
    formUrl:    'https://forms.gle/placeholder',
    rulesRO: [
      'Niciun commit după ora 12:00 nu va fi acceptat',
      'Repository-ul trebuie să fie public',
      'Includeți un README.md cu instrucțiuni de rulare',
      'Demo video (max 3 min) este un plus, nu obligatoriu',
    ],
    rulesEN: [
      'No commits after 12:00 will be accepted',
      'The repository must be public',
      'Include a README.md with setup instructions',
      'Demo video (max 3 min) is a bonus, not required',
    ],
    stepsRO: [
      { num: '01', title: 'Finalizează codul', desc: 'Asigură-te că tot codul este commis și pushat pe GitHub înainte de ora 12:00 Duminică.' },
      { num: '02', title: 'Completează formularul', desc: 'Trimite link-ul repo, numele echipei, tema aleasă și o descriere scurtă.' },
      { num: '03', title: 'Pregătește prezentarea', desc: 'Pregătești un demo de ~5 minute + Q&A cu juriul, imediat după deadline.' },
    ],
    stepsEN: [
      { num: '01', title: 'Finalize your code', desc: 'Make sure all code is committed and pushed to GitHub before 12:00 on Sunday.' },
      { num: '02', title: 'Fill in the form', desc: 'Submit your repo link, team name, chosen theme, and a short description.' },
      { num: '03', title: 'Prepare your demo', desc: 'Prepare a ~5-minute demo + Q&A with the jury, right after the deadline.' },
    ],
  },

  // ── Partners ─────────────────────────────────────────
  partners: {
    organizers: [
      { id: 'o1', name: 'FC Universitatea Cluj', logo: '/assets/img/partners/ucluj.png' },
      { id: 'o2', name: 'GDGoC UTCN',            logo: '/assets/img/partners/gdgoc.png' },
    ],
    supporters: [
      { id: 's1', name: 'ucluj.ro',                      logo: '/assets/img/partners/ucluj-site.png' },
      { id: 's2', name: 'Universitatea Tehnică Cluj-Napoca', logo: '/assets/img/partners/utcn.png' },
    ],
    sponsors: [
      { id: 'sp1', name: '', logo: '', tier: 'Gold' },
      { id: 'sp2', name: '', logo: '', tier: 'Silver' },
      { id: 'sp3', name: '', logo: '', tier: 'Bronze' },
    ],
  },

  // ── Team ─────────────────────────────────────────────
  team: [
    { id: 'm1', name: 'Ștefania Mozacu',         role: 'Coordonator',         initials: 'ȘM', img: '/assets/img/team/stefania.jpg' },
    { id: 'm2', name: 'Szecsi Antonia',          role: 'Coordonator',         initials: 'SA', img: '/assets/img/team/antonia.jpg' },
    { id: 'm3', name: 'Alexandru Mihoc',         role: 'Coordonator',         initials: 'AM', img: '/assets/img/team/alexandru.jpg' },
    { id: 'm4', name: 'Raisa Butuza',            role: 'Coordonator',         initials: 'RB', img: '/assets/img/team/raisa.jpg' },
    { id: 'm5', name: 'Alexandra Homiuc',        role: 'Coordonator',         initials: 'AH', img: '/assets/img/team/alexandra.jpg' },
    { id: 'm6', name: 'Ioana Ghineț',            role: 'Coordonator',         initials: 'IG', img: '/assets/img/team/ioana.jpg' },
    { id: 'm7', name: 'prof. ing. Adrian Sabou', role: 'Coordonator Academic', initials: 'AS', img: '/assets/img/team/sabou.jpg' },
  ],

  // ── FAQ ──────────────────────────────────────────────
  faq: [
    { id: 'f1', questionRO: 'Cine poate participa?', answerRO: 'Orice student sau tânăr profesionist cu vârsta între 18-30 de ani, cu cunoștințe de programare. Nu este necesar să ai experiență în AI sau data science.', questionEN: 'Who can participate?', answerEN: 'Any student or young professional aged 18–30 with programming knowledge. No prior AI or data science experience required.' },
    { id: 'f2', questionRO: 'Cum se formează echipele?', answerRO: 'Echipele sunt formate din 2-4 membri. Poți veni cu echipa formată sau te înscrii individual.', questionEN: 'How are teams formed?', answerEN: 'Teams consist of 2–4 members. You can come with a pre-formed team or register individually.' },
    { id: 'f3', questionRO: 'Ce trebuie să aduc?', answerRO: 'Laptopul tău, încărcătorul, și multă energie! Cazarea, mesele și snack-urile sunt asigurate.', questionEN: 'What should I bring?', answerEN: 'Your laptop, charger, and lots of energy! Accommodation, meals, and snacks are provided.' },
    { id: 'f4', questionRO: 'Participarea este gratuită?', answerRO: 'Da! Participarea este 100% gratuită. Tot ce ai nevoie este să te înscrii și să fii selectat.', questionEN: 'Is participation free?', answerEN: 'Yes! Participation is 100% free. Just register and get selected through the application process.' },
    { id: 'f5', questionRO: 'Ce date vom folosi?', answerRO: 'Veți primi acces la date reale de la FC Universitatea Cluj — statistici de meci, date despre jucători. Veți primi și credite Google Cloud.', questionEN: 'What data will we use?', answerEN: 'You will get access to real data from FC Universitatea Cluj — match stats, player data. You will also receive Google Cloud credits.' },
  ],

  // ── Prizes ───────────────────────────────────────────
  prizes: [
    { id: 'p1', place: '🥇 1st Place', valueRO: 'TBA', valueEN: 'TBA', descRO: '', descEN: '' },
    { id: 'p2', place: '🥈 2nd Place', valueRO: 'TBA', valueEN: 'TBA', descRO: '', descEN: '' },
    { id: 'p3', place: '🥉 3rd Place', valueRO: 'TBA', valueEN: 'TBA', descRO: '', descEN: '' },
  ],

  // ── Users, Teams, Mentors, Bookings ─────────────────────────
  // Simple in-browser user store: teams, mentors, judges, admins
  users: [
    { id: 'u1', email: 'team1@example.com', password: 'team1pass', role: 'team', teamId: 'team1', name: 'Team One' },
    { id: 'm1', email: 'mentor1@example.com', password: 'mentor1pass', role: 'mentor', mentorId: 'mentor1', name: 'Gabriel Preda' },
    { id: 'j1', email: 'judge1@example.com', password: 'judge1pass', role: 'judge', name: 'Juriu 1' },
  ],

  teams: [
    {
      id: 'team1',
      name: 'Blue Rockets',
      members: [{ name: 'Ana', email: 'ana@example.com' }],
      themeId: null,
      tableLocation: 'Table 3 – Floor 2',
      documents: [],
      messages: [],
    },
  ],

  mentors: [
    {
      id: 'mentor1', name: 'Gabriel Preda',
      bio: 'Google Developer Expert in ML & AI Agents. Loves football data.',
      expertise: ['AI', 'Agents', 'ADK'],
      linkedin: 'https://linkedin.com/in/gabrielpreda',
      photo: '',
      slots: [
        { id: 'sl1', datetime: '2026-04-25T12:00', durationMin: 30 },
        { id: 'sl2', datetime: '2026-04-25T15:00', durationMin: 30 },
      ],
    },
    {
      id: 'mentor2', name: 'Sasha Denisov',
      bio: 'Firebase & ML specialist. Building production AI apps since 2018.',
      expertise: ['Firebase', 'ML', 'Genkit'],
      linkedin: 'https://linkedin.com/in/sasha',
      photo: '',
      slots: [
        { id: 'sl3', datetime: '2026-04-25T13:00', durationMin: 30 },
        { id: 'sl4', datetime: '2026-04-25T16:00', durationMin: 30 },
      ],
    },
  ],

  bookings: [
    // { id: 'b1', teamId: 'team1', mentorId: 'mentor1', slotId: 'sl1', note: '' }
  ],

  // ── Chat messages ─────────────────────────────────
  // roomId = `${teamId}__${mentorId}`
  chatMessages: [
    // { id: 'm1', roomId: 'team1__mentor1', senderName: 'Ana', text: 'Hello!', ts: 1714000000000 }
  ],

  // Documents that can be attached to team dashboards (rules, templates)
  documents: [
    { id: 'd1', title: 'Regulament', url: '/assets/docs/regulament.pdf' },
  ],
}
