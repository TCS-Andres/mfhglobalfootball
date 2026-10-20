// Global Affiliates (About > Global Affiliates, /affiliates).
//
// Affiliates are independent agents, agencies, and scouts who work with MFH. They are not
// staff: never give them MFH titles. Affiliates show organization names only, never the names
// of individual people (Andres, Oct 19 2026), so every affiliate needs an `org`. MFH's own
// scouts (SCOUTS below) are the exception: they show name and title, exactly as on the Team
// page. Countries use ISO 3166 alpha-2 codes; the page prints each name in the visitor's
// language with Intl.DisplayNames. The page shows countries only, never cities (Andres, Oct 19
// 2026).
//
// The map (src/data/world-dots.json) tags its dots with ISO numeric codes, so every country
// used below also needs an entry in COUNTRY_NUM.

export type Region = 'uefa' | 'concacaf' | 'conmebol';

export interface Affiliate {
  id: string;
  /** Organization name, printed as written */
  org: string;
  region: Region;
  /** Countries the affiliate works from; each one gets a pin on the map */
  based: string[];
  /** Markets they focus on; lit up on the map when the affiliate is active */
  focus: string[];
  website?: string;
  transfermarkt?: string;
}

// Europe first, then the Americas (site rule: Europe, USA, Colombia order).
export const REGIONS: Region[] = ['uefa', 'concacaf', 'conmebol'];

export const AFFILIATES: Affiliate[] = [
  {
    id: 'sousa',
    org: 'Sousa Football Agents',
    region: 'uefa',
    based: ['ES', 'PT', 'VE'],
    focus: ['ES', 'PT', 'VE', 'MX'],
  },
  {
    // Works from Madrid and Bogota; listed under Europe, where it is headquartered first.
    id: 'barron',
    org: 'Barron Management',
    region: 'uefa',
    based: ['ES', 'CO'],
    focus: ['ES', 'CO'],
  },
  {
    id: 'oceanusport',
    org: 'OceanuSport',
    region: 'uefa',
    based: ['ES'],
    focus: ['ES'],
  },
  {
    // Formerly listed as an unnamed independent FIFA agent (Mexico and UK).
    id: 'tufg',
    org: 'The United Football Group',
    region: 'concacaf',
    based: ['MX', 'GB'],
    focus: ['MX'],
  },
  {
    id: 'playgold',
    org: 'Play Gold Agency',
    region: 'conmebol',
    based: ['CO'],
    focus: ['CO'],
  },
];

// Where each country's pin sits (its capital, so the pin lands well inside the country).
export const PIN_AT: Record<string, { lat: number; lng: number }> = {
  ES: { lat: 40.42, lng: -3.7 },
  PT: { lat: 38.72, lng: -9.14 },
  GB: { lat: 51.51, lng: -0.13 },
  MX: { lat: 19.43, lng: -99.13 },
  VE: { lat: 10.48, lng: -66.9 },
  // Colombia's affiliate pin sits on the north coast (near Cartagena) instead of the capital,
  // so it does not cover MFH's own Colombia pin in Bogota.
  CO: { lat: 10.39, lng: -75.51 },
};

// MFH's own bases. The arcs on the map start from South Florida.
export const MFH_BASES = [
  { id: 'fl', country: 'US', label: 'aff.base.fl', lat: 25.76, lng: -80.19 },
  { id: 'co', country: 'CO', label: 'aff.base.co', lat: 4.6, lng: -74.1 },
];

export const COUNTRY_NUM: Record<string, string> = {
  CO: '170',
  ES: '724',
  GB: '826',
  MX: '484',
  PT: '620',
  US: '840',
  VE: '862',
};

// MFH's own scouts, in the Team page order (North America, Latin America, then Europe,
// Middle East & Africa). Names and titles come from the Team page keys (st.pN.n / st.pN.t), so
// both pages always agree. `pin` is the map pin they join: an MFH base ('base-fl', 'base-co')
// or a country pin. Carlos (Cali) shares the Colombia pin because Cali sits too close to Bogota
// for its own pin; Jose Francisco (Valencia) and Abdellah (England) join the Spain and UK pins.
export interface Scout {
  key: string;
  photo?: string;
  country: string;
  region: string;
  pin: string;
}

export const SCOUTS: Scout[] = [
  { key: 'st.p2', photo: '/photos/ezzy.jpg', country: 'US', region: 'st.reg.na', pin: 'base-fl' },
  { key: 'st.p3', photo: '/photos/sebastian.jpg', country: 'US', region: 'st.reg.na', pin: 'base-fl' },
  { key: 'st.p15', photo: '/photos/christian.jpg', country: 'US', region: 'st.reg.na', pin: 'base-fl' },
  { key: 'st.p4', photo: '/photos/john.jpg', country: 'CO', region: 'st.reg.la', pin: 'base-co' },
  { key: 'st.p10', photo: '/photos/andres-hernandez.jpg', country: 'CO', region: 'st.reg.la', pin: 'base-co' },
  { key: 'st.p14', country: 'ES', region: 'st.reg.emea', pin: 'ES' },
  { key: 'st.p13', photo: '/photos/abdellah.jpg', country: 'GB', region: 'st.reg.emea', pin: 'GB' },
];
