// One email-only sign-up call, shared by the end-of-article form and the mobile
// bottom bar so both post the same payload to the same BotID-guarded route.
// Throws with the route's own message when the sign-up does not land. Returns
// the list's status when the route names one ('already-subscribed' means no
// welcome is coming, because the reader is already on the list).

// What an articles reader is told depends on what the list did, so no line
// promises an email that is not coming. The bar and the end-of-article form
// both read it from here.
export const ARTICLES_THANKS = {
  welcomed: "You're in. A welcome from Lane is landing in your inbox now.",
  already: "You're already on the list. Past you had good taste.", // King-ruled 2026-10-25, an exception to the plain article register
  rejoin: 'Check your inbox. A note from Lane is on its way.',
}

export function thanksFor(listStatus: string | undefined): string {
  if (listStatus === 'already-subscribed') return ARTICLES_THANKS.already
  if (listStatus === 'rejoin-confirm-sent') return ARTICLES_THANKS.rejoin
  return ARTICLES_THANKS.welcomed
}

export async function submitSignup(formName: string, email: string, honeypot: string, openedAt: number): Promise<string | undefined> {
  const res = await fetch('/api/form-submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formName, email: email.trim(), honeypot, openedAt }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(body?.error || `Submission failed (${res.status})`)
  }
  return typeof body?.status === 'string' ? body.status : undefined
}
