// Bert's educational videos (HeyGen A-roll + edit, Oct 2026). Masters live in the
// parent "Educational Videos/" folder; the web copies in public/videos/edu/ are 720p
// H.264 with faststart. Each video's title and description are i18n keys
// `vid.<key>.t` / `vid.<key>.d`. The videos are English only, so other locales show
// an "in English" badge. Captions are English WebVTT, converted from the HeyGen SRT
// sidecars; Video 1 was rendered before sidecars were requested, so it has none yet.

export interface EduVideo {
  key: string; // i18n key segment
  slug: string; // file stem in public/videos/edu/
  seconds: number; // runtime, for the badge and VideoObject duration
  captions: boolean; // has public/videos/edu/edu-<slug>.en.vtt
}

// Page order: The Five Steps is featured first as the starting point, then 1 to 4.
export const VIDEOS: EduVideo[] = [
  { key: 'v5', slug: 'the-five-steps', seconds: 188, captions: true },
  { key: 'v1', slug: 'what-are-my-rights', seconds: 136, captions: false },
  { key: 'v2', slug: 'the-16-year-old-rule', seconds: 127, captions: true },
  { key: 'v3', slug: 'talent-vs-work-ethic', seconds: 122, captions: true },
  { key: 'v4', slug: 'inside-a-real-transfer', seconds: 117, captions: true },
];

export const videoSrc = (v: EduVideo) => `/videos/edu/edu-${v.slug}.mp4`;
export const videoPoster = (v: EduVideo) => `/videos/edu/edu-${v.slug}.jpg`;
export const videoCaptions = (v: EduVideo) => `/videos/edu/edu-${v.slug}.en.vtt`;
export const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
export const isoDuration = (s: number) => `PT${Math.floor(s / 60)}M${s % 60}S`;
