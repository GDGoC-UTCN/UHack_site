// ══════════════════════════════════════════════════════
// "U" HACK — i18n translations   (ro | en)
// ══════════════════════════════════════════════════════

export const t = {
  ro: {
    // ── Navbar ──────────────────────────────────────────
    nav: {
      despre:    'Despre',
      program:   'Program',
      teme:      'Teme',
      submit:    'Submit',
      galerie:   'Galerie',
      parteneri: 'Parteneri',
      echipa:    'Echipă',
      inscrieTE: 'Înscrie-te',
    },

    // ── Hero ────────────────────────────────────────────
    hero: {
      tag:      '// 24 – 26 Aprilie 2026 · Cluj-Napoca',
      title1:   '"U"',
      title2:   'HACK!',
      subtitle: 'Primul hackathon al unui club de fotbal din România. 48 de ore, 3 provocări AI, date reale de la FC Universitatea Cluj.',
      cta1:     'Înscrie echipa',
      cta2:     'Detalii eveniment',
      days:     'zile',
      hours:    'ore',
      mins:     'min',
      secs:     'sec',
      ended:    'Evenimentul a început!',
    },

    // ── Stats bar ───────────────────────────────────────
    stats: {
      duration: '48h',
      durationLabel: 'de hacking non-stop',
      participants: '120+',
      participantsLabel: 'participanți așteptați',
      teams: '24',
      teamsLabel: 'echipe în competiție',
      first: '1st',
      firstLabel: 'hackathon fotbal în România',
    },

    // ── About ───────────────────────────────────────────
    about: {
      tag:   '// despre',
      title: 'Cod, Date & Fotbal',
      p1: 'U Hack este primul hackathon organizat de un club de fotbal din România — o colaborare inedită între FC Universitatea Cluj și Google Developer Group on Campus UTCN.',
      p2: 'Timp de 48 de ore, echipe de studenți și tineri profesioniști vor construi soluții AI care transformă modul în care fotbalul este analizat, jucat și înțeles.',
      p3: 'Date reale, mentori din industrie, și șansa de a construi ceva care contează cu adevărat pentru sportul românesc.',
      terminalTitle: 'uhack_mission.txt',
      terminalLines: [
        '> misiune: democratizarea AI în sport',
        '> echipe: studenți + profesioniști',
        '> date: reale, de la FC "U" Cluj',
        '> obiectiv: soluții care contează',
        '> locație: Cluj-Napoca, România',
        '> organizatori: GDGoC UTCN × FC "U"',
      ],
    },

    // ── Timeline ────────────────────────────────────────
    timeline: {
      tag:      '// program',
      title:    '48 de Ore de Inovație',
      subtitle: '📍 Sediu MSG · Strada Croitorilor, nr. 12-14, Cluj-Napoca',
      typeLabels: {
        workshop:  'workshop',
        coding:    'coding',
        ceremony:  'eveniment',
        break:     'pauză',
        logistics: 'info',
        deadline:  'deadline',
      },
      days: {
        vineri:   { label: 'Vineri',    date: '24 Aprilie' },
        sambata:  { label: 'Sâmbătă',  date: '25 Aprilie' },
        duminica: { label: 'Duminică', date: '26 Aprilie' },
      },
      events: {
        vineri: [
          { time: '16:00', title: 'Check-in & Înregistrare Echipe', desc: 'Înregistrarea echipelor la sediul MSG, Strada Croitorilor nr. 12-14, Cluj-Napoca.', type: 'logistics' },
          { time: '17:30', title: 'Opening Ceremony & Anunțarea Temelor', desc: 'Ceremonia de deschidere oficială și anunțarea celor 3 teme ale hackathonului.', type: 'ceremony', link: 'https://meet.google.com/bjd-zpbk-igf' },
          { time: '18:00', title: 'Workshop 1 — Sports Analytics by "U" Cluj', desc: 'Susținut de Gabriel Giurgiu, Director Sportiv FC Universitatea Cluj. Introducere în analiza datelor sportive.', type: 'workshop' },
          { time: '19:00', title: 'Workshop 2 — Merge with Confidence', desc: 'Arta de a lucra în echipă fără conflicte (prea mari), susținut de .msg Romania.', type: 'workshop' },
          { time: '20:00', title: 'Dinner', desc: 'Pauză de masă.', type: 'break' },
          { time: '21:15', title: 'How to Redeem Google Cloud Credits', desc: 'Sesiune scurtă de activare a creditelor Google Cloud pentru toate echipele.', type: 'logistics', link: 'https://meet.google.com/dii-fcgj-wzc' },
          { time: '21:30', title: 'Hands-on Google Cloud Credits', desc: 'Practică directă cu activarea și configurarea creditelor Google Cloud.', type: 'logistics' },
          { time: '22:00', title: 'Start Coding Session 🚀', desc: 'Start oficial al sesiunii de coding. 48 de ore de inovație încep acum!', type: 'coding' },
        ],
        sambata: [
          { time: '00:00', title: 'Online Coding Session', desc: 'Sesiune de coding overnight pentru echipele care lucrează de acasă.', type: 'coding' },
          { time: '08:00', title: 'Coding Session Continues', desc: 'Continuarea dezvoltării proiectelor la sediu.', type: 'coding' },
          { time: '11:30', title: 'Lunch Break', desc: 'Pauză de prânz.', type: 'break' },
          { time: '12:00', title: 'Workshop 3 — Firebase Genkit + AI Agent', desc: 'Building a small AI agent end-to-end, susținut de Google Developer Expert Sasha Denisov.', type: 'workshop', link: 'https://meet.google.com/pjq-tkvc-nna' },
          { time: '13:00', title: 'Workshop 4 — Production-Ready Football AI', desc: 'ADK, Agent Engine & Intelligent Database, susținut de Google Developer Expert.', type: 'workshop', link: 'https://meet.google.com/edo-yqsn-rbv' },
          { time: '14:00', title: 'Sosirea Echipei Oficiale FC "U" Cluj ⚽', desc: 'Sosirea reprezentanților oficiali ai echipei FC Universitatea Cluj.', type: 'ceremony' },
          { time: '14:00', title: 'Coding Session', desc: 'Continuarea lucrului la proiecte.', type: 'coding' },
          { time: '17:30', title: 'Dinner Break', desc: 'Pauză de masă.', type: 'break' },
          { time: '18:00', title: 'Workshop 5 — Agentic AI with ADK', desc: 'Susținut de Google Developer Expert Gabriel Preda.', type: 'workshop', link: 'https://meet.google.com/hjv-emec-aiw' },
          { time: '19:00', title: 'Evening Coding Session', desc: 'Sesiune intensivă de coding — ultimele ore înainte de deadline.', type: 'coding' },
        ],
        duminica: [
          { time: '00:00', title: 'Online Coding Session', desc: 'Ultima sesiune de coding overnight.', type: 'coding' },
          { time: '08:00', title: 'Final Coding Session', desc: 'Ultimele ore de development — finalizare și polish al proiectelor.', type: 'coding' },
          { time: '11:30', title: 'Lunch Break', desc: 'Ultima pauză de masă a hackathonului.', type: 'break' },
          { time: '12:00', title: '⏱️ CODE SUBMISSION DEADLINE', desc: 'Deadline-ul final pentru submisia proiectelor. Niciun commit ulterior nu va fi luat în considerare!', type: 'deadline', highlight: true },
          { time: '12:30', title: 'Project Presentations', desc: 'Fiecare echipă prezintă soluția în fața juriului — ~5 minute prezentare + Q&A.', type: 'ceremony' },
          { time: '15:00', title: 'Jury Deliberation', desc: 'Juriul deliberează și stabilește câștigătorii pe baza criteriilor anunțate.', type: 'logistics' },
          { time: '16:00', title: '🏆 Prize Ceremony', desc: 'Ceremonia de premiere — anunțarea câștigătorilor și înmânarea premiilor.', type: 'ceremony', highlight: true },
          { time: '17:00', title: 'Networking Session', desc: 'Sesiune de networking cu reprezentanții clubului, sponsorii și mentorii.', type: 'logistics' },
          { time: '19:00', title: 'Venue Closes', desc: 'Închiderea oficială a evenimentului. La revedere și mulțumim!', type: 'logistics' },
        ],
      },
    },

    // ── Tracks ──────────────────────────────────────────
    tracks: {
      tag:      '// teme',
      title:    'Cele 3 Provocări',
      subtitle: 'Alege-ți tema și construiește soluția care va revoluționa fotbalul românesc',
      themes: [
        {
          number: '01',
          title:   'Smart Match Insights',
          tagline: 'Transformă datele în decizii tactice',
          desc:    'Construiește un sistem AI care analizează meciuri și generează insight-uri acționabile: scor AI per jucător, unde s-a pierdut mingea, cine a rupt liniile adverse, ce tip de atac a funcționat.',
          bullets: ['Player performance scoring cu AI', 'Heatmaps & ball possession analysis', 'Tactical pattern recognition', 'Match event detection'],
          icon: '⚽', color: '#a78bfa',
        },
        {
          number: '02',
          title:   'Transfer & Scouting Assistant',
          tagline: 'Descoperă talentul înainte de concurență',
          desc:    'Dezvoltă un asistent inteligent care recomandă jucători bazat pe pozițiile libere din echipă, stilul de joc al antrenorului și compatibilitatea cu ceilalți jucători din lot.',
          bullets: ['Similarity matching între jucători', 'Position & style fit scoring', 'Integration cu date publice (Transfermarkt etc.)', 'Natural language query interface'],
          icon: '🔍', color: '#34d399',
        },
        {
          number: '03',
          title:   'Opponent Analysis',
          tagline: 'Cunoaște-ți adversarul înainte de fluier',
          desc:    'Creează un sistem care analizează jocul adversarului pentru a pregăti echipa să contracareze — identifică patterns de atac, vulnerabilități defensive și jucători cheie.',
          bullets: ['Opponent formation & style detection', 'Key player identification', 'Weakness exploitation recommendations', 'Pre-match tactical briefing generator'],
          icon: '🎯', color: '#fbbf24',
        },
      ],
    },

    // ── Submission ──────────────────────────────────────
    submission: {
      tag:      '// submisie',
      title:    'Trimite Proiectul',
      subtitle: 'Deadline:',
      deadline: 'Duminică, 26 Aprilie — 12:00',
      steps: [
        { num: '01', title: 'Finalizează codul', desc: 'Asigură-te că tot codul este commis și pushat pe GitHub înainte de ora 12:00 Duminică, 26 Aprilie.' },
        { num: '02', title: 'Completează formularul', desc: 'Trimite link-ul repository-ului GitHub, numele echipei, tema aleasă și un scurt description al soluției.' },
        { num: '03', title: 'Pregătește prezentarea', desc: 'Pregătești un demo de ~5 minute al soluției tale + Q&A cu juriul, imediat după deadline.' },
      ],
      repoLabel:   'Format repository:',
      rulesTitle:  '📌 Reguli importante:',
      rules: [
        'Niciun commit după ora 12:00 nu va fi acceptat',
        'Repository-ul trebuie să fie public',
        'Includeți un README.md cu instrucțiuni de rulare',
        'Demo video (max 3 min) este un plus, nu obligatoriu',
      ],
      btn:  '📤 Submit Proiectul',
      note: 'Link-ul de submisie va fi activat în ziua evenimentului',
    },

    // ── Gallery ─────────────────────────────────────────
    gallery: {
      tag:   '// galerie',
      title: 'Momente din Comunitate',
    },

    // ── Partners ────────────────────────────────────────
    partners: {
      tag:   '// parteneri',
      title: 'Parteneri & Susținători',
      tier1: 'Organizatori Principali',
      tier2: 'Susținut de',
      tier3: 'Sponsori',
      sponsorCta:  'Devino Sponsor',
      sponsorDesc: 'Vrei să îți prezinți brandul în fața a 120+ studenți și profesioniști tech? Hai să vorbim.',
    },

    // ── Team ────────────────────────────────────────────
    team: {
      tag:   '// echipă',
      title: 'Oamenii din Spatele Evenimentului',
      volunteerCount: '30+',
      volunteerLabel: 'Voluntari',
      volunteerDesc:  'Oameni minunați care fac magia să se întâmple',
    },

    // ── FAQ ─────────────────────────────────────────────
    faq: {
      tag:   '// faq',
      title: 'Întrebări Frecvente',
      items: [
        {
          q: 'Cine poate participa?',
          a: 'Orice student sau tânăr profesionist cu vârsta între 18-30 de ani, cu cunoștințe de programare. Nu este necesar să ai experiență în AI sau data science — pasiunea și dorința de a învăța contează mai mult.',
        },
        {
          q: 'Cum se formează echipele?',
          a: 'Echipele sunt formate din 2-4 membri. Poți veni cu echipa deja formată sau te poți înscrie individual și te vom ajuta să găsești colegi de echipă la eveniment.',
        },
        {
          q: 'Ce trebuie să aduc?',
          a: 'Laptopul tău, încărcătorul, și multă energie! Cazarea, mesele principale și snack-urile sunt asigurate pe parcursul evenimentului.',
        },
        {
          q: 'Participarea este gratuită?',
          a: 'Da! Participarea este 100% gratuită. Tot ce ai nevoie este să te înscrii și să fii selectat în urma procesului de aplicație.',
        },
        {
          q: 'Ce date vom folosi?',
          a: 'Veți primi acces la date reale de la FC Universitatea Cluj — statistici de meci, date despre jucători și alte resurse relevante. De asemenea, veți primi credite Google Cloud pentru a rula modele AI.',
        },
      ],
    },

    // ── Register ────────────────────────────────────────
    register: {
      tag:      '// înscrie-te',
      title:    'Fii Parte din Istorie',
      subtitle: 'Locurile sunt limitate. Asigură-ți locul în prima ediție a U Hack!',
      namePlaceholder:  'Numele tău complet',
      emailPlaceholder: 'adresa@email.com',
      rolePlaceholder:  'Rol / Specializare (ex: Backend Dev, Data Scientist...)',
      teamPlaceholder:  'Numele echipei (opțional — poți veni singur)',
      gdpr:    'Sunt de acord cu prelucrarea datelor cu caracter personal conform GDPR',
      btnIdle: 'Trimite Aplicația',
      btnBusy: 'Se trimite...',
      successTitle: '✅ Aplicație trimisă!',
      successMsg:   'Îți mulțumim! Vei primi un email de confirmare în curând.',
      errors: {
        name:  'Numele este obligatoriu',
        email: 'Adresă de email invalidă',
        role:  'Rolul este obligatoriu',
        gdpr:  'Trebuie să accepți termenii',
      },
    },

    // ── Footer ──────────────────────────────────────────
    footer: {
      tagline: 'Codul întâlnește fotbalul.',
      links: ['Despre', 'Program', 'Teme', 'Submit', 'Galerie', 'Parteneri', 'Echipă', 'FAQ'],
      contact: 'Contact',
      rights:  'Toate drepturile rezervate.',
      madeBy:  'Realizat cu ❤️ de GDGoC UTCN',
    },
  },

  // ════════════════════════════════════════════════════
  // ENGLISH
  // ════════════════════════════════════════════════════
  en: {
    nav: {
      despre:    'About',
      program:   'Schedule',
      teme:      'Themes',
      submit:    'Submit',
      galerie:   'Gallery',
      parteneri: 'Partners',
      echipa:    'Team',
      inscrieTE: 'Register',
    },

    hero: {
      tag:      '// April 24–26, 2026 · Cluj-Napoca',
      title1:   '"U"',
      title2:   'HACK!',
      subtitle: "Romania's first football club hackathon. 48 hours, 3 AI challenges, real data from FC Universitatea Cluj.",
      cta1:     'Register your team',
      cta2:     'Event details',
      days:     'days',
      hours:    'hours',
      mins:     'min',
      secs:     'sec',
      ended:    'The event has started!',
    },

    stats: {
      duration:          '48h',
      durationLabel:     'of non-stop hacking',
      participants:      '120+',
      participantsLabel: 'expected participants',
      teams:             '24',
      teamsLabel:        'competing teams',
      first:             '1st',
      firstLabel:        'football hackathon in Romania',
    },

    about: {
      tag:   '// about',
      title: 'Code, Data & Football',
      p1: "U Hack is Romania's first hackathon organized by a football club — a unique collaboration between FC Universitatea Cluj and Google Developer Group on Campus UTCN.",
      p2: 'Over 48 hours, teams of students and young professionals will build AI solutions that transform the way football is analyzed, played, and understood.',
      p3: 'Real data, industry mentors, and the chance to build something that truly matters for Romanian sport.',
      terminalTitle: 'uhack_mission.txt',
      terminalLines: [
        '> mission: democratizing AI in sport',
        '> teams: students + professionals',
        '> data: real, from FC "U" Cluj',
        '> goal: solutions that matter',
        '> location: Cluj-Napoca, Romania',
        '> organizers: GDGoC UTCN × FC "U"',
      ],
    },

    timeline: {
      tag:      '// schedule',
      title:    '48 Hours of Innovation',
      subtitle: '📍 MSG HQ · Strada Croitorilor, nr. 12-14, Cluj-Napoca',
      typeLabels: {
        workshop:  'workshop',
        coding:    'coding',
        ceremony:  'event',
        break:     'break',
        logistics: 'info',
        deadline:  'deadline',
      },
      days: {
        vineri:   { label: 'Friday',    date: 'April 24' },
        sambata:  { label: 'Saturday',  date: 'April 25' },
        duminica: { label: 'Sunday',    date: 'April 26' },
      },
      events: {
        vineri: [
          { time: '16:00', title: 'Team Check-in & Registration', desc: 'Team registration at MSG HQ, Strada Croitorilor no. 12-14, Cluj-Napoca.', type: 'logistics' },
          { time: '17:30', title: 'Opening Ceremony & Theme Announcement', desc: 'Official opening ceremony and announcement of the 3 hackathon themes.', type: 'ceremony', link: 'https://meet.google.com/bjd-zpbk-igf' },
          { time: '18:00', title: 'Workshop 1 — Sports Analytics by "U" Cluj', desc: 'Hosted by Gabriel Giurgiu, Sports Director of FC Universitatea Cluj. Introduction to sports data analytics.', type: 'workshop' },
          { time: '19:00', title: 'Workshop 2 — Merge with Confidence', desc: 'The art of teamwork without (too many) conflicts, hosted by .msg Romania.', type: 'workshop' },
          { time: '20:00', title: 'Dinner', desc: 'Meal break.', type: 'break' },
          { time: '21:15', title: 'How to Redeem Google Cloud Credits', desc: 'Short session on activating Google Cloud credits for all teams.', type: 'logistics', link: 'https://meet.google.com/dii-fcgj-wzc' },
          { time: '21:30', title: 'Hands-on Google Cloud Credits', desc: 'Hands-on practice activating and configuring Google Cloud credits.', type: 'logistics' },
          { time: '22:00', title: 'Start Coding Session 🚀', desc: 'Official start of the coding session. 48 hours of innovation begin now!', type: 'coding' },
        ],
        sambata: [
          { time: '00:00', title: 'Online Coding Session', desc: 'Overnight coding session for teams working remotely.', type: 'coding' },
          { time: '08:00', title: 'Coding Session Continues', desc: 'Continue building your projects on-site.', type: 'coding' },
          { time: '11:30', title: 'Lunch Break', desc: 'Lunch break.', type: 'break' },
          { time: '12:00', title: 'Workshop 3 — Firebase Genkit + AI Agent', desc: 'Building a small AI agent end-to-end, hosted by Google Developer Expert Sasha Denisov.', type: 'workshop', link: 'https://meet.google.com/pjq-tkvc-nna' },
          { time: '13:00', title: 'Workshop 4 — Production-Ready Football AI', desc: 'ADK, Agent Engine & Intelligent Database, hosted by Google Developer Expert.', type: 'workshop', link: 'https://meet.google.com/edo-yqsn-rbv' },
          { time: '14:00', title: 'Official FC "U" Cluj Team Arrival ⚽', desc: 'Arrival of official representatives of FC Universitatea Cluj.', type: 'ceremony' },
          { time: '14:00', title: 'Coding Session', desc: 'Continue working on your projects.', type: 'coding' },
          { time: '17:30', title: 'Dinner Break', desc: 'Meal break.', type: 'break' },
          { time: '18:00', title: 'Workshop 5 — Agentic AI with ADK', desc: 'Hosted by Google Developer Expert Gabriel Preda.', type: 'workshop', link: 'https://meet.google.com/hjv-emec-aiw' },
          { time: '19:00', title: 'Evening Coding Session', desc: 'Intensive coding session — final hours before the deadline.', type: 'coding' },
        ],
        duminica: [
          { time: '00:00', title: 'Online Coding Session', desc: 'Last overnight coding session.', type: 'coding' },
          { time: '08:00', title: 'Final Coding Session', desc: 'Last hours of development — finalize and polish your projects.', type: 'coding' },
          { time: '11:30', title: 'Lunch Break', desc: 'Last meal break of the hackathon.', type: 'break' },
          { time: '12:00', title: '⏱️ CODE SUBMISSION DEADLINE', desc: 'Final deadline for project submission. No commits after this time will be considered!', type: 'deadline', highlight: true },
          { time: '12:30', title: 'Project Presentations', desc: 'Each team presents their solution to the jury — ~5 min presentation + Q&A.', type: 'ceremony' },
          { time: '15:00', title: 'Jury Deliberation', desc: 'The jury deliberates and selects the winners based on announced criteria.', type: 'logistics' },
          { time: '16:00', title: '🏆 Prize Ceremony', desc: 'Award ceremony — winners announced and prizes awarded.', type: 'ceremony', highlight: true },
          { time: '17:00', title: 'Networking Session', desc: 'Networking with club representatives, sponsors, and mentors.', type: 'logistics' },
          { time: '19:00', title: 'Venue Closes', desc: 'Official closing of the event. Goodbye and thank you!', type: 'logistics' },
        ],
      },
    },

    tracks: {
      tag:      '// themes',
      title:    'The 3 Challenges',
      subtitle: 'Pick your theme and build the solution that will revolutionize Romanian football',
      themes: [
        {
          number: '01',
          title:   'Smart Match Insights',
          tagline: 'Turn data into tactical decisions',
          desc:    'Build an AI system that analyzes matches and generates actionable insights: AI score per player, where the ball was lost, who broke defensive lines, what type of attack worked.',
          bullets: ['AI-powered player performance scoring', 'Heatmaps & ball possession analysis', 'Tactical pattern recognition', 'Match event detection'],
          icon: '⚽', color: '#a78bfa',
        },
        {
          number: '02',
          title:   'Transfer & Scouting Assistant',
          tagline: 'Discover talent before the competition',
          desc:    'Build an intelligent assistant that recommends players based on open squad positions, the coach\'s playing style, and compatibility with current squad members.',
          bullets: ['Player similarity matching', 'Position & style fit scoring', 'Integration with public data (Transfermarkt etc.)', 'Natural language query interface'],
          icon: '🔍', color: '#34d399',
        },
        {
          number: '03',
          title:   'Opponent Analysis',
          tagline: 'Know your opponent before kick-off',
          desc:    "Build a system that analyzes the opponent's game to prepare the team to counter — identify attack patterns, defensive vulnerabilities, and key players.",
          bullets: ['Opponent formation & style detection', 'Key player identification', 'Weakness exploitation recommendations', 'Pre-match tactical briefing generator'],
          icon: '🎯', color: '#fbbf24',
        },
      ],
    },

    submission: {
      tag:      '// submission',
      title:    'Submit Your Project',
      subtitle: 'Deadline:',
      deadline: 'Sunday, April 26 — 12:00',
      steps: [
        { num: '01', title: 'Finalize your code', desc: 'Make sure all code is committed and pushed to GitHub before 12:00 on Sunday, April 26.' },
        { num: '02', title: 'Fill in the form', desc: 'Submit your GitHub repository link, team name, chosen theme, and a short description of your solution.' },
        { num: '03', title: 'Prepare your demo', desc: 'Prepare a ~5-minute demo of your solution + Q&A with the jury, right after the deadline.' },
      ],
      repoLabel:  'Repository format:',
      rulesTitle: '📌 Important rules:',
      rules: [
        'No commits after 12:00 will be accepted',
        'The repository must be public',
        'Include a README.md with setup instructions',
        'Demo video (max 3 min) is a bonus, not required',
      ],
      btn:  '📤 Submit Project',
      note: 'The submission link will be activated on the day of the event',
    },

    gallery: {
      tag:   '// gallery',
      title: 'Community Moments',
    },

    partners: {
      tag:   '// partners',
      title: 'Partners & Supporters',
      tier1: 'Main Organizers',
      tier2: 'Supported by',
      tier3: 'Sponsors',
      sponsorCta:  'Become a Sponsor',
      sponsorDesc: 'Want to showcase your brand to 120+ tech students and professionals? Let\'s talk.',
    },

    team: {
      tag:   '// team',
      title: 'The People Behind the Event',
      volunteerCount: '30+',
      volunteerLabel: 'Volunteers',
      volunteerDesc:  'Amazing people who make the magic happen',
    },

    faq: {
      tag:   '// faq',
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Who can participate?',
          a: 'Any student or young professional aged 18–30 with programming knowledge. You do not need prior experience in AI or data science — passion and willingness to learn matter most.',
        },
        {
          q: 'How are teams formed?',
          a: 'Teams consist of 2–4 members. You can come with a pre-formed team or register individually and we will help you find teammates at the event.',
        },
        {
          q: 'What should I bring?',
          a: 'Your laptop, charger, and lots of energy! Accommodation, main meals, and snacks are provided throughout the event.',
        },
        {
          q: 'Is participation free?',
          a: 'Yes! Participation is 100% free. All you need to do is register and be selected through the application process.',
        },
        {
          q: 'What data will we use?',
          a: 'You will get access to real data from FC Universitatea Cluj — match statistics, player data, and other relevant resources. You will also receive Google Cloud credits to run AI models.',
        },
      ],
    },

    register: {
      tag:      '// register',
      title:    'Be Part of History',
      subtitle: 'Spots are limited. Secure your place in the first edition of U Hack!',
      namePlaceholder:  'Your full name',
      emailPlaceholder: 'address@email.com',
      rolePlaceholder:  'Role / Specialization (e.g. Backend Dev, Data Scientist...)',
      teamPlaceholder:  'Team name (optional — you can come alone)',
      gdpr:    'I agree to the processing of personal data in accordance with GDPR',
      btnIdle: 'Send Application',
      btnBusy: 'Sending...',
      successTitle: '✅ Application sent!',
      successMsg:   'Thank you! You will receive a confirmation email shortly.',
      errors: {
        name:  'Name is required',
        email: 'Invalid email address',
        role:  'Role is required',
        gdpr:  'You must accept the terms',
      },
    },

    footer: {
      tagline: 'Where code meets football.',
      links: ['About', 'Schedule', 'Themes', 'Submit', 'Gallery', 'Partners', 'Team', 'FAQ'],
      contact: 'Contact',
      rights:  'All rights reserved.',
      madeBy:  'Made with ❤️ by GDGoC UTCN',
    },
  },
}
