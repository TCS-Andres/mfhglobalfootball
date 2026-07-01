// MFH Global Football, i18n dictionary.
// Voice: straightforward, trustworthy, knowledgeable, warm, educational. No hype.
// Eyebrows speak into the section conversationally. Headings carry Bert's voice.
// No StoryBrand framework labels in visible copy. EN and ES are equals.
// Hard rules: MFH only (never the holdings name), no guarantees, faith only in the
// footer (plus one understated About mention), parents always in the room, no em dashes.

export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    // nav + global CTA
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.plan': 'How It Works',
    'nav.contact': 'Contact',
    'cta.consult': 'Book a Free Consultation',
    'lang.label': 'Language',
    'skip.link': 'Skip to content',

    // hero
    'hero.eyebrow': 'FIFA-Licensed Agent · South Florida & Colombia',
    'hero.h1': "We <span class='hl'>build futures</span> for players and coaches in football.",
    'hero.sub': 'A FIFA-licensed agency guiding players and parents through every decision on the road to professional football. Your future comes first.',
    'hero.cta1': 'Book a Free Consultation',
    'hero.cta2': 'See how it works',

    // trust marquee
    'strip.1': 'FIFA-Licensed Agent',
    'strip.2': 'Player & Coach Representation',
    'strip.3': 'South Florida & Colombia',
    'strip.4': 'English & Español',
    'strip.5': 'Education First',
    'strip.6': 'Parents Always Welcome',

    // the landscape (recast from "The Problem")
    'problem.eyebrow': 'Your path forward',
    'problem.h2': 'Big dreams deserve a clear path.',
    'problem.intro': 'The road to pro has real hurdles. We clear them, so you can focus on what you do best: play, grow, and chase the dream.',
    'p1.t': 'Licensed representation',
    'p1.d': 'You work with a FIFA-licensed agent who stays accountable at every step.',
    'p2.t': 'The rules, made simple',
    'p2.d': 'Work permits, quotas, and transfer windows, explained clearly so they open doors for you.',
    'p3.t': 'In your language',
    'p3.d': 'Every contract and decision explained in English or Spanish, so you always know where you stand.',
    'p4.t': 'Family first',
    'p4.d': 'Parents are always in the room, and every step is built around the player.',

    // meet bert (recast from "Your Guide")
    'guide.eyebrow': 'The person in your corner',
    'guide.h2': 'An agent who has lived every side of the game.',
    'guide.body': 'MFH was founded by Bert Mahecha, a FIFA-licensed football agent based in South Florida with deep ties to Colombia. He has played, refereed, coached, owned a club, and run a league. That full-spectrum experience is why MFH asks the right questions before a player ever boards a plane.',
    'guide.cta': 'More about Bert and MFH',
    'guide.panel': 'Why families work with MFH',
    'guide.l1': 'FIFA-licensed under the modern framework.',
    'guide.l2': 'Bilingual, English and Spanish as equals.',
    'guide.l3': 'A family business, built with his sons and cousin.',
    'guide.l4': 'Education first. Parents are always in the room.',

    // stats band (honest facts from the Master Brain)
    'stats.eyebrow': 'Experience you can count',
    'stat1.n': '5',
    'stat1.l': 'sides of the game lived: player, referee, coach, club owner, league president',
    'stat2.n': '2',
    'stat2.l': 'countries connected, South Florida and Colombia',
    'stat3.n': '3',
    'stat3.l': 'transfer windows a year, the rhythm of the work',
    'stat4.n': '2023',
    'stat4.l': "the modern FIFA framework Bert is licensed under",

    // how it works (recast from "The MFH Plan")
    'plan.eyebrow': 'How we work together',
    'plan.h2': 'Four steps, and your family is in every one.',
    's1.t': 'Book a free consultation',
    's1.d': 'In English or Spanish. Parents welcome.',
    's2.t': 'Share your footage',
    's2.d': 'Match videos and content, so the evaluation is real, even from abroad.',
    's3.t': 'Get an honest evaluation',
    's3.d': 'A clear read on your level and a personalized roadmap.',
    's4.t': 'Sign with an agent who fights for you',
    's4.d': 'Representation built on protection and education, not promises.',

    // promise (recast eyebrow from "Our Promise")
    'promise.eyebrow': 'Straight talk',
    'promise.quote': "We can't promise you a contract. <span class='hl'>We promise to open doors</span> for you to showcase your skills, to protect you through the entire process, and to make sure you understand every rule that governs your future.",

    // bridge (recast eyebrow from "The Bridge")
    'bridge.eyebrow': 'Two homes, one path',
    'bridge.h2': 'South Florida and Colombia, connected.',
    'bridge.body': 'Real relationships on both ends, bilingual and bicultural, from MLS to Liga BetPlay to Europe. This is the road we walk with you.',
    'bridge.left': 'South Florida',
    'bridge.leftd': 'A deep club ecosystem and growing player volume.',
    'bridge.right': 'Colombia',
    'bridge.rightd': 'Hungry, committed players and strong club institutions.',

    // who we work with (recast eyebrow from "Who We Help")
    'who.eyebrow': 'Who we work with',
    'who.h2': 'Built for players, families, and clubs.',
    'w1.t': 'Professional & transfer-ready players',
    'w1.d': 'Representation, negotiation, and FIFA TMS transfers, handled with regulatory care.',
    'w2.t': 'Families & aspiring players',
    'w2.d': 'Honest guidance on rights, the real odds, and what a legitimate path looks like.',
    'w3.t': 'Clubs, coaches & scouts',
    'w3.d': 'Coach placement, scouting, and referral partnerships across the Americas.',

    // services preview (recast eyebrow from "What We Do")
    'services.eyebrow': 'What representation looks like',
    'services.h2': 'Full-spectrum representation, always within the rules.',
    'services.intro': "Everything MFH does follows FIFA's framework, wrapped in an education-first, player-first approach.",
    'b1.t': 'Players',
    'b1.i': 'Professional representation · Transfers & loans (FIFA TMS) · Video-supported evaluation · Welfare & ongoing management',
    'b2.t': 'Coaches & Clubs',
    'b2.i': 'Coach representation · Club & sporting director services · Scouting · Scout & referral partnerships',
    'b3.t': 'Families & Youth',
    'b3.i': 'Youth & family advisory · Trials & showcases · Youth-to-pro pathway · Education on rights & rules',
    'services.cta': 'See all services',

    // closing CTA banner
    'cta.h2': 'Ready to take the next step?',
    'cta.sub': 'Book a free, no-pressure consultation. In English or Spanish, with your family welcome.',

    // footer
    'footer.tagline': 'Faith-Driven · Player-First · Globally Connected',
    'footer.col1': 'Explore',
    'footer.col2': 'Get in touch',
    'footer.contactLine': 'Book a free bilingual consultation.',
    'footer.verse': '"For I know the plans I have for you..."  Jeremiah 29:11',
    'footer.rights': '© 2026 MFH Global Football. All rights reserved.',
    'footer.domain': 'mfhglobal.football',

    // media slot label (swappable photo placeholders)
    'media.placeholder': 'Photo',
    'media.altCoach': 'A football coach watching players train at golden hour',
    'media.altSF': 'A soccer pitch by the water with the Miami skyline',
    'media.altColombia': 'A hillside soccer pitch in the mountains of Medellin',
    'media.altStadium': 'A professional football stadium at golden hour',
    'media.altQuote': 'A lone football player on a misty floodlit pitch at dusk',

    // parallax quote band
    'quote.small': 'Talent gets you noticed. Discipline, the right questions, and people who protect you are what build a career.',
    'quote.big': "The player's future comes first.",

    // ---------------- Services page ----------------
    'sv.title': 'Services | FIFA-Licensed Player & Coach Representation',
    'sv.metaDesc': 'FIFA-licensed representation for players, coaches, clubs, and families in South Florida and Colombia. Transfers, evaluations, welfare, scouting, and youth pathways, education first.',
    'sv.eyebrow': 'What representation looks like',
    'sv.h1': 'Full-spectrum representation, always within the rules.',
    'sv.intro': "Everything MFH does follows FIFA's framework. FIFA splits what a licensed agent does into two categories, and MFH delivers both, wrapped in an education-first, player-first approach.",
    'sv.cat1.t': 'Football Agent Services',
    'sv.cat1.d': 'The core transaction work: negotiating, communicating, and acting to help conclude a player or coach deal. This covers employment, registration, and the transfer of a player or coach between clubs.',
    'sv.cat2.t': 'Other Services',
    'sv.cat2.d': 'Everything else we do for a client beyond the transaction itself, such as scouting, advisory, off-field support, and arranging basic needs, all within FIFA rules.',

    'sv.players.h2': 'Players',
    'sv.players.eyebrow': 'When the game is your profession',
    'sv.p1.t': 'Professional Player Representation',
    'sv.p1.d': 'Full FIFA-licensed representation for professional and transfer-ready players: contract negotiation, club placement, and career guidance, within FIFA, international, national, and state law.',
    'sv.p2.t': 'Transfer & Loan Negotiation (FIFA TMS)',
    'sv.p2.d': "Transfers and loans executed through FIFA's Transfer Matching System, including the regulatory homework many skip: work permits, foreign-player quotas, and eligibility windows.",
    'sv.p3.t': 'Player Evaluation (Video-Supported)',
    'sv.p3.d': "An honest read on a player's level and prospects. Because many players are abroad, MFH evaluates through submitted match footage before or after the first consultation.",
    'sv.p4.t': 'Player Welfare & Ongoing Management',
    'sv.p4.d': 'Post-signing support: trainers to elevate specific skills, guidance when needed, and the steady hand a player wants when placed far from home.',
    'sv.p5.t': 'Commercial & Off-Field Support',
    'sv.p5.d': "Image rights, sponsorships, endorsements, public relations, and social media support as a player's profile grows.",

    'sv.coaches.h2': 'Coaches & Clubs',
    'sv.coaches.eyebrow': 'For the people who build teams',
    'sv.c1.t': 'Coach Representation',
    'sv.c1.d': 'Placement and employment negotiation for coaches with clubs, leagues, and member associations, handled within the FIFA framework.',
    'sv.c2.t': 'Club & Sporting Director Services',
    'sv.c2.d': 'Player identification, monitoring, and assessment for clubs and sporting directors, including the emerging US second and third divisions.',
    'sv.c3.t': 'Scout & Referral Partnerships',
    'sv.c3.d': 'Formal agreements with scouts who surface talent into the MFH network, built on clear terms and accountability.',

    'sv.families.h2': 'Families & Youth',
    'sv.families.eyebrow': 'For the parents in the room',
    'sv.f1.t': 'Trials & Showcases',
    'sv.f1.d': 'Organizing and facilitating trials and arranging club meetings. Opening doors is the work, never a promise of the outcome.',
    'sv.f2.t': 'Youth & Family Advisory and Education',
    'sv.f2.d': 'Guidance for parents of aspiring players: their rights, parental consent rules, the real odds of going pro, and what a legitimate path looks like. Education is a service, not a sales tactic.',
    'sv.f3.t': 'Youth-to-Pro Pathway Development',
    'sv.f3.d': 'Building the South Florida player pipeline and relationships with local clubs, so young players have a real, structured path to grow.',

    // ---------------- About page ----------------
    'ab.title': 'About Bert Mahecha | FIFA-Licensed Football Agent',
    'ab.metaDesc': 'Bert Mahecha founded MFH Global Football, a FIFA-licensed, family-built agency bridging South Florida and Colombia. Player, referee, coach, club owner, and league president.',
    'ab.eyebrow': 'The person in your corner',
    'ab.h1': 'An agent who has lived every side of the game.',
    'ab.intro': "MFH Global Football was founded by Bert Mahecha, a FIFA-licensed football agent based in South Florida with deep ties to Colombia. He guides players and families through every important decision on the road to professional football, so the player's future always comes first.",
    'ab.traj.h2': 'A full-spectrum football life.',
    'ab.traj.body': 'Bert has lived every side of the game. He played it, refereed it, coached it, owned a club, and ran a league, serving as president of the American Premier Soccer League and director of the Florida State Soccer Association. Most agents have done a fraction of that. That full-spectrum experience is why MFH asks the right questions before a player ever boards a plane.',
    'ab.lic.h2': 'FIFA-licensed under the modern framework.',
    'ab.lic.body': "Bert earned his FIFA agent license under the restructured framework in place since 2023. He describes it as an attorney-style privilege: being one of the selected people authorized to represent players within FIFA's governance. He wanted to be inside that structure, licensed and accountable, rather than among the unlicensed operators families have every reason to be wary of.",
    'ab.bil.h2': 'Bilingual, bicultural, connected.',
    'ab.bil.body': 'Colombian-American and fully bilingual, Bert works in English and Spanish as equals. MFH is built on real relationships on both ends, in South Florida and in Colombia, with the local knowledge that helps families feel understood, not processed.',
    'ab.fam.h2': 'A family business.',
    'ab.fam.body': "MFH is a family business in the most literal sense. Bert builds it alongside his sons and his cousin, and that family foundation is part of the brand's credibility, not a footnote. MFH treats client families the way it treats its own: with education, patience, and protection.",
    'ab.faith.h2': 'Faith as foundation.',
    'ab.faith.body': "Faith is the foundation of Bert's integrity and ethics, which is why MFH is described as faith-driven. It is handled quietly. It shapes the conduct, it is not a billboard, and it never asks anyone to share the same beliefs. Knowing the person guiding your family is grounded in something gives peace of mind, whatever you believe.",
    'ab.verse': '"For I know the plans I have for you..."  Jeremiah 29:11',

    // ---------------- How It Works page (the plan) ----------------
    'pl.title': 'How It Works | The Road to Professional Football',
    'pl.metaDesc': 'The four-step MFH journey and the lessons behind it. Calm, educational guidance for players and parents on the road to professional football, in English and Spanish.',
    'pl.eyebrow': 'How we work together',
    'pl.h1': 'Four steps, and your family is in every one.',
    'pl.intro': 'The road to professional football is full of decisions and opportunities. We keep it simple, and we keep parents in the room from the first conversation.',
    'pl.s1.t': 'Book a free consultation',
    'pl.s1.d': 'In English or Spanish, with parents welcome. We listen first and answer your questions honestly.',
    'pl.s2.t': 'Share your footage',
    'pl.s2.d': 'Send match videos and content through a link, so the evaluation is real, even from abroad. No video upload needed.',
    'pl.s3.t': 'Get an honest evaluation and a roadmap',
    'pl.s3.d': 'A clear read on your level and prospects, and a personalized roadmap for what comes next.',
    'pl.s4.t': 'Sign with an agent who fights for your future',
    'pl.s4.d': "Representation built on protection and education, not promises. The player's future always comes first.",
    'pl.stories.eyebrow': 'Lessons from the game',
    'pl.stories.h2': 'What it really takes to make it.',
    'pl.stories.intro': 'Stories Bert shares with families, about setting yourself up to win.',
    'pl.story1.t': 'Hunger fuels the dream',
    'pl.story1.d': 'In Medellin, committed young players train three times a day because they want it with everything. That hunger is what turns talent into a career. When you want it that much, you give yourself the very best shot.',
    'pl.story2.t': 'The right questions open doors',
    'pl.story2.d': 'Before a player travels for a tryout, MFH checks the details that decide whether a move can actually happen, like work permits and eligibility. Do the homework first, and the door stays open when your moment comes.',
    'pl.story3.t': 'Know your options',
    'pl.story3.d': 'Some choices, like signing professionally at sixteen, can affect college eligibility later. Understanding your options before you decide keeps every door within reach, so you choose the path that fits your dream.',

    // ---------------- Contact page ----------------
    'ct.title': 'Contact | Book a Free Bilingual Consultation',
    'ct.metaDesc': 'Book a free bilingual consultation with MFH Global Football, or share your footage by link. FIFA-licensed representation in South Florida and Colombia. English or Spanish.',
    'ct.eyebrow': "Let's talk",
    'ct.h1': 'Let us talk about your future in football.',
    'ct.intro': 'Booking a consultation is free and there is no pressure. In English or Spanish, with your family welcome.',
    'ct.book.h2': 'Book a free consultation',
    'ct.book.d': 'Tell us a little about the player and we will reach out to schedule a call. Parents are welcome and encouraged.',
    'ct.book.fallback': 'Prefer email? Write to us and we will set up a time that works for your family.',
    'ct.book.button': 'Email us to book',
    'ct.footage.h2': 'Share your footage',
    'ct.footage.d': 'Send a link to match videos on Google Drive or YouTube, so the evaluation is real, even from abroad. Please do not upload video files, a link is all we need.',
    'ct.f.name': 'Player or parent name',
    'ct.f.email': 'Email or phone',
    'ct.f.age': 'Age group',
    'ct.f.position': 'Position',
    'ct.f.link': 'Footage link (Google Drive or YouTube)',
    'ct.f.message': 'Anything else we should know',
    'ct.f.submit': 'Send footage link',
    'ct.f.required': 'Required',
    'ct.f.linkHelp': 'Paste a full URL that starts with https://',
    'ct.details.h2': 'Contact details',
    'ct.details.location': 'South Florida, USA, with deep ties to Colombia.',
    'ct.details.langs': 'We work in English and Spanish as equals.',
  },
  es: {
    // nav + global CTA
    'nav.services': 'Servicios',
    'nav.about': 'Quiénes Somos',
    'nav.plan': 'Cómo Funciona',
    'nav.contact': 'Contacto',
    'cta.consult': 'Agenda una Consulta Gratis',
    'lang.label': 'Idioma',
    'skip.link': 'Saltar al contenido',

    // hero
    'hero.eyebrow': 'Agente con Licencia FIFA · Sur de la Florida y Colombia',
    'hero.h1': "<span class='hl'>Construimos futuros</span> para jugadores y entrenadores en el fútbol.",
    'hero.sub': 'Una agencia con licencia FIFA que acompaña a jugadores y padres en cada decisión del camino al fútbol profesional. Tu futuro va primero.',
    'hero.cta1': 'Agenda una Consulta Gratis',
    'hero.cta2': 'Conoce cómo funciona',

    // trust marquee
    'strip.1': 'Agente con Licencia FIFA',
    'strip.2': 'Representación de Jugadores y Entrenadores',
    'strip.3': 'Sur de la Florida y Colombia',
    'strip.4': 'English & Español',
    'strip.5': 'La Educación Primero',
    'strip.6': 'Padres Siempre Bienvenidos',

    // the landscape
    'problem.eyebrow': 'Tu camino hacia adelante',
    'problem.h2': 'Los grandes sueños merecen un camino claro.',
    'problem.intro': 'El camino al profesionalismo tiene obstáculos reales. Nosotros los despejamos, para que te concentres en lo que mejor haces: jugar, crecer y perseguir el sueño.',
    'p1.t': 'Representación con licencia',
    'p1.d': 'Trabajas con un agente con licencia FIFA que responde en cada paso.',
    'p2.t': 'Las reglas, claras',
    'p2.d': 'Permisos de trabajo, cupos y ventanas de transferencia, explicados con claridad para que te abran puertas.',
    'p3.t': 'En tu idioma',
    'p3.d': 'Cada contrato y decisión, explicados en inglés o español, para que siempre sepas dónde estás.',
    'p4.t': 'La familia primero',
    'p4.d': 'Los padres siempre están presentes, y cada paso se construye alrededor del jugador.',

    // meet bert
    'guide.eyebrow': 'Quien está en tu esquina',
    'guide.h2': 'Un agente que ha vivido cada lado del juego.',
    'guide.body': 'MFH fue fundada por Bert Mahecha, agente de fútbol con licencia FIFA radicado en el Sur de la Florida y con raíces profundas en Colombia. Ha jugado, arbitrado, dirigido, sido dueño de un club y administrado una liga. Esa experiencia completa es la razón por la que MFH hace las preguntas correctas antes de que un jugador suba a un avión.',
    'guide.cta': 'Más sobre Bert y MFH',
    'guide.panel': 'Por qué las familias trabajan con MFH',
    'guide.l1': 'Licencia FIFA bajo el marco actual.',
    'guide.l2': 'Bilingüe, inglés y español por igual.',
    'guide.l3': 'Una empresa familiar, construida junto a sus hijos y su primo.',
    'guide.l4': 'La educación primero. Los padres siempre están presentes.',

    // stats band
    'stats.eyebrow': 'Experiencia que se nota',
    'stat1.n': '5',
    'stat1.l': 'lados del juego vividos: jugador, árbitro, entrenador, dueño de club, presidente de liga',
    'stat2.n': '2',
    'stat2.l': 'países conectados, el Sur de la Florida y Colombia',
    'stat3.n': '3',
    'stat3.l': 'ventanas de transferencia al año, el ritmo del trabajo',
    'stat4.n': '2023',
    'stat4.l': 'el marco moderno de la FIFA bajo el que Bert tiene licencia',

    // how it works
    'plan.eyebrow': 'Cómo trabajamos juntos',
    'plan.h2': 'Cuatro pasos, y tu familia está en cada uno.',
    's1.t': 'Agenda una consulta gratis',
    's1.d': 'En inglés o español. Padres bienvenidos.',
    's2.t': 'Comparte tu material',
    's2.d': 'Videos de partidos y contenido, para que la evaluación sea real, incluso desde el exterior.',
    's3.t': 'Recibe una evaluación honesta',
    's3.d': 'Una lectura clara de tu nivel y una hoja de ruta personalizada.',
    's4.t': 'Firma con un agente que pelea por ti',
    's4.d': 'Representación construida sobre protección y educación, no sobre promesas.',

    // promise
    'promise.eyebrow': 'Hablando claro',
    'promise.quote': "No podemos prometerte un contrato. <span class='hl'>Prometemos abrirte puertas</span> para que muestres tu talento, protegerte durante todo el proceso y asegurarnos de que entiendas cada regla que rige tu futuro.",

    // bridge
    'bridge.eyebrow': 'Dos hogares, un camino',
    'bridge.h2': 'El Sur de la Florida y Colombia, conectados.',
    'bridge.body': 'Relaciones reales en ambos extremos, bilingües y biculturales, desde la MLS hasta la Liga BetPlay y Europa. Este es el camino que recorremos contigo.',
    'bridge.left': 'Sur de la Florida',
    'bridge.leftd': 'Un ecosistema de clubes profundo y un volumen de jugadores en crecimiento.',
    'bridge.right': 'Colombia',
    'bridge.rightd': 'Jugadores hambrientos y comprometidos, e instituciones de clubes sólidas.',

    // who we work with
    'who.eyebrow': 'Con quién trabajamos',
    'who.h2': 'Hecho para jugadores, familias y clubes.',
    'w1.t': 'Jugadores profesionales y listos para transferencia',
    'w1.d': 'Representación, negociación y transferencias por FIFA TMS, con rigor regulatorio.',
    'w2.t': 'Familias y jugadores en formación',
    'w2.d': 'Orientación honesta sobre derechos, las probabilidades reales y cómo es un camino legítimo.',
    'w3.t': 'Clubes, entrenadores y buscadores',
    'w3.d': 'Colocación de entrenadores, scouting y alianzas de referidos en las Américas.',

    // services preview
    'services.eyebrow': 'Cómo es la representación',
    'services.h2': 'Representación integral, siempre dentro de las reglas.',
    'services.intro': 'Todo lo que hace MFH sigue el marco de la FIFA, con un enfoque que pone la educación y al jugador primero.',
    'b1.t': 'Jugadores',
    'b1.i': 'Representación profesional · Transferencias y préstamos (FIFA TMS) · Evaluación con video · Bienestar y gestión continua',
    'b2.t': 'Entrenadores y Clubes',
    'b2.i': 'Representación de entrenadores · Servicios para clubes y directores deportivos · Scouting · Alianzas de buscadores y referidos',
    'b3.t': 'Familias y Juventud',
    'b3.i': 'Asesoría para familias · Pruebas y vitrinas · Camino de juventud a profesional · Educación sobre derechos y reglas',
    'services.cta': 'Ver todos los servicios',

    // closing CTA banner
    'cta.h2': '¿Listo para dar el siguiente paso?',
    'cta.sub': 'Agenda una consulta gratis y sin presión. En inglés o español, con tu familia bienvenida.',

    // footer
    'footer.tagline': 'Guiados por la Fe · El Jugador Primero · Conexión Global',
    'footer.col1': 'Explora',
    'footer.col2': 'Contáctanos',
    'footer.contactLine': 'Agenda una consulta bilingüe gratis.',
    'footer.verse': '"Porque yo sé los planes que tengo para ustedes..."  Jeremías 29:11',
    'footer.rights': '© 2026 MFH Global Football. Todos los derechos reservados.',
    'footer.domain': 'mfhglobal.football',

    'media.placeholder': 'Foto',
    'media.altCoach': 'Un entrenador de fútbol observando a jugadores entrenar al atardecer',
    'media.altSF': 'Una cancha de fútbol junto al agua con el horizonte de Miami',
    'media.altColombia': 'Una cancha de fútbol en una ladera de las montañas de Medellín',
    'media.altStadium': 'Un estadio de fútbol profesional al atardecer',
    'media.altQuote': 'Un jugador de fútbol solo en una cancha iluminada y con niebla al anochecer',

    // parallax quote band
    'quote.small': 'El talento te hace notar. La disciplina, las preguntas correctas y quienes te protegen son lo que construye una carrera.',
    'quote.big': 'El futuro del jugador va primero.',

    // ---------------- Services page ----------------
    'sv.title': 'Servicios | Representación de Jugadores y Entrenadores con Licencia FIFA',
    'sv.metaDesc': 'Representación con licencia FIFA para jugadores, entrenadores, clubes y familias en el Sur de la Florida y Colombia. Transferencias, evaluaciones, bienestar, scouting y caminos juveniles, la educación primero.',
    'sv.eyebrow': 'Cómo es la representación',
    'sv.h1': 'Representación integral, siempre dentro de las reglas.',
    'sv.intro': 'Todo lo que hace MFH sigue el marco de la FIFA. La FIFA divide lo que hace un agente con licencia en dos categorías, y MFH ofrece ambas, con un enfoque que pone la educación y al jugador primero.',
    'sv.cat1.t': 'Servicios de Agente de Fútbol',
    'sv.cat1.d': 'El trabajo central de la transacción: negociar, comunicar y actuar para ayudar a concretar el acuerdo de un jugador o entrenador. Cubre el empleo, el registro y la transferencia de un jugador o entrenador entre clubes.',
    'sv.cat2.t': 'Otros Servicios',
    'sv.cat2.d': 'Todo lo demás que hacemos para un cliente más allá de la transacción, como scouting, asesoría, apoyo fuera del campo y la gestión de necesidades básicas, siempre dentro de las reglas de la FIFA.',

    'sv.players.h2': 'Jugadores',
    'sv.players.eyebrow': 'Cuando el juego es tu profesión',
    'sv.p1.t': 'Representación Profesional de Jugadores',
    'sv.p1.d': 'Representación completa con licencia FIFA para jugadores profesionales y listos para transferencia: negociación de contratos, colocación en clubes y orientación de carrera, dentro de la ley FIFA, internacional, nacional y estatal.',
    'sv.p2.t': 'Negociación de Transferencias y Préstamos (FIFA TMS)',
    'sv.p2.d': 'Transferencias y préstamos ejecutados a través del Sistema de Coincidencia de Transferencias de la FIFA, incluyendo la tarea regulatoria que muchos omiten: permisos de trabajo, cupos de extranjeros y ventanas de elegibilidad.',
    'sv.p3.t': 'Evaluación de Jugadores (con Video)',
    'sv.p3.d': 'Una lectura honesta del nivel y las posibilidades de un jugador. Como muchos jugadores están en el exterior, MFH evalúa con material de partidos enviado antes o después de la primera consulta.',
    'sv.p4.t': 'Bienestar y Gestión Continua del Jugador',
    'sv.p4.d': 'Apoyo después de la firma: entrenadores para elevar habilidades específicas, orientación cuando se necesita, y el acompañamiento que un jugador quiere cuando está lejos de casa.',
    'sv.p5.t': 'Apoyo Comercial y Fuera del Campo',
    'sv.p5.d': 'Derechos de imagen, patrocinios, endosos, relaciones públicas y apoyo en redes sociales a medida que crece el perfil del jugador.',

    'sv.coaches.h2': 'Entrenadores y Clubes',
    'sv.coaches.eyebrow': 'Para quienes construyen equipos',
    'sv.c1.t': 'Representación de Entrenadores',
    'sv.c1.d': 'Colocación y negociación de empleo para entrenadores con clubes, ligas y asociaciones miembro, dentro del marco de la FIFA.',
    'sv.c2.t': 'Servicios para Clubes y Directores Deportivos',
    'sv.c2.d': 'Identificación, seguimiento y evaluación de jugadores para clubes y directores deportivos, incluyendo las nuevas segunda y tercera divisiones de Estados Unidos.',
    'sv.c3.t': 'Alianzas de Buscadores y Referidos',
    'sv.c3.d': 'Acuerdos formales con buscadores que llevan talento a la red de MFH, construidos sobre términos claros y responsabilidad.',

    'sv.families.h2': 'Familias y Juventud',
    'sv.families.eyebrow': 'Para los padres presentes',
    'sv.f1.t': 'Pruebas y Vitrinas',
    'sv.f1.d': 'Organización de pruebas y coordinación de reuniones con clubes. Abrir puertas es el trabajo, nunca una promesa del resultado.',
    'sv.f2.t': 'Asesoría y Educación para Familias y Juventud',
    'sv.f2.d': 'Orientación para padres de jugadores en formación: sus derechos, las reglas de consentimiento parental, las probabilidades reales de llegar al profesionalismo y cómo es un camino legítimo. La educación es un servicio, no una táctica de venta.',
    'sv.f3.t': 'Desarrollo del Camino de Juventud a Profesional',
    'sv.f3.d': 'Construir la cantera de jugadores del Sur de la Florida y las relaciones con clubes locales, para que los jóvenes tengan un camino real y estructurado para crecer.',

    // ---------------- About page ----------------
    'ab.title': 'Sobre Bert Mahecha | Agente de Fútbol con Licencia FIFA',
    'ab.metaDesc': 'Bert Mahecha fundó MFH Global Football, una agencia familiar con licencia FIFA que conecta el Sur de la Florida y Colombia. Jugador, árbitro, entrenador, dueño de club y presidente de liga.',
    'ab.eyebrow': 'Quien está en tu esquina',
    'ab.h1': 'Un agente que ha vivido cada lado del juego.',
    'ab.intro': 'MFH Global Football fue fundada por Bert Mahecha, agente de fútbol con licencia FIFA radicado en el Sur de la Florida y con raíces profundas en Colombia. Acompaña a jugadores y familias en cada decisión importante del camino al fútbol profesional, para que el futuro del jugador siempre esté primero.',
    'ab.traj.h2': 'Una vida completa en el fútbol.',
    'ab.traj.body': 'Bert ha vivido cada lado del juego. Lo jugó, lo arbitró, lo dirigió, fue dueño de un club y administró una liga, como presidente de la American Premier Soccer League y director de la Florida State Soccer Association. La mayoría de los agentes ha hecho una fracción de eso. Esa experiencia completa es la razón por la que MFH hace las preguntas correctas antes de que un jugador suba a un avión.',
    'ab.lic.h2': 'Licencia FIFA bajo el marco actual.',
    'ab.lic.body': 'Bert obtuvo su licencia de agente FIFA bajo el marco reestructurado vigente desde 2023. La describe como un privilegio al estilo de un abogado: ser una de las personas seleccionadas y autorizadas para representar jugadores dentro de la gobernanza de la FIFA. Quiso estar dentro de esa estructura, con licencia y responsabilidad, y no entre los operadores sin licencia de los que las familias tienen toda la razón de desconfiar.',
    'ab.bil.h2': 'Bilingüe, bicultural, conectado.',
    'ab.bil.body': 'Colombiano-americano y totalmente bilingüe, Bert trabaja en inglés y español por igual. MFH se construye sobre relaciones reales en ambos extremos, en el Sur de la Florida y en Colombia, con el conocimiento local que ayuda a las familias a sentirse comprendidas, no procesadas.',
    'ab.fam.h2': 'Una empresa familiar.',
    'ab.fam.body': 'MFH es una empresa familiar en el sentido más literal. Bert la construye junto a sus hijos y su primo, y esa base familiar es parte de la credibilidad de la marca, no una nota al pie. MFH trata a las familias de sus clientes como trata a la suya: con educación, paciencia y protección.',
    'ab.faith.h2': 'La fe como base.',
    'ab.faith.body': 'La fe es la base de la integridad y la ética de Bert, por eso MFH se describe como guiada por la fe. Se maneja con discreción. Da forma a la conducta, no es un cartel publicitario, y nunca le pide a nadie que comparta las mismas creencias. Saber que la persona que guía a tu familia está afianzada en algo da tranquilidad, sea cual sea tu creencia.',
    'ab.verse': '"Porque yo sé los planes que tengo para ustedes..."  Jeremías 29:11',

    // ---------------- How It Works page ----------------
    'pl.title': 'Cómo Funciona | El Camino al Fútbol Profesional',
    'pl.metaDesc': 'Los cuatro pasos del camino MFH y las lecciones detrás de ellos. Orientación calmada y educativa para jugadores y padres en el camino al fútbol profesional, en inglés y español.',
    'pl.eyebrow': 'Cómo trabajamos juntos',
    'pl.h1': 'Cuatro pasos, y tu familia está en cada uno.',
    'pl.intro': 'El camino al fútbol profesional está lleno de decisiones y oportunidades. Lo mantenemos simple, y mantenemos a los padres presentes desde la primera conversación.',
    'pl.s1.t': 'Agenda una consulta gratis',
    'pl.s1.d': 'En inglés o español, con padres bienvenidos. Escuchamos primero y respondemos tus preguntas con honestidad.',
    'pl.s2.t': 'Comparte tu material',
    'pl.s2.d': 'Envía videos de partidos y contenido por un enlace, para que la evaluación sea real, incluso desde el exterior. No necesitas subir videos.',
    'pl.s3.t': 'Recibe una evaluación honesta y una hoja de ruta',
    'pl.s3.d': 'Una lectura clara de tu nivel y tus posibilidades, y una hoja de ruta personalizada para lo que sigue.',
    'pl.s4.t': 'Firma con un agente que pelea por tu futuro',
    'pl.s4.d': 'Representación construida sobre protección y educación, no sobre promesas. El futuro del jugador siempre está primero.',
    'pl.stories.eyebrow': 'Lecciones del juego',
    'pl.stories.h2': 'Lo que de verdad se necesita para lograrlo.',
    'pl.stories.intro': 'Historias que Bert comparte con las familias, sobre cómo prepararte para ganar.',
    'pl.story1.t': 'El hambre impulsa el sueño',
    'pl.story1.d': 'En Medellín, jóvenes comprometidos entrenan tres veces al día porque lo quieren con todo. Esa hambre es la que convierte el talento en una carrera. Cuando lo deseas así de fuerte, te das la mejor oportunidad.',
    'pl.story2.t': 'Las preguntas correctas abren puertas',
    'pl.story2.d': 'Antes de que un jugador viaje a una prueba, MFH revisa los detalles que definen si el paso puede darse, como permisos de trabajo y elegibilidad. Haz la tarea primero, y la puerta queda abierta cuando llegue tu momento.',
    'pl.story3.t': 'Conoce tus opciones',
    'pl.story3.d': 'Algunas decisiones, como firmar como profesional a los dieciséis, pueden afectar la elegibilidad universitaria más adelante. Entender tus opciones antes de decidir mantiene cada puerta a tu alcance, para que elijas el camino que se ajuste a tu sueño.',

    // ---------------- Contact page ----------------
    'ct.title': 'Contacto | Agenda una Consulta Bilingüe Gratis',
    'ct.metaDesc': 'Agenda una consulta bilingüe gratis con MFH Global Football, o comparte tu material por enlace. Representación con licencia FIFA en el Sur de la Florida y Colombia. En inglés o español.',
    'ct.eyebrow': 'Hablemos',
    'ct.h1': 'Hablemos de tu futuro en el fútbol.',
    'ct.intro': 'Agendar una consulta es gratis y sin presión. En inglés o español, con tu familia bienvenida.',
    'ct.book.h2': 'Agenda una consulta gratis',
    'ct.book.d': 'Cuéntanos un poco sobre el jugador y te contactaremos para coordinar una llamada. Los padres son bienvenidos y los invitamos a participar.',
    'ct.book.fallback': '¿Prefieres correo? Escríbenos y coordinamos un horario que funcione para tu familia.',
    'ct.book.button': 'Escríbenos para agendar',
    'ct.footage.h2': 'Comparte tu material',
    'ct.footage.d': 'Envía un enlace a videos de partidos en Google Drive o YouTube, para que la evaluación sea real, incluso desde el exterior. Por favor no subas archivos de video, solo necesitamos un enlace.',
    'ct.f.name': 'Nombre del jugador o del padre',
    'ct.f.email': 'Correo o teléfono',
    'ct.f.age': 'Categoría de edad',
    'ct.f.position': 'Posición',
    'ct.f.link': 'Enlace del material (Google Drive o YouTube)',
    'ct.f.message': 'Algo más que debamos saber',
    'ct.f.submit': 'Enviar enlace del material',
    'ct.f.required': 'Obligatorio',
    'ct.f.linkHelp': 'Pega una URL completa que comience con https://',
    'ct.details.h2': 'Datos de contacto',
    'ct.details.location': 'Sur de la Florida, EE. UU., con raíces profundas en Colombia.',
    'ct.details.langs': 'Trabajamos en inglés y español por igual.',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

/** Returns the string for a locale, falling back to the key if missing. */
export function t(lang: Lang, key: string): string {
  const dict = ui[lang] as Record<string, string>;
  const fallback = ui[defaultLang] as Record<string, string>;
  return dict[key] ?? fallback[key] ?? key;
}

/**
 * Build a locale aware href from a canonical English path.
 * English serves with no prefix, Spanish under /es/.
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+/, '');
  if (lang === defaultLang) return clean;
  if (clean === '/') return '/es/';
  return '/es' + clean;
}

/** Read the active locale from an Astro URL pathname. */
export function getLangFromPath(pathname: string): Lang {
  return pathname.startsWith('/es/') || pathname === '/es' ? 'es' : 'en';
}

/** Given the current pathname, return the equivalent path in the other locale. */
export function toggledPath(pathname: string): { en: string; es: string } {
  const isEs = pathname.startsWith('/es/') || pathname === '/es';
  let canonical = pathname;
  if (isEs) canonical = pathname.replace(/^\/es/, '') || '/';
  if (!canonical.startsWith('/')) canonical = '/' + canonical;
  return {
    en: localizePath(canonical, 'en'),
    es: localizePath(canonical, 'es'),
  };
}
