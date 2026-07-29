// Questionnaire intake -> email to Bert.
//
// The questionnaire form (QuestionnaireBody.astro) posts the answers and the
// browser-generated, pre-filled PDF (base64) here. This runs as a Vercel
// serverless function (output: 'static' + Vercel adapter, prerender = false)
// and emails info@mfhglobal.football with a readable summary plus the PDF
// attached, via Resend.
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

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);

const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, error: 'RESEND_API_KEY not configured' }, 500);

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
    <p style="margin-top:22px;color:#475A70;font-size:13px;">The full pre-filled PDF is attached to this email.</p>
  </div>`;

  const to = process.env.INTAKE_TO_EMAIL || 'info@mfhglobal.football';
  const from = process.env.INTAKE_FROM || 'MFH Global Football Agency <onboarding@resend.dev>';

  const attachments = pdfBase64
    ? [{ filename: body.filename || `MFH-Player-Intake-${String(playerName).replace(/\s+/g, '-')}.pdf`, content: pdfBase64 }]
    : [];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: answers.q6 || undefined, // player's email, if provided
      subject: `New player questionnaire: ${playerName}`,
      html,
      attachments,
    });
    if (error) return json({ ok: false, error: String((error as any).message || error) }, 502);
    return json({ ok: true });
  } catch (e: any) {
    return json({ ok: false, error: e?.message || 'send failed' }, 500);
  }
};
