// Auto-response confirmation emails for native Kingdom forms on lanebelone.com.
// One handler per formName routed by /api/form-submit after the Supabase
// write succeeds. Suppression: skip the send if the contact has
// unsubscribed=true. See Form Architecture Codex for the canonical pattern.

const ACCENT = '#c9a84c'

function p(text: string, style = '') {
  return `<p style="margin:0 0 16px 0;${style}">${text}</p>`
}

function signoff() {
  return `${p('Talk soon,')}${p('Lane', `margin-bottom:0;color:${ACCENT}`)}`
}

function greeting(firstName?: string): string {
  return firstName && firstName.trim().length > 0 ? `Hey ${firstName.trim()},` : 'Hey,'
}

export function newsletterAutoResponse(firstName?: string) {
  // BREADCRUMB: "The Distillation" branding stays for now while the framing
  // shifts toward bundled personal updates 1-3x/month. Future copy revision
  // expected when new positioning lands.
  return {
    subject: "You're in",
    previewText: 'Personal notes and bundled updates, 1-3 times a month.',
    html: `
${p(greeting(firstName))}
${p("You're subscribed to The Distillation.")}
${p('Personal notes and bundled updates land in your inbox 1-3 times a month. No filler.')}
${signoff()}
`,
  }
}

export function contactAutoResponse(firstName?: string) {
  return {
    subject: 'Got your message',
    previewText: 'I read every one and will respond within a couple of days.',
    html: `
${p(greeting(firstName))}
${p('Got your message. I read every one and will respond within a couple of days.')}
${signoff()}
`,
  }
}

export function speakingAutoResponse(firstName?: string) {
  return {
    subject: 'Got your speaking inquiry',
    previewText: 'Will respond within a couple of days.',
    html: `
${p(greeting(firstName))}
${p('Got your speaking inquiry. I will respond within a couple of days.')}
${p('If there is a fit on timing and audience, the reply will move toward specifics.')}
${signoff()}
`,
  }
}
