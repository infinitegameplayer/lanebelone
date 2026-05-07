// Native Kingdom form configuration. Keyed by formName, mirrors the SQHQ
// pattern so both sites write to the same Kingdom Supabase data layer.
export type SourceSite = 'sqhq' | 'lanebelone' | 'igos' | 'direct' | 'hubspot_migrated'

export type NativeFormConfig = {
  sourceSite: SourceSite
  sourceForm: string
  contactTag?: string
  allowedOrigins: string[]
}

const LANEBELONE_ORIGINS = ['https://www.lanebelone.com', 'https://lanebelone.com']

export const FORM_CONFIG_BY_NAME: Record<string, NativeFormConfig> = {
  'lanebelone-newsletter': {
    sourceSite: 'lanebelone',
    sourceForm: 'newsletter_signup',
    contactTag: 'distillation_subscriber',
    allowedOrigins: LANEBELONE_ORIGINS,
  },
  'lanebelone-contact': {
    sourceSite: 'lanebelone',
    sourceForm: 'general_contact',
    contactTag: 'lanebelone_inquiry',
    allowedOrigins: LANEBELONE_ORIGINS,
  },
  'lanebelone-speaking': {
    sourceSite: 'lanebelone',
    sourceForm: 'speaking_inquiry',
    contactTag: 'speaking_inquirer',
    allowedOrigins: LANEBELONE_ORIGINS,
  },
}

export function lookupNativeFormConfig(formName: string): NativeFormConfig | undefined {
  return FORM_CONFIG_BY_NAME[formName]
}
