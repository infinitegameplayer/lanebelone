'use client'

import { useEffect, useId } from 'react'

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          region: string
          portalId: string
          formId: string
          target: string
          css?: string
          cssRequired?: string
          onFormReady?: () => void
          onFormSubmitted?: () => void
        }) => void
      }
    }
  }
}

interface HubSpotFormProps {
  formId: string
  portalId?: string
}

export default function HubSpotForm({
  formId,
  portalId = '23478458',
}: HubSpotFormProps) {
  const uid = useId().replace(/:/g, '')
  const targetId = `hs-form-${uid}`

  useEffect(() => {
    if (!formId) return

    const formCss = `
      body { background: transparent; margin: 0; font-family: 'Inter', system-ui, sans-serif; }
      .hs-form-field { margin-bottom: 1.25rem; }
      .hs-form-field label { display: block; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(245,240,232,0.5); margin-bottom: 0.4rem; }
      .hs-form input[type="text"], .hs-form input[type="email"], .hs-form textarea {
        width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
        border-radius: 8px; color: #f5f0e8; font-family: 'Inter', system-ui, sans-serif;
        font-size: 0.95rem; padding: 0.7rem 1rem; box-sizing: border-box; outline: none;
      }
      .hs-form input[type="text"]:focus, .hs-form input[type="email"]:focus, .hs-form textarea:focus { border-color: rgba(201,168,76,0.5); }
      .hs-form input::placeholder, .hs-form textarea::placeholder { color: rgba(245,240,232,0.25); }
      .hs-form textarea { min-height: 90px; resize: vertical; background: rgba(255,255,255,0.05) !important; color: #f5f0e8 !important; }
      .hs-button, input[type="submit"], input.hs-button {
        display: inline-block !important;
        background-image: linear-gradient(135deg, #c8973a 0%, #f5d88a 45%, #d4a040 65%, #c8973a 100%) !important;
        background-size: 220% 100% !important; background-position: right center !important;
        background-color: transparent !important;
        color: #0f1a12 !important; font-family: 'Inter', system-ui, sans-serif !important; font-size: 0.875rem !important;
        font-weight: 500 !important; letter-spacing: 0.07em !important; text-transform: uppercase !important;
        padding: 0.75rem 1.75rem !important; border-radius: 8px !important; border: none !important; cursor: pointer !important;
        transition: background-position 0.5s ease, box-shadow 0.3s ease, transform 0.2s ease !important;
        margin-top: 0.5rem !important; width: auto !important; -webkit-appearance: none !important; appearance: none !important;
      }
      .hs-button:hover, input[type="submit"]:hover { background-position: left center !important; box-shadow: 0 4px 18px rgba(245,216,138,0.18) !important; transform: translateY(-1px) !important; }
      .hs-error-msgs { list-style: none; margin-top: 0.3rem; }
      .hs-error-msgs label { color: rgba(220,80,80,0.85); font-size: 0.78rem; text-transform: none; letter-spacing: 0; }
      .submitted-message { color: rgba(245,240,232,0.7); font-size: 0.95rem; line-height: 1.6; padding: 1rem 0; }
      .hs-richtext, .legal-consent-container { font-size: 0.78rem; color: rgba(245,240,232,0.35); }
      fieldset { max-width: 100% !important; border: none; padding: 0; margin: 0; }
    `

    const tryCreate = () => {
      if (window.hbspt?.forms?.create) {
        window.hbspt.forms.create({
          region: 'na2',
          portalId,
          formId,
          target: `#${targetId}`,
          css: '',
          cssRequired: formCss,
        })
      } else {
        setTimeout(tryCreate, 150)
      }
    }

    tryCreate()
  }, [formId, portalId, targetId])

  return (
    <div className="hs-form-override">
      <div id={targetId} />
    </div>
  )
}
