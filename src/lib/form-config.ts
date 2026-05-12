// Native Kingdom form configuration. Keyed by formName, mirrors the SQHQ
// pattern so both sites write to the same Kingdom Supabase data layer.
export type SourceSite = 'sqhq' | 'lanebelone' | 'igos' | 'direct' | 'hubspot_migrated'

export type NativeFormConfig = {
  sourceSite: SourceSite
  sourceForm: string
  contactTag?: string
  // Newsletter opt-in posture for this form.
  //   'implicit'         — calling the form is the consent. Helper fires on every submit.
  //   'explicit-checkbox'— helper fires only when submitBody.newsletterConsent === true.
  //   undefined          — form has no newsletter opt-in surface.
  // The applyNewsletterOptIn helper owns the distillation_subscriber tag,
  // Resend audience add and welcome email.
  newsletterOptIn?: 'implicit' | 'explicit-checkbox'
  allowedOrigins: string[]
}

const LANEBELONE_ORIGINS = ['https://www.lanebelone.com', 'https://lanebelone.com']

export const FORM_CONFIG_BY_NAME: Record<string, NativeFormConfig> = {
  'lanebelone-newsletter': {
    sourceSite: 'lanebelone',
    sourceForm: 'newsletter_signup',
    newsletterOptIn: 'implicit',
    allowedOrigins: LANEBELONE_ORIGINS,
  },
  'lanebelone-contact': {
    sourceSite: 'lanebelone',
    sourceForm: 'general_contact',
    contactTag: 'lanebelone_inquiry',
    newsletterOptIn: 'explicit-checkbox',
    allowedOrigins: LANEBELONE_ORIGINS,
  },
  'lanebelone-speaking': {
    sourceSite: 'lanebelone',
    sourceForm: 'speaking_inquiry',
    contactTag: 'speaking_inquirer',
    newsletterOptIn: 'explicit-checkbox',
    allowedOrigins: LANEBELONE_ORIGINS,
  },
}

export function lookupNativeFormConfig(formName: string): NativeFormConfig | undefined {
  return FORM_CONFIG_BY_NAME[formName]
}
