// The routes Vercel BotID guards on lanebelone.com. instrumentation-client.ts
// attaches the browser signal to exactly these, and each one calls
// refuseBots() from bot-guard.ts. Keep the two in step (Site Defensibility
// Read 2026-10-25). The articles one-click link is left off on purpose: it is
// clicked from an email, where no page runs to carry the signal.

export const BOTID_PROTECTED: { path: string; method: 'POST' }[] = [
  { path: '/api/form-submit', method: 'POST' },
  { path: '/api/preferences/request-link', method: 'POST' },
  { path: '/api/preferences/request-email-change', method: 'POST' },
]
