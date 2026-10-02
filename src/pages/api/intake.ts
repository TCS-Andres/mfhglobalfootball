// Questionnaire intake -> email to Bert.
//
// The questionnaire form (QuestionnaireBody.astro) posts the answers and the
// browser-generated, pre-filled PDF (base64) here. This runs as a Vercel
// serverless function (output: 'static' + Vercel adapter, prerender = false)
// and emails info@mfhglobal.football with a readable summary plus the PDF
// attached, via Resend.
//
// It also builds the MFH Player Profile (the one-page CV, src/lib/playerProfile.ts)
// from the same answers and the uploaded photo, and attaches it to that email. The
// profile is for MFH only: it is never returned to the browser or sent to the player.
//
// Required env var (set in Vercel, NOT prefixed PUBLIC_ so it stays server-side):
//   RESEND_API_KEY   your Resend API key
// Optional overrides:
//   INTAKE_TO_EMAIL  destination (default info@mfhglobal.football)
//   INTAKE_FROM      from address (default onboarding@resend.dev; use a
//                    verified-domain address once mfhglobal.football is verified)

export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { SECTIONS, toQLang } from '../../data/questionnaire';
import { buildPlayerProfile } from '../../lib/playerProfile';
// Fonts and logo are inlined into the function bundle (base64 data URLs), so the
// profile renders the same on every deployment without fetching anything.
import fontRegular from '../../assets/profile/SourceSans3-Regular.ttf?inline';
import fontBold from '../../assets/profile/SourceSans3-Bold.ttf?inline';
import fontItalic from '../../assets/profile/SourceSans3-It.ttf?inline';
import logoPng from '../../assets/profile/logo.png?inline';

const fromDataUrl = (dataUrl: string) => new Uint8Array(Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64'));

// The browser sends the photo as base64 JPEG, already scaled down. Reject anything
// oversized or that is not a JPEG rather than trusting the client.
const MAX_PHOTO_BASE64 = 4_000_000;
const readPhoto = (b64: unknown): Uint8Array | undefined => {
  if (typeof b64 !== 'string' || !b64 || b64.length > MAX_PHOTO_BASE64) return undefined;
  const bytes = new Uint8Array(Buffer.from(b64, 'base64'));
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff ? bytes : undefined;
};

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);

const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
  const apiKey = process.env.RESEND_API_KEY;
  // Local development has no mail key: the function then runs as a dry run (see below).
  if (!apiKey && !import.meta.env.DEV) return json({ ok: false, error: 'RESEND_API_KEY not configured' }, 500);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid JSON' }, 400);
  }

  const answers: Record<string, string> = body.answers || {};
  const pdfBase64: string | undefined = body.pdfBase64;
  const lang = body.lang || 'en';
  const ql = toQLang(lang);
  const playerName = answers.q1 || 'Player';

  // Readable summary grouped by section (the full data is also in the PDF).
  const groups: string[] = [];
  for (const s of SECTIONS) {
    const items: string[] = [];
    for (const f of s.fields) {
      const v = answers[f.id];
      if (v == null || v === '') continue;
      const label = ql === 'es' ? f.es : f.en;
      items.push(
        `<tr><td style="padding:4px 14px 4px 0;color:#475A70;vertical-align:top;">${esc(label)}</td><td style="padding:4px 0;font-weight:600;color:#0C1B29;">${esc(v)}</td></tr>`
      );
    }
    if (items.length) {
      const secName = ql === 'es' ? s.es : s.en;
      groups.push(
        `<h3 style="margin:20px 0 6px;color:#005391;font:700 15px Arial,sans-serif;">${esc(secName)}</h3><table style="border-collapse:collapse;font:14px Arial,sans-serif;">${items.join('')}</table>`
      );
    }
  }

  const html = `<div style="font:14px Arial,sans-serif;color:#0C1B29;max-width:640px;">
    <h2 style="color:#005391;margin:0 0 4px;">New player questionnaire: ${esc(playerName)}</h2>
    <p style="color:#475A70;margin:0 0 8px;">Role: ${esc(answers.who || '')} &middot; Age: ${esc(answers.age || answers.q3 || '')}</p>
    ${groups.join('')}
    <p style="margin-top:22px;color:#475A70;font-size:13px;">__ATTACHED__</p>
  </div>`;

  const to = process.env.INTAKE_TO_EMAIL || 'info@mfhglobal.football';
  const from = process.env.INTAKE_FROM || 'MFH Global Football Agency <onboarding@resend.dev>';

  const slug = String(playerName).replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'Player';
  const attachments: { filename: string; content: string }[] = pdfBase64
    ? [{ filename: body.filename || `MFH-Player-Intake-${slug}.pdf`, content: pdfBase64 }]
    : [];

  // Draft Player Profile for Bert. A failure here must never block the intake email.
  const photo = readPhoto(body.photoBase64);
  let profileBuilt = false;
  try {
    const profile = await buildPlayerProfile(answers, {
      photoJpg: photo,
      assets: {
        regular: fromDataUrl(fontRegular),
        bold: fromDataUrl(fontBold),
        italic: fromDataUrl(fontItalic),
        logo: fromDataUrl(logoPng),
      },
    });
    attachments.push({ filename: `MFH-Player-Profile-${slug}.pdf`, content: Buffer.from(profile).toString('base64') });
    profileBuilt = true;
  } catch (e) {
    console.error('Player Profile build failed', e);
  }
  if (photo) attachments.push({ filename: `${slug}-photo.jpg`, content: Buffer.from(photo).toString('base64') });

  const attachedNote = [
    'Attached: the pre-filled questionnaire',
    profileBuilt ? ', a draft Player Profile (for MFH use only, not sent to the player)' : '',
    photo ? ', and the player photo' : '',
    '.',
    profileBuilt ? '' : ' The Player Profile could not be generated for this submission.',
  ].join('');
  const emailHtml = html.replace('__ATTACHED__', esc(attachedNote));

  // Development only: no mail is sent. Report what would have been attached and hand
  // back the profile so it can be inspected. This branch is stripped from production.
  if (import.meta.env.DEV && !apiKey) {
    return json({
      ok: true,
      dryRun: true,
      attachments: attachments.map((a) => ({ filename: a.filename, base64Length: a.content.length })),
      profilePdfBase64: attachments.find((a) => a.filename.startsWith('MFH-Player-Profile-'))?.content,
    });
  }

  try {
    const resend = new Resend(apiKey as string);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: answers.q6 || undefined, // player's email, if provided
      subject: `New player questionnaire: ${playerName}`,
      html: emailHtml,
      attachments,
    });
    if (error) return json({ ok: false, error: String((error as any).message || error) }, 502);
    return json({ ok: true });
  } catch (e: any) {
    return json({ ok: false, error: e?.message || 'send failed' }, 500);
  }
};
