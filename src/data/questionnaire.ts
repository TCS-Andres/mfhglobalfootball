// MFH Player Intake Questionnaire schema.
// Maps 1:1 to the fillable PDF template (public/docs/player-intake-template.pdf),
// whose AcroForm fields are named q1..q51 (text) and qN_0/qN_1/qN_2 (Off/Yes checkboxes).
// Bilingual EN/ES per the source template. Coach version is a future addition.

export type QType = 'text' | 'textarea' | 'date' | 'tel' | 'email' | 'number' | 'url' | 'radio';

export interface QOption {
  v: string;
  en: string;
  es: string;
  pdf: string; // checkbox field that gets checked ("Yes") for this option
}

export interface QField {
  id: string; // q1..q51
  type: QType;
  en: string;
  es: string;
  pdf?: string; // text field name (text/date/etc.); omit for radio (uses option.pdf)
  opts?: QOption[]; // for radio
  required?: boolean;
  help?: { en: string; es: string };
  // Show this field only when another field's value is in `in`.
  cond?: { field: string; in: string[] };
  computed?: 'age'; // q3: auto-calculated from q2 (DOB)
}

export interface QSection {
  id: string;
  en: string;
  es: string;
  guardianBlock?: boolean; // whole section (or its guardian fields) gated on age < 18 handled per-field via cond too
  fields: QField[];
}

const yesNo = (n: number): QOption[] => [
  { v: 'yes', en: 'Yes', es: 'Sí', pdf: `q${n}_0` },
  { v: 'no', en: 'No', es: 'No', pdf: `q${n}_1` },
];

export const SECTIONS: QSection[] = [
  {
    id: 's1',
    en: 'Personal information',
    es: 'Información personal',
    fields: [
      { id: 'q1', type: 'text', pdf: 'q1', required: true, en: 'Full legal name', es: 'Nombre legal completo' },
      { id: 'q2', type: 'date', pdf: 'q2', required: true, en: 'Date of birth', es: 'Fecha de nacimiento' },
      { id: 'q3', type: 'number', pdf: 'q3', computed: 'age', en: 'Age', es: 'Edad', help: { en: 'Calculated from your date of birth.', es: 'Se calcula a partir de tu fecha de nacimiento.' } },
      { id: 'q4', type: 'text', pdf: 'q4', required: true, en: 'Current city & country of residence', es: 'Ciudad y país de residencia actual' },
      { id: 'q5', type: 'tel', pdf: 'q5', required: true, en: 'Phone / WhatsApp number', es: 'Teléfono / número de WhatsApp' },
      { id: 'q6', type: 'email', pdf: 'q6', required: true, en: 'Email address', es: 'Correo electrónico' },
    ],
  },
  {
    id: 's2',
    en: 'Nationality, eligibility & guardian info',
    es: 'Nacionalidad, elegibilidad e información del tutor',
    fields: [
      { id: 'q7', type: 'text', pdf: 'q7', en: 'What country/countries do you hold citizenship with?', es: '¿De qué país o países tienes ciudadanía?' },
      { id: 'q8', type: 'text', pdf: 'q8', en: 'What country were you born in?', es: '¿En qué país naciste?' },
      { id: 'q9', type: 'text', pdf: 'q9', en: 'What countries were your parents born in?', es: '¿En qué países nacieron tus padres?' },
      { id: 'q10', type: 'text', pdf: 'q10', en: 'What countries were your grandparents born in?', es: '¿En qué países nacieron tus abuelos?' },
      { id: 'q11', type: 'textarea', pdf: 'q11', en: 'Do you hold more than one passport? If yes, list all.', es: '¿Tienes más de un pasaporte? Si es así, indícalos todos.' },
      // Guardian block: only shown when age (q3) is under 18.
      { id: 'q12', type: 'text', pdf: 'q12', cond: { field: 'minor', in: ['yes'] }, en: 'Full name of Parent/Guardian #1', es: 'Nombre completo del padre/madre/tutor #1' },
      { id: 'q13', type: 'radio', pdf: 'q13', cond: { field: 'minor', in: ['yes'] }, en: 'Relationship to player', es: 'Relación con el jugador', opts: [
        { v: 'Mother', en: 'Mother', es: 'Madre', pdf: '' },
        { v: 'Father', en: 'Father', es: 'Padre', pdf: '' },
        { v: 'Legal Guardian', en: 'Legal Guardian', es: 'Tutor legal', pdf: '' },
      ] },
      { id: 'q14', type: 'tel', pdf: 'q14', cond: { field: 'minor', in: ['yes'] }, en: 'Phone/WhatsApp of Parent/Guardian #1', es: 'Teléfono/WhatsApp del padre/madre/tutor #1' },
      { id: 'q15', type: 'email', pdf: 'q15', cond: { field: 'minor', in: ['yes'] }, en: 'Email of Parent/Guardian #1', es: 'Correo del padre/madre/tutor #1' },
      { id: 'q16', type: 'text', pdf: 'q16', cond: { field: 'minor', in: ['yes'] }, en: 'Full name of Parent/Guardian #2 (if applicable)', es: 'Nombre completo del padre/madre/tutor #2 (si aplica)' },
      { id: 'q17', type: 'radio', pdf: 'q17', cond: { field: 'minor', in: ['yes'] }, en: 'Relationship to player (#2)', es: 'Relación con el jugador (#2)', opts: [
        { v: 'Mother', en: 'Mother', es: 'Madre', pdf: '' },
        { v: 'Father', en: 'Father', es: 'Padre', pdf: '' },
        { v: 'Legal Guardian', en: 'Legal Guardian', es: 'Tutor legal', pdf: '' },
      ] },
      { id: 'q18', type: 'tel', pdf: 'q18', cond: { field: 'minor', in: ['yes'] }, en: 'Phone/WhatsApp of Parent/Guardian #2', es: 'Teléfono/WhatsApp del padre/madre/tutor #2' },
      { id: 'q19', type: 'email', pdf: 'q19', cond: { field: 'minor', in: ['yes'] }, en: 'Email of Parent/Guardian #2', es: 'Correo del padre/madre/tutor #2' },
      { id: 'q20', type: 'radio', cond: { field: 'minor', in: ['yes'] }, opts: yesNo(20), en: 'Do both parents/guardians consent to representation discussions?', es: '¿Ambos padres/tutores dan su consentimiento para las conversaciones de representación?' },
      { id: 'q21', type: 'text', pdf: 'q21', cond: { field: 'minor', in: ['yes'] }, en: 'Country of residence of parents/guardians (if different from player)', es: 'País de residencia de los padres/tutores (si es diferente al del jugador)' },
    ],
  },
  {
    id: 's3',
    en: 'Playing profile',
    es: 'Perfil de juego',
    fields: [
      { id: 'q22', type: 'text', pdf: 'q22', required: true, en: 'Primary position', es: 'Posición principal' },
      { id: 'q23', type: 'text', pdf: 'q23', en: 'Secondary position (if any)', es: 'Posición secundaria (si aplica)' },
      { id: 'q24', type: 'text', pdf: 'q24', en: 'Height & weight', es: 'Estatura y peso' },
      { id: 'q25', type: 'radio', en: 'Dominant foot', es: 'Pie dominante', opts: [
        { v: 'Right', en: 'Right', es: 'Derecho', pdf: 'q25_0' },
        { v: 'Left', en: 'Left', es: 'Izquierdo', pdf: 'q25_1' },
        { v: 'Both', en: 'Both', es: 'Ambos', pdf: 'q25_2' },
      ] },
      { id: 'q26', type: 'url', pdf: 'q26', en: 'Highlight reel / player profile video link (YouTube, Hudl, Wyscout, etc.)', es: 'Enlace a video de resumen / perfil del jugador (YouTube, Hudl, Wyscout, etc.)' },
    ],
  },
  {
    id: 's4',
    en: 'Club & career history',
    es: 'Historial de clubes y carrera',
    fields: [
      { id: 'q27', type: 'text', pdf: 'q27', en: 'Name of current or most recent club', es: 'Nombre del club actual o más reciente' },
      { id: 'q28', type: 'text', pdf: 'q28', en: 'League name and division/level', es: 'Nombre de la liga y división/nivel' },
      { id: 'q29', type: 'text', pdf: 'q29', en: 'Country of league', es: 'País de la liga' },
      { id: 'q30', type: 'text', pdf: 'q30', en: 'Season/years active at this club', es: 'Temporada/años activo en este club' },
      { id: 'q31', type: 'number', pdf: 'q31', en: 'Approximate number of appearances', es: 'Número aproximado de partidos jugados' },
      { id: 'q32', type: 'text', pdf: 'q32', en: 'Goals/Assists (if applicable)', es: 'Goles/Asistencias (si aplica)' },
      { id: 'q33', type: 'text', pdf: 'q33', en: 'Current or last salary received (monthly or annual)', es: 'Salario actual o último recibido (mensual o anual)' },
      { id: 'q34', type: 'text', pdf: 'q34', en: 'Currency of salary paid', es: 'Moneda en que se paga el salario' },
    ],
  },
  {
    id: 's5',
    en: 'Contract & transfer status',
    es: 'Estado de contrato y traspaso',
    fields: [
      { id: 'q35', type: 'radio', opts: yesNo(35), required: true, en: 'Are you currently under a signed contract with a club?', es: '¿Tienes actualmente un contrato firmado con un club?' },
      { id: 'q36', type: 'date', pdf: 'q36', cond: { field: 'q35', in: ['yes'] }, en: 'Contract expiration date', es: 'Fecha de vencimiento del contrato' },
      { id: 'releaseClause', type: 'radio', opts: [
        { v: 'yes', en: 'Yes', es: 'Sí', pdf: '' },
        { v: 'no', en: 'No', es: 'No', pdf: '' },
      ], en: 'Is there a release clause?', es: '¿Existe una cláusula de rescisión?' },
      { id: 'q37', type: 'text', pdf: 'q37', cond: { field: 'releaseClause', in: ['yes'] }, en: 'Release clause amount', es: 'Monto de la cláusula de rescisión' },
      { id: 'q38', type: 'radio', opts: yesNo(38), en: 'Are you currently a free agent?', es: '¿Eres actualmente agente libre?' },
      { id: 'q39', type: 'radio', opts: yesNo(39), en: 'Are you open to a loan arrangement?', es: '¿Estás abierto a una cesión (préstamo)?' },
      { id: 'q40', type: 'radio', en: 'Interested in domestic transfer, international transfer, or both?', es: '¿Te interesa un traspaso nacional, internacional o ambos?', opts: [
        { v: 'Domestic', en: 'Domestic', es: 'Nacional', pdf: 'q40_0' },
        { v: 'International', en: 'International', es: 'Internacional', pdf: 'q40_1' },
        { v: 'Both', en: 'Both', es: 'Ambos', pdf: 'q40_2' },
      ] },
    ],
  },
  {
    id: 's6',
    en: 'Current representation',
    es: 'Representación actual',
    fields: [
      { id: 'q41', type: 'radio', opts: yesNo(41), required: true, en: 'Do you currently have a football agent or representative?', es: '¿Tienes actualmente un agente o representante de fútbol?' },
      { id: 'q42', type: 'text', pdf: 'q42', cond: { field: 'q41', in: ['yes'] }, en: 'Full name of your agent or representative', es: 'Nombre completo de tu agente o representante' },
      { id: 'q43', type: 'text', pdf: 'q43', cond: { field: 'q41', in: ['yes'] }, en: 'Name of their agency (if applicable)', es: 'Nombre de su agencia (si aplica)' },
      { id: 'q44', type: 'radio', cond: { field: 'q41', in: ['yes'] }, en: 'Is it a formal written agreement or informal?', es: '¿Es un acuerdo formal por escrito o informal?', opts: [
        { v: 'Formal', en: 'Formal (written)', es: 'Formal (por escrito)', pdf: 'q44_0' },
        { v: 'Informal', en: 'Informal', es: 'Informal', pdf: 'q44_1' },
      ] },
      { id: 'q45', type: 'date', pdf: 'q45', cond: { field: 'q41', in: ['yes'] }, en: 'When does that agreement expire?', es: '¿Cuándo vence ese acuerdo?' },
      { id: 'q46', type: 'radio', opts: yesNo(46), en: 'Have you ever had a FIFA-licensed agent represent you?', es: '¿Alguna vez te ha representado un agente con licencia FIFA?' },
      { id: 'q47', type: 'text', pdf: 'q47', cond: { field: 'q46', in: ['yes'] }, en: 'What was the name of that agent?', es: '¿Cuál era el nombre de ese agente?' },
    ],
  },
  {
    id: 's7',
    en: 'Goals & availability',
    es: 'Objetivos y disponibilidad',
    fields: [
      { id: 'q48', type: 'textarea', pdf: 'q48', en: 'Short-term career goals (next 6 to 12 months)', es: 'Objetivos de carrera a corto plazo (próximos 6 a 12 meses)' },
      { id: 'q49', type: 'textarea', pdf: 'q49', en: 'Long-term career goals', es: 'Objetivos de carrera a largo plazo' },
      { id: 'q50', type: 'radio', opts: yesNo(50), en: 'Available to begin the representation process immediately?', es: '¿Disponible para comenzar el proceso de representación de inmediato?' },
      { id: 'q51', type: 'text', pdf: 'q51', en: 'How did you hear about MFH Global Football Agency?', es: '¿Cómo te enteraste de MFH Global Football Agency?' },
    ],
  },
];

export const QLANGS = ['en', 'es'] as const;
export type QLang = (typeof QLANGS)[number];
// The questionnaire ships in the two working languages (EN/ES), matching the PDF.
export const toQLang = (lang: string): QLang => (lang === 'es' ? 'es' : 'en');
