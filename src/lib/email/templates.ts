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

function welcomeSignoff() {
  return `${p('With Joyful Sovereignty,')}${p('Lane', `margin-bottom:0;color:${ACCENT}`)}`
}

function bold(text: string) {
  return `<strong style="color:#f5f0e8">${text}</strong>`
}

function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px 0"><tr><td style="border-radius:6px;background-color:${ACCENT}"><a href="${href}" style="display:inline-block;padding:13px 28px;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;color:#0a1410;text-decoration:none;border-radius:6px">${label}</a></td></tr></table>`
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
}: {
  firstName?: string
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
`,
  }
}

// ─── Article Welcome Email ──────────────────────────────────────────
//
// Triggered by applyArticleOptIn after any form-side or one-click opt-in
// to the Articles list. Confirms the subscription and sets the expectation
// for full essays in the inbox. Sent from howdy@lanebelone.com.

export function articleWelcomeEmail({
  firstName,
}: {
  firstName?: string
}) {
  const opening = firstName && firstName.trim().length > 0
    ? `Howdy, ${firstName.trim()}.`
    : 'Howdy.'
  return {
    subject: "You're in. New writing, straight to you.",
    previewText: 'The whole essay in your inbox, with a little something at the end.',
    html: `
${p(opening)}
${p("You just opened a door. From here on, my new writing lands right here in your inbox. The whole piece, not a teaser, so you never have to click out to read.")}
${p("Every one closes with a small breadcrumb at the bottom. A song, a side quest, a little surprise. Always worth a look.")}
${p("Glad you're here.")}
${welcomeSignoff()}
`,
  }
}

// ─── Personal List Nurture Sequence ─────────────────────────────────
//
// Two beats beyond the Day-0 welcome, sent by /api/cron/personal-nurture to
// forward joiners of the Personal list. Day 3 is a pure-human hello: a
// reply-invitation with no links and no ask. Day 9 is a soft one-click
// invitation to also receive the writing, evergreen and never a hard ask.
// This is Lane's Personal-list email voice. See the Site Voice Codex
// Personal-list register. Curiosity that carries itself: show, never tell.

export function personalHelloEmail({
  firstName,
}: {
  firstName?: string
}) {
  const opening = firstName && firstName.trim().length > 0
    ? `Howdy ${firstName.trim()},`
    : 'Howdy,'
  return {
    subject: 'How you doing?',
    previewText: 'What brought you my way?',
    html: `
${p(opening)}
${p('A few days back you said yes to hearing from me.')}
${p('So, how you doing? What brought you my way and what drew you to my stuff?')}
${p("I read every reply myself. I'd love to hear yours.")}
${welcomeSignoff()}
`,
  }
}

export function personalArticleInviteEmail({
  firstName,
  optInUrl,
  blogUrl,
}: {
  firstName?: string
  optInUrl: string
  blogUrl: string
}) {
  const opening = firstName && firstName.trim().length > 0
    ? `Howdy ${firstName.trim()},`
    : 'Howdy,'
  return {
    subject: 'Want my writing in your inbox too?',
    previewText: 'Different perspectives, straight to your inbox.',
    html: `
${p(opening)}
${p("Every so often I put words to what I'm seeing. Different angles on sovereignty, the Infinite Game, building a life that's actually yours.")}
${p("If you'd like those landing in your inbox too, there's an easy way to receive them.")}
${button(optInUrl, 'Yes, send me the writing')}
${p("One click and you're in.", 'font-size:14px;color:rgba(245,240,232,0.55)')}
${p("You'll still get my personal updates either way. Looking forward to connecting when we do.")}
${welcomeSignoff()}
${p(`P.S. Want to wander through a few first? They all live <a href="${blogUrl}" style="color:${ACCENT};text-decoration:underline">here</a>.`, 'font-size:14px;color:rgba(245,240,232,0.55)')}
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
