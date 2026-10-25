// One email-only sign-up call, shared by the end-of-article form and the mobile
// bottom bar so both post the same payload to the same BotID-guarded route.
// Throws with the route's own message when the sign-up does not land. Returns
// the list's status when the route names one ('already-subscribed' means no
// welcome is coming, because the reader is already on the list).

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
