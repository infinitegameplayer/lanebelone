// Auto-response confirmation emails for native Kingdom forms on lanebelone.com.
// One handler per formName routed by /api/form-submit after the Supabase
// write succeeds. Suppression: skip the send if the contact has
// unsubscribed=true. See Form Architecture Codex for the canonical pattern.

const ACCENT = '#c9a84c'
const MUTED = 'rgba(245,240,232,0.45)'

function p(text: string, style = '') {
  return `<p style="margin:0 0 16px 0;${style}">${text}</p>`
}

function signoff() {
  return `${p('Talk soon,')}${p('Lane', `margin-bottom:0;color:${ACCENT}`)}`
}

function welcomeSignoff() {
  return `${p('With Joyful Sovereignty,')}${p('Lane', `margin-bottom:0;color:${ACCENT}`)}`
}

function bold(text: string) {
  return `<strong style="color:#f5f0e8">${text}</strong>`
}

function greeting(firstName?: string): string {
  return firstName && firstName.trim().length > 0 ? `Hey ${firstName.trim()},` : 'Hey,'
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

// ─── Newsletter Welcome Email ───────────────────────────────────────
//
// Triggered by the shared applyNewsletterOptIn helper after any form-side
// consent or success-page button click. Voice tells: no "newsletter", no
// "subscriber", no "join the community". Sent from howdy@lanebelone.com.

export function newsletterWelcomeEmail({
  firstName,
  unsubscribeUrl,
}: {
  firstName?: string
  unsubscribeUrl: string
}) {
  const opening = firstName && firstName.trim().length > 0
    ? `Howdy, ${firstName.trim()}.`
    : 'Howdy.'
  return {
    subject: "Howdy. (Yes, that's actually my email.)",
    previewText: 'You opted in. Brave.',
    html: `
${p(opening)}
${p('You opted in. Brave.')}
${p("Here's what you actually signed up for. Mostly what's most alive for me, a little personal, the kind of thing that might support you.")}
${p(`Two things to do real quick. Save ${bold('howdy@lanebelone.com')} to your contacts. Mark it as a favorite or trusted sender. That's the difference between landing in your inbox and quietly composting in the promotions tab.`)}
${p("No schedule. I send when there's something worth sending. Quiet stretches are part of the design (that's what I tell myself lol).")}
${p('Good to be in touch.')}
${welcomeSignoff()}
${p(`<a href="${unsubscribeUrl}" style="color:${MUTED};font-size:12px;text-decoration:underline">unsubscribe</a>`, `margin-top:32px;font-size:12px;color:${MUTED}`)}
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
