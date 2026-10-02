// MFH Player Profile (CV) builder.
//
// Turns a questionnaire submission into the one-page, bilingual (EN / ES) Player
// Profile that Bert shares with clubs. It runs on the server only (see
// src/pages/api/intake.ts): the profile is for MFH, the player never receives it.
//
// Layout follows Bert's reference profile. Measurements below are in the reference's
// pixel grid (850 x 1100) and converted to PDF points by `S`.

import {
  PDFDocument,
  PDFName,
  PDFString,
  rgb,
  pushGraphicsState,
  popGraphicsState,
  moveTo,
  lineTo,
  closePath,
  clip,
  endPath,
  setCharacterSpacing,
} from 'pdf-lib';
import type { PDFFont, PDFImage, PDFPage, RGB } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export interface ProfileAssets {
  regular: Uint8Array;
  bold: Uint8Array;
  italic: Uint8Array;
  /** PNG logo for the header. */
  logo?: Uint8Array;
}

export interface ProfileOptions {
  assets: ProfileAssets;
  /** JPEG bytes of the player photo, any aspect ratio (it is center-cropped). */
  photoJpg?: Uint8Array;
  /** Short scouting summary. Omitted from the page when not supplied. */
  summary?: { en?: string; es?: string };
  now?: Date;
}

// Agent details printed in the footer, from Bert's reference profile.
export const AGENT = {
  name: 'Bert Mahecha',
  title: 'FIFA Licensed Football Agent',
  license: 'FIFA License No. 202606-12315',
  phone: '+1 (786) 797-6466',
  confidential: 'Confidential. Prepared by MFH Global Football Agency for club use only',
};

const S = 0.72; // reference pixels to PDF points
const PAGE_W = 850;
const PAGE_H = 1100;
const LEFT = 48;
const RIGHT = 800;

const hex = (h: string): RGB => {
  const n = parseInt(h.slice(1), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};
const C = {
  blue: hex('#005391'),
  gold: hex('#C9A227'),
  goldSoft: hex('#E4C45E'),
  ink: hex('#0C1B29'),
  soft: hex('#6B7C8F'),
  line: hex('#DDE4EC'),
  band: hex('#F1F4F8'),
  white: rgb(1, 1, 1),
  onBlue: hex('#C9DBEC'),
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const NONE = '-';
const ON_REQUEST = 'On request / A solicitud';

// English position names to Spanish, matched on the lowercased answer.
const POSITIONS_ES: Record<string, string> = {
  goalkeeper: 'Portero',
  keeper: 'Portero',
  defender: 'Defensa',
  'center back': 'Defensa Central',
  'centre back': 'Defensa Central',
  'central defender': 'Defensa Central',
  cb: 'Defensa Central',
  'left back': 'Lateral Izquierdo',
  lb: 'Lateral Izquierdo',
  'right back': 'Lateral Derecho',
  rb: 'Lateral Derecho',
  fullback: 'Lateral',
  'full back': 'Lateral',
  'wing back': 'Carrilero',
  midfielder: 'Mediocampista',
  'central midfielder': 'Mediocentro',
  'center midfielder': 'Mediocentro',
  'defensive midfielder': 'Mediocentro Defensivo',
  'attacking midfielder': 'Mediapunta',
  winger: 'Extremo',
  'left wing': 'Extremo Izquierdo',
  'left winger': 'Extremo Izquierdo',
  'right wing': 'Extremo Derecho',
  'right winger': 'Extremo Derecho',
  forward: 'Delantero',
  striker: 'Delantero Centro',
  'center forward': 'Delantero Centro',
  'centre forward': 'Delantero Centro',
};

const clean = (v: unknown) => String(v ?? '').replace(/\s+/g, ' ').trim();

export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(clean(iso));
  if (!m) return clean(iso);
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1] ?? ''} ${m[1]}`.replace(/\s+/g, ' ');
}

/** "Mikai Wainwright Orlando Davis" -> first name line and surname line. */
export function splitName(full: string): { first: string; rest: string } {
  const parts = clean(full).split(' ').filter(Boolean);
  if (parts.length <= 1) return { first: '', rest: parts[0] ?? '' };
  return { first: parts[0], rest: parts.slice(1).join(' ') };
}

/** Height from the free-text "Height & weight" answer, for the stat chip. */
export function heightFrom(hw: string): string {
  const s = clean(hw);
  const cm = /(\d{3})\s*cm/i.exec(s);
  if (cm) return `${cm[1]} cm`;
  const m = /\b([12][.,]\d{2})\s*m\b/i.exec(s);
  if (m) return `${m[1].replace(',', '.')} m`;
  const ft = /(\d)\s*(?:'|ft|feet|pies?)\s*(\d{1,2})?/i.exec(s);
  if (ft) return `${ft[1]}'${ft[2] ?? '0'}"`;
  return s.split(/[\/,;]| and | y /i)[0].trim();
}

/** Goals and assists from an answer like "0/2", "5 goals, 3 assists" or "7". */
export function goalsAssists(v: string): { goals: string; assists: string } {
  const nums = clean(v).match(/\d+/g) ?? [];
  return { goals: nums[0] ?? NONE, assists: nums[1] ?? NONE };
}

function positionBilingual(v: string): { en: string; es: string } {
  const en = clean(v);
  return { en, es: POSITIONS_ES[en.toLowerCase()] ?? '' };
}

const yes = (v: unknown) => clean(v).toLowerCase() === 'yes';

export function deriveProfile(a: Record<string, string>) {
  const name = splitName(a.q1);
  const position = positionBilingual(a.q22);
  const freeAgent = yes(a.q38);
  const underContract = yes(a.q35);
  const contractEnd = a.q36 ? formatDate(a.q36) : '';

  const foot: Record<string, string> = { Right: 'Right / Derecho', Left: 'Left / Izquierdo', Both: 'Both / Ambos' };
  const openTo: Record<string, string> = {
    Domestic: 'Domestic / Nacional',
    International: 'International / Internacional',
    Both: 'Domestic & Intl. / Nac. e Intl.',
  };
  const eduLevel: Record<string, string> = {
    highschool: 'High school / Secundaria',
    college: 'College / Universidad',
  };

  const club = clean(a.q27);
  const country = clean(a.q29);
  const clubLine = club && country && !club.toLowerCase().includes(country.toLowerCase()) ? `${club} (${country})` : club;
  const ga = goalsAssists(a.q32);
  const salary = [clean(a.q33), clean(a.q34)].filter(Boolean).join(' ');

  return {
    firstName: name.first,
    lastName: name.rest.toUpperCase(),
    fullName: clean(a.q1),
    positionEn: position.en,
    positionEs: position.es,
    chips: [
      { label: 'AGE / EDAD', value: clean(a.q3 || a.age) || NONE },
      { label: 'PASSPORT / PASAPORTE', value: clean(a.q11) || clean(a.q7) || NONE },
      { label: 'HEIGHT / ESTATURA', value: heightFrom(a.q24) || NONE },
      { label: 'FOOT / PIE', value: clean(a.q25) || NONE },
    ],
    playerInfo: [
      ['Date of Birth', 'Fecha de Nacimiento', a.q2 ? formatDate(a.q2) : NONE],
      ['Place of Birth', 'Lugar de Nacimiento', clean(a.q8) || NONE],
      ['Residence', 'Residencia', clean(a.q4) || NONE],
      ['Nationality', 'Nacionalidad', clean(a.q7) || NONE],
      ['Secondary Positions', 'Posiciones Secundarias', clean(a.q23) || NONE],
      ['Height / Weight', 'Estatura / Peso', clean(a.q24) || NONE],
      ['Preferred Foot', 'Pie Hábil', foot[clean(a.q25)] ?? (clean(a.q25) || NONE)],
      ['Education', 'Educación', clean(a.edu2) || eduLevel[clean(a.edu1)] || NONE],
    ] as [string, string, string][],
    clubInfo: [
      ['Current Club', 'Club Actual', clubLine || NONE],
      [
        'Contract',
        'Contrato',
        freeAgent
          ? 'Free Agent / Agente Libre'
          : underContract
            ? `Under contract / Con contrato${contractEnd ? ` (${contractEnd})` : ''}`
            : NONE,
      ],
      ['Open To', 'Interés', openTo[clean(a.q40)] ?? NONE],
      ['Division', 'División', clean(a.q28) || NONE],
      ['Availability', 'Disponibilidad', freeAgent ? 'Immediate / Inmediata' : ON_REQUEST],
    ] as [string, string, string][],
    transferFee: freeAgent ? 'Free / Libre' : clean(a.q37) || ON_REQUEST,
    // The questionnaire asks for the current or last salary received, so it is
    // labeled that way. The asking salary is the agent's call.
    salary: salary || ON_REQUEST,
    seasonTitle: club ? club.toUpperCase() : '',
    stats: [
      { value: clean(a.q31) || NONE, en: 'MATCHES', es: 'PARTIDOS' },
      { value: ga.goals, en: 'GOALS', es: 'GOLES' },
      { value: ga.assists, en: 'ASSISTS', es: 'ASISTENCIAS' },
    ],
    highlightsUrl: safeUrl(a.q26),
    scoutingUrl: safeUrl(a.profileUrl),
  };
}

function safeUrl(v: unknown): string {
  const s = clean(v);
  if (!s) return '';
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withScheme);
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : '';
  } catch {
    return '';
  }
}

interface TextOpts {
  font: PDFFont;
  size: number;
  color?: RGB;
  /** Letter spacing, in reference pixels. */
  spacing?: number;
  align?: 'left' | 'right' | 'center';
}

export async function buildPlayerProfile(answers: Record<string, string>, opts: ProfileOptions): Promise<Uint8Array> {
  const p = deriveProfile(answers);
  const now = opts.now ?? new Date();

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle(`MFH Player Profile: ${p.fullName}`);
  doc.setAuthor('MFH Global Football Agency');

  const regular = await doc.embedFont(opts.assets.regular, { subset: true });
  const bold = await doc.embedFont(opts.assets.bold, { subset: true });
  const italic = await doc.embedFont(opts.assets.italic, { subset: true });

  const page = doc.addPage([PAGE_W * S, PAGE_H * S]);
  const annots: ReturnType<typeof doc.context.register>[] = [];

  // ---- drawing helpers, all in reference pixels with the origin at the top left
  const Y = (y: number) => (PAGE_H - y) * S;

  const width = (s: string, o: TextOpts) => o.font.widthOfTextAtSize(s, o.size * S) / S + (o.spacing ?? 0) * s.length;

  /** Draws text with its baseline at `y`. Returns the width drawn, in pixels. */
  const text = (s: string, x: number, y: number, o: TextOpts): number => {
    if (!s) return 0;
    const w = width(s, o);
    const x0 = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
    if (o.spacing) page.pushOperators(setCharacterSpacing(o.spacing * S));
    page.drawText(s, { x: x0 * S, y: Y(y), size: o.size * S, font: o.font, color: o.color ?? C.ink });
    if (o.spacing) page.pushOperators(setCharacterSpacing(0));
    return w;
  };

  /** Shrinks, then truncates, so `s` fits in `max` pixels. */
  const fit = (s: string, max: number, o: TextOpts, minSize = o.size * 0.72): { s: string; o: TextOpts } => {
    let size = o.size;
    while (size > minSize && width(s, { ...o, size }) > max) size -= 0.25;
    let out = s;
    const sized = { ...o, size };
    if (width(out, sized) > max) {
      while (out.length > 1 && width(`${out}...`, sized) > max) out = out.slice(0, -1);
      out = `${out.trimEnd()}...`;
    }
    return { s: out, o: sized };
  };

  const rect = (x: number, y: number, w: number, h: number, color: RGB) =>
    page.drawRectangle({ x: x * S, y: Y(y + h), width: w * S, height: h * S, color });

  const roundRect = (x: number, y: number, w: number, h: number, r: number, color?: RGB, border?: RGB, bw = 1) => {
    const path = `M ${r} 0 H ${w - r} Q ${w} 0 ${w} ${r} V ${h - r} Q ${w} ${h} ${w - r} ${h} H ${r} Q 0 ${h} 0 ${h - r} V ${r} Q 0 0 ${r} 0 Z`;
    page.drawSvgPath(path, {
      x: x * S,
      y: Y(y),
      scale: S,
      color,
      borderColor: border,
      borderWidth: border ? bw * S : 0,
    });
  };

  const hline = (x1: number, x2: number, y: number, color: RGB, thickness = 1) =>
    page.drawLine({ start: { x: x1 * S, y: Y(y) }, end: { x: x2 * S, y: Y(y) }, thickness: thickness * S, color });

  const link = (x: number, y: number, w: number, h: number, url: string) => {
    annots.push(
      doc.context.register(
        doc.context.obj({
          Type: 'Annot',
          Subtype: 'Link',
          Rect: [x * S, Y(y + h), (x + w) * S, Y(y)],
          Border: [0, 0, 0],
          A: { Type: 'Action', S: 'URI', URI: PDFString.of(url) },
        }),
      ),
    );
  };

  const wrap = (s: string, max: number, o: TextOpts): string[] => {
    const lines: string[] = [];
    let line = '';
    for (const word of clean(s).split(' ')) {
      const next = line ? `${line} ${word}` : word;
      if (line && width(next, o) > max) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
    return lines;
  };

  /** "PLAYER INFO / DATOS DEL JUGADOR" heading with its rule. */
  const heading = (en: string, es: string, x1: number, x2: number, y: number) => {
    const o = { font: bold, size: 11.5, spacing: 1.4 };
    const w = text(en, x1, y, { ...o, color: C.blue });
    text(` / ${es}`, x1 + w, y, { ...o, color: C.gold });
    hline(x1, x2, y + 8, C.blue, 1.2);
  };

  /** Label (EN bold + ES small) on the left, value right-aligned. */
  const row = (en: string, es: string, value: string, x1: number, x2: number, y: number, valueOpts?: Partial<TextOpts>) => {
    const lw = text(en, x1, y, { font: bold, size: 12.5 });
    const ew = text(es, x1 + lw + 7, y, { font: regular, size: 9.5, color: C.soft });
    const max = x2 - (x1 + lw + 7 + ew) - 14;
    const v = fit(value, max, { font: regular, size: 13, ...valueOpts });
    text(v.s, x2, y, { ...v.o, align: 'right' });
    hline(x1, x2, y + 10, C.line, 0.8);
  };

  // ---- header
  if (opts.assets.logo) {
    const logo = await doc.embedPng(opts.assets.logo);
    const h = 62;
    const w = (logo.width / logo.height) * h;
    page.drawImage(logo, { x: LEFT * S, y: Y(34 + h), width: w * S, height: h * S });
  }
  text('PLAYER PROFILE', RIGHT, 63, { font: bold, size: 27, color: C.blue, spacing: 1.6, align: 'right' });
  text('PERFIL DEL JUGADOR', RIGHT, 88, { font: regular, size: 14, color: C.soft, spacing: 2.2, align: 'right' });
  rect(0, 118, PAGE_W, 4, C.blue);
  rect(0, 122, PAGE_W, 2.5, C.gold);

  // ---- hero band: photo, name, position, stat chips
  rect(0, 124.5, PAGE_W, 208, C.band);

  const photo = { x: LEFT, y: 145, w: 142, h: 170 };
  roundRect(photo.x, photo.y, photo.w, photo.h, 6, C.white);
  let img: PDFImage | undefined;
  if (opts.photoJpg) {
    try {
      img = await doc.embedJpg(opts.photoJpg);
    } catch {
      img = undefined; // unreadable upload: fall back to the initials tile
    }
  }
  const inset = 4;
  const box = { x: photo.x + inset, y: photo.y + inset, w: photo.w - inset * 2, h: photo.h - inset * 2 };
  if (img) {
    // Cover-crop: scale to fill the box and clip the overflow.
    const scale = Math.max(box.w / img.width, box.h / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    page.pushOperators(
      pushGraphicsState(),
      moveTo(box.x * S, Y(box.y)),
      lineTo((box.x + box.w) * S, Y(box.y)),
      lineTo((box.x + box.w) * S, Y(box.y + box.h)),
      lineTo(box.x * S, Y(box.y + box.h)),
      closePath(),
      clip(),
      endPath(),
    );
    // Portraits keep the top of the frame (the head), not the vertical center.
    const offsetY = (dh - box.h) * 0.25;
    page.drawImage(img, {
      x: (box.x - (dw - box.w) / 2) * S,
      y: Y(box.y - offsetY + dh),
      width: dw * S,
      height: dh * S,
    });
    page.pushOperators(popGraphicsState());
  } else {
    rect(box.x, box.y, box.w, box.h, C.band);
    const initials = `${p.firstName[0] ?? ''}${p.lastName[0] ?? ''}`.toUpperCase();
    text(initials, box.x + box.w / 2, box.y + box.h / 2 + 14, { font: bold, size: 40, color: C.onBlue, align: 'center' });
  }
  roundRect(photo.x, photo.y, photo.w, photo.h, 6, undefined, C.blue, 1.6);

  const nameX = 217;
  const nameMax = RIGHT - nameX;
  if (p.firstName) text(p.firstName, nameX, 165, { font: regular, size: 20, color: C.blue });
  const last = fit(p.lastName || p.fullName.toUpperCase(), nameMax, { font: bold, size: 33, color: C.blue }, 18);
  text(last.s, nameX, 199, last.o);
  if (p.positionEn) {
    const pw = text(p.positionEn, nameX, 224, { font: bold, size: 16 });
    if (p.positionEs) text(` / ${p.positionEs}`, nameX + pw, 224, { font: regular, size: 16, color: C.soft });
  }

  const chipW = 139;
  const chipGap = 9;
  p.chips.forEach((chip, i) => {
    const x = nameX + i * (chipW + chipGap);
    rect(x, 267, chipW, 47, C.white);
    rect(x, 267, 3, 47, C.gold);
    text(chip.label, x + 13, 283, { font: regular, size: 8.5, color: C.soft, spacing: 0.9 });
    const v = fit(chip.value, chipW - 22, { font: bold, size: 17, color: C.blue }, 10);
    text(v.s, x + 13, 304, v.o);
  });

  // ---- summary (only when one is supplied)
  let y = 350;
  const en = clean(opts.summary?.en);
  const es = clean(opts.summary?.es);
  if (en || es) {
    const top = y;
    const tx = 68;
    const max = RIGHT - tx;
    let ty = y + 21;
    for (const line of wrap(en, max, { font: regular, size: 14.5 })) {
      text(line, tx, ty, { font: regular, size: 14.5 });
      ty += 20;
    }
    for (const line of wrap(es, max, { font: italic, size: 14 })) {
      text(line, tx, ty, { font: italic, size: 14, color: C.soft });
      ty += 19;
    }
    rect(LEFT, top, 4, ty - 12 - top, C.blue);
    y = ty + 4;
  }

  // ---- two columns: player info, and club info over the transfer terms
  const colL = { x1: LEFT, x2: 410 };
  const colR = { x1: 440, x2: RIGHT };
  const headY = y + 22;
  heading('PLAYER INFO', 'DATOS DEL JUGADOR', colL.x1, colL.x2, headY);
  heading('CLUB INFO', 'DATOS DEL CLUB', colR.x1, colR.x2, headY);

  const rowH = 28;
  let ly = headY + 32;
  for (const [a, b, v] of p.playerInfo) {
    row(a, b, v, colL.x1, colL.x2, ly);
    ly += rowH;
  }
  let ry = headY + 32;
  for (const [a, b, v] of p.clubInfo) {
    row(a, b, v, colR.x1, colR.x2, ry);
    ry += rowH;
  }

  const terms = { x: colR.x1, y: ry - 6, w: colR.x2 - colR.x1, h: 110 };
  roundRect(terms.x, terms.y, terms.w, terms.h, 6, C.blue);
  {
    const o = { font: bold, size: 11.5, spacing: 1.4 };
    const w = text('TRANSFER TERMS', terms.x + 15, terms.y + 24, { ...o, color: C.white });
    text(' / CONDICIONES', terms.x + 15 + w, terms.y + 24, { ...o, color: C.goldSoft });

    const termRow = (label: string, labelEs: string, value: string, ty: number, valueOpts: TextOpts) => {
      const lw = text(label, terms.x + 15, ty, { font: bold, size: 13, color: C.white });
      const ew = text(labelEs, terms.x + 15 + lw + 7, ty, { font: regular, size: 9.5, color: C.onBlue });
      const v = fit(value, terms.w - 30 - lw - ew - 20, valueOpts, 10);
      text(v.s, terms.x + terms.w - 15, ty, { ...v.o, align: 'right' });
    };
    termRow('Transfer Fee', 'Valor de Transferencia', p.transferFee, terms.y + 58, { font: bold, size: 19, color: C.goldSoft });
    hline(terms.x + 15, terms.x + terms.w - 15, terms.y + 70, hex('#3F7CAE'), 0.8);
    termRow('Last Salary', 'Último Salario', p.salary, terms.y + 92, { font: bold, size: 16, color: C.white });
  }

  // ---- current season
  y = Math.max(ly, terms.y + terms.h + 12) + 16;
  {
    const o = { font: bold, size: 11.5, spacing: 1.4 };
    let x = LEFT;
    if (p.seasonTitle) {
      const t = fit(`${p.seasonTitle}:`, 360, { ...o, color: C.blue });
      x += text(t.s, x, y, t.o) + 6;
    }
    x += text('CURRENT SEASON', x, y, { ...o, color: C.blue });
    text(' / TEMPORADA ACTUAL', x, y, { ...o, color: C.gold });
    hline(LEFT, RIGHT, y + 8, C.blue, 1.2);
  }
  const tileW = (RIGHT - LEFT - 16) / 3;
  p.stats.forEach((stat, i) => {
    const x = LEFT + i * (tileW + 8);
    const ty = y + 16;
    roundRect(x, ty, tileW, 58, 5, C.band);
    rect(x + 2, ty, tileW - 4, 2.5, C.gold);
    text(stat.value, x + tileW / 2, ty + 31, { font: bold, size: 24, color: C.blue, align: 'center' });
    const lo = { font: bold, size: 9, spacing: 1.2 };
    const es = { font: regular, size: 9, spacing: 1.2, color: C.soft };
    const total = width(stat.en, lo) + width(`  ·  ${stat.es}`, es);
    const lx = x + tileW / 2 - total / 2;
    const w = text(stat.en, lx, ty + 48, lo);
    text(`  ·  ${stat.es}`, lx + w, ty + 48, es);
  });

  // ---- video and links
  y += 100;
  heading('VIDEO & LINKS', 'VIDEO Y ENLACES', LEFT, RIGHT, y);
  const linkRow = (en: string, es: string, x1: number, x2: number, ry2: number, label: string, url: string) => {
    const lw = text(en, x1, ry2, { font: bold, size: 12.5 });
    text(es, x1 + lw + 7, ry2, { font: regular, size: 9.5, color: C.soft });
    if (url) {
      const o = { font: bold, size: 13, color: C.blue };
      const w = text(label, x2, ry2, { ...o, align: 'right' });
      hline(x2 - w, x2, ry2 + 2.5, C.blue, 0.7);
      link(x2 - w - 2, ry2 - 12, w + 4, 17, url);
    } else {
      text(ON_REQUEST, x2, ry2, { font: regular, size: 12.5, color: C.soft, align: 'right' });
    }
    hline(x1, x2, ry2 + 10, C.line, 0.8);
  };
  linkRow('Highlights', 'Resumen', colL.x1, colL.x2, y + 30, 'Watch / Ver', p.highlightsUrl);
  linkRow('Full Match', 'Partido Completo', colL.x1, colL.x2, y + 58, '', '');
  linkRow('Scouting Profile', 'Perfil de Scouting', colR.x1, colR.x2, y + 30, 'View / Ver', p.scoutingUrl);

  // ---- footer
  rect(0, 1010, PAGE_W, 90, C.blue);
  rect(0, 1010, PAGE_W, 3, C.gold);
  text(AGENT.name, LEFT, 1046, { font: bold, size: 16, color: C.white });
  text(AGENT.title, LEFT, 1064, { font: bold, size: 12, color: C.goldSoft, spacing: 0.4 });
  text(`${AGENT.confidential}  ·  ${MONTHS[now.getMonth()]} ${now.getFullYear()}`, LEFT, 1082, {
    font: regular,
    size: 8.5,
    color: C.onBlue,
  });
  text(AGENT.license, RIGHT, 1061, { font: regular, size: 12, color: C.white, align: 'right' });
  text(AGENT.phone, RIGHT, 1079, { font: regular, size: 12, color: C.white, align: 'right' });

  if (annots.length) page.node.set(PDFName.of('Annots'), doc.context.obj(annots));
  return doc.save();
}
