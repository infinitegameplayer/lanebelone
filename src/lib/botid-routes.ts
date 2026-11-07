// The routes Vercel BotID guards on lanebelone.com. instrumentation-client.ts
// attaches the browser signal to exactly these, and each one calls
// refuseBots() from bot-guard.ts. Keep the two in step (Site Defensibility
// Read 2026-10-25). The articles join and undo from email links are posted from
// their own pages (/articles/join, /articles/leave), so they carry the signal
// (2026-11-07; the old GET link that subscribed on open now redirects there).

export const BOTID_PROTECTED: { path: string; method: 'POST' }[] = [
  { path: '/api/form-submit', method: 'POST' },
  { path: '/api/preferences/request-link', method: 'POST' },
  { path: '/api/preferences/request-email-change', method: 'POST' },
  { path: '/api/articles/join', method: 'POST' },
  { path: '/api/articles/leave', method: 'POST' },
  { path: '/api/unsubscribe', method: 'POST' },
  { path: '/api/personal/join', method: 'POST' },
  { path: '/api/personal/leave', method: 'POST' },
]
