// Global Affiliates (About > Global Affiliates, /affiliates).
//
// Affiliates are independent agents, agencies, and scouts who work with MFH. They are not
// staff: never give them MFH titles. The page shows organization names only, never the names
// of individual people (Andres, Oct 19 2026). An affiliate without an organization is shown
// by its role, e.g. "Independent Scout". Countries use ISO 3166 alpha-2 codes; the page prints
// each name in the visitor's language with Intl.DisplayNames.
//
// The map (src/data/world-dots.json) tags its dots with ISO numeric codes, so every country
// used below also needs an entry in COUNTRY_NUM.

export type Region = 'uefa' | 'concacaf';

export interface Affiliate {
  id: string;
  /** Organization name, printed as written. Leave it out for an independent individual. */
  org?: string;
  /** i18n key for the role; it is the card title when there is no organization */
  role?: string;
  city?: string;
  region: Region;
  /** Countries the affiliate works from; each one gets a pin on the map */
  based: string[];
  /** Markets they focus on; lit up on the map when the affiliate is active */
  focus: string[];
  website?: string;
  transfermarkt?: string;
}

// Europe first, then the Americas (site rule: Europe, USA, Colombia order).
export const REGIONS: Region[] = ['uefa', 'concacaf'];

export const AFFILIATES: Affiliate[] = [
  {
    id: 'sousa',
    org: 'Sousa Football Agents',
    region: 'uefa',
    based: ['ES', 'PT'],
    focus: ['ES', 'PT', 'VE', 'MX'],
    transfermarkt: 'https://www.transfermarkt.com/sousa-football-agents/beraterfirma/berater/16350',
  },
  {
    id: 'oceanusport',
    org: 'OceanuSport',
    role: 'aff.role.agency',
    region: 'uefa',
    based: ['ES'],
    focus: ['ES'],
    website: 'https://oceanusport.com',
  },
  {
    id: 'scout-valencia',
    role: 'aff.role.indScout',
    city: 'Valencia',
    region: 'uefa',
    based: ['ES'],
    focus: ['ES'],
  },
  {
    id: 'agent-mexico',
    role: 'aff.role.indAgent',
    region: 'concacaf',
    based: ['MX', 'GB'],
    focus: ['MX'],
  },
];

// Where each country's pin sits (its capital, so the pin lands well inside the country).
export const PIN_AT: Record<string, { lat: number; lng: number }> = {
  ES: { lat: 40.42, lng: -3.7 },
  PT: { lat: 38.72, lng: -9.14 },
  GB: { lat: 51.51, lng: -0.13 },
  MX: { lat: 19.43, lng: -99.13 },
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
