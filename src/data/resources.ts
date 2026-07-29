// Resources page link data.
//
// Each link has a `visibility` flag. ResourcesBody renders only `public` links.
//
// TODO(gating, spec 4.3): On the July 17 call Bert described some links as
// "only for me" (personal quick-access). Whether the Resources page needs auth
// gating, and which links are private, is an OPEN DECISION, not yet closed.
// Do not implement authentication until that is decided. When it is, mark the
// personal links `visibility: 'private'` and render them only behind the gate.
// All three links below are public today: none expose anything confidential.
//
// Brand rule 0.8: third party companies are named ONLY here, never in the
// ecosystem / services / how-it-works copy.

export type ResourceVisibility = 'public' | 'private';

export interface ResourceLink {
  title: string; // brand name, not translated
  url: string;
  descKey: string; // i18n key for the localized one-line description
  visibility: ResourceVisibility;
}

export const RESOURCES: ResourceLink[] = [
  {
    title: 'Analytic Soccer', // singular, not "Analytics Soccer"; client wants it first
    url: 'https://analyticsoccer.com/',
    descKey: 'res.c.analytic',
    visibility: 'public',
  },
  {
    title: 'Transfermarkt',
    url: 'https://www.transfermarkt.com/',
    descKey: 'res.c.transfermarkt',
    visibility: 'public',
  },
  {
    // Display label confirmed by Bert as "Eleven Lex"; domain is elevenlex.com.
    title: 'Eleven Lex',
    url: 'https://elevenlex.com/',
    descKey: 'res.c.11lex',
    visibility: 'public',
  },
];
