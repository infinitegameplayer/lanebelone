// One email-only sign-up call, shared by the end-of-article form and the mobile
// bottom bar so both post the same payload to the same BotID-guarded route.
// Throws with the route's own message when the sign-up does not land.

export async function submitSignup(formName: string, email: string, honeypot: string, openedAt: number): Promise<void> {
  const res = await fetch('/api/form-submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formName, email: email.trim(), honeypot, openedAt }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error || `Submission failed (${res.status})`)
  }
}
