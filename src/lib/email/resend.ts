import { Resend } from 'resend'

const getResend = () => new Resend(process.env.RESEND_API_KEY)

const FROM = 'Lane Belone <howdy@lanebelone.com>'
const REPLY_TO = 'howdy@lanebelone.com'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  previewText?: string
  // When provided, renders a "one-click unsubscribe" link in the email
  // footer next to the brand line. Used by the personal-list welcome email
  // and any future opt-in-based send that needs a manual unsubscribe surface.
  unsubscribeUrl?: string
}

export async function sendEmail({ to, subject, html, previewText, unsubscribeUrl }: SendEmailOptions) {
  const resend = getResend()
  const fullHtml = buildEmailHtml({ subject, html, previewText, unsubscribeUrl })

  const { data, error } = await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to,
    subject,
    html: fullHtml,
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }
  return data
}

function buildEmailHtml({
  html,
  previewText,
  unsubscribeUrl,
}: {
  subject: string
  html: string
  previewText?: string
  unsubscribeUrl?: string
}) {
  const preview = previewText
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${previewText}</div>`
    : ''
  const unsubscribeFragment = unsubscribeUrl
    ? ` &middot; <a href="${unsubscribeUrl}" style="color:rgba(201,168,76,0.6);text-decoration:none">one-click unsubscribe</a>`
    : ''

  // Lanebelone palette: dark with gold accent. Mirrors the visual register of
  // the site so the auto-response feels continuous with the form surface.
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background-color:#0a1410;color:#f5f0e8;font-family:'Georgia',serif;font-size:17px;line-height:1.75">
  ${preview}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a1410">
    <tr>
      <td align="center" style="padding:40px 20px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
          <tr>
            <td style="color:#f5f0e8;font-family:Georgia,serif;font-size:17px;line-height:1.75">
              ${html}
            </td>
          </tr>
          <tr>
            <td style="padding-top:40px;border-top:1px solid rgba(245,240,232,0.07)">
              <p style="margin:0;font-size:13px;color:rgba(245,240,232,0.3);font-family:Arial,sans-serif">
                Lane Belone &middot; <a href="https://lanebelone.com" style="color:rgba(201,168,76,0.6);text-decoration:none">lanebelone.com</a>${unsubscribeFragment}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
