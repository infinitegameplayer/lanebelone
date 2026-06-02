import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email/resend'
import { personalHelloEmail, personalArticleInviteEmail } from '@/lib/email/templates'
import { signEmailToken } from '@/lib/unsubscribe-token'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// Personal List Nurture Sequence. Runs daily via Vercel Cron.
//
// A warm welcome for forward joiners of the Personal list. Two beats beyond
// the Day-0 welcome:
//
//   Stage 1, Day 3.  A pure-human hello. Reply-invitation, no links, no ask.
//   Stage 2, Day 9.  A soft one-click invitation to also receive the writing.
//
// Beat timing is relative to contacts.personal_joined_at, stamped by
// applyNewsletterOptIn the first time personal_subscriber lands. The
// pre-automation existing list has personal_joined_at = NULL and is filtered
// out, so only forward joiners ever enter the sequence.
//
// Stop condition: the moment a contact carries article_subscriber, the Day-9
// article invite goes silent. The stage advances without a send so the
// contact drops out of the candidate query cleanly.
//
// Soft-test affordances (both behind the CRON_SECRET auth gate):
//   ?preview=1   dry-run. Returns who is due and which beat, sends nothing,
//                advances nothing.
//   ?selftest=1  renders both beats and sends them to the soft-test inbox
//                with a [TEST] subject prefix. No real recipients, no state
//                change. Real email on a timer earns the extra confirmation.

const PERSONAL_TAG = 'personal_subscriber'
const ARTICLE_TAG = 'article_subscriber'
const FINAL_STAGE = 2

const PERSONAL_NURTURE_SCHEDULE = [
  { stage: 1, daysSinceJoin: 3 },
  { stage: 2, daysSinceJoin: 9 },
]

const SITE = 'https://lanebelone.com'
const BLOG_URL = `${SITE}/blog`
const SOFT_TEST_RECIPIENT = 'belone@tutamail.com'

type EmailTemplate = { subject: string; previewText?: string; html: string }

type Candidate = {
  email: string
  firstName: string
  currentStage: number
  joinedAt: number
  hasArticleTag: boolean
}

type CycleResult = { email: string; stage: number | string; status: string }

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = req.nextUrl

  // ─── Soft-test: render both beats to the soft-test inbox ──────────
  if (searchParams.get('selftest') === '1') {
    const results: CycleResult[] = []
    for (const stage of [1, 2]) {
      try {
        const template = buildBeat(stage, SOFT_TEST_RECIPIENT, 'Lane')
        if (!template) continue
        const token = signEmailToken(SOFT_TEST_RECIPIENT)
        const unsubUrl = `${SITE}/unsubscribe?email=${encodeURIComponent(SOFT_TEST_RECIPIENT)}&token=${token}`
        await sendEmail({
          to: SOFT_TEST_RECIPIENT,
          subject: `[TEST] ${template.subject}`,
          html: template.html,
          previewText: template.previewText,
          unsubscribeUrl: unsubUrl,
        })
        results.push({ email: SOFT_TEST_RECIPIENT, stage, status: 'sent' })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        results.push({ email: SOFT_TEST_RECIPIENT, stage, status: `error: ${message}` })
      }
    }
    return NextResponse.json({ mode: 'selftest', results })
  }

  const candidates = await fetchCandidates()
  const preview = searchParams.get('preview') === '1'
  const now = Date.now()
  const results: CycleResult[] = []

  for (const c of candidates) {
    const daysSince = Math.floor((now - c.joinedAt) / (1000 * 60 * 60 * 24))
    const nextStage = PERSONAL_NURTURE_SCHEDULE.find(
      (s) => s.stage === c.currentStage + 1 && daysSince >= s.daysSinceJoin
    )
    if (!nextStage) continue

    // Stop condition. A contact who already joined the Article list skips the
    // Day-9 invite. Advance the stage anyway so they leave the candidate pool.
    if (nextStage.stage === 2 && c.hasArticleTag) {
      if (!preview) await advanceStage(c.email, nextStage.stage)
      results.push({ email: c.email, stage: nextStage.stage, status: 'skipped-already-article' })
      continue
    }

    if (preview) {
      results.push({ email: c.email, stage: nextStage.stage, status: `due (day ${daysSince})` })
      continue
    }

    try {
      const template = buildBeat(nextStage.stage, c.email, c.firstName)
      if (!template) continue

      const token = signEmailToken(c.email)
      const unsubUrl = `${SITE}/unsubscribe?email=${encodeURIComponent(c.email)}&token=${token}`
      await sendEmail({
        to: c.email,
        subject: template.subject,
        html: template.html,
        previewText: template.previewText,
        unsubscribeUrl: unsubUrl,
      })

      await advanceStage(c.email, nextStage.stage)
      results.push({ email: c.email, stage: nextStage.stage, status: 'sent' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error(`Personal nurture error for ${c.email} (stage ${nextStage.stage}):`, message)
      results.push({ email: c.email, stage: nextStage.stage, status: `error: ${message}` })
    }
  }

  return NextResponse.json({
    mode: preview ? 'preview' : 'run',
    processed: results.length,
    results,
  })
}

function buildBeat(stage: number, email: string, firstName: string): EmailTemplate | null {
  if (stage === 1) return personalHelloEmail({ firstName })
  if (stage === 2) {
    const token = signEmailToken(email)
    const optInUrl = `${SITE}/api/newsletter/articles-optin?email=${encodeURIComponent(email)}&token=${token}`
    return personalArticleInviteEmail({ firstName, optInUrl, blogUrl: BLOG_URL })
  }
  return null
}

async function fetchCandidates(): Promise<Candidate[]> {
  const supabase = getSupabaseAdmin()
  const { data: contacts, error } = await supabase
    .from('contacts')
    .select('email, first_name, personal_nurture_stage, personal_joined_at, tags, unsubscribed')
    .contains('tags', [PERSONAL_TAG])
    .eq('unsubscribed', false)
    .not('personal_joined_at', 'is', null)
    .lt('personal_nurture_stage', FINAL_STAGE)
  if (error) {
    console.error('Supabase personal nurture read failed:', error.message)
    return []
  }

  const candidates: Candidate[] = []
  for (const c of contacts ?? []) {
    if (!c.personal_joined_at) continue
    const tags: string[] = Array.isArray(c.tags) ? c.tags : []
    candidates.push({
      email: c.email,
      firstName: c.first_name || 'there',
      currentStage: c.personal_nurture_stage ?? 0,
      joinedAt: new Date(c.personal_joined_at).getTime(),
      hasArticleTag: tags.includes(ARTICLE_TAG),
    })
  }
  return candidates
}

async function advanceStage(email: string, stage: number) {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase
    .from('contacts')
    .update({ personal_nurture_stage: stage })
    .eq('email', email.toLowerCase())
  if (error) throw new Error(`Supabase personal_nurture_stage update failed: ${error.message}`)
}
