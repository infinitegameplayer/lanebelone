import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for lanebelone.com: how we collect, use and protect your information.',
  alternates: {
    canonical: 'https://www.lanebelone.com/privacy',
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'Privacy Policy · Lane Belone',
    description: 'Privacy policy for lanebelone.com: how we collect, use and protect your information.',
    url: 'https://www.lanebelone.com/privacy',
    images: [{ url: '/images/lane-machu-picchu-square.webp', width: 1200, height: 1200, alt: 'Lane Belone' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy · Lane Belone',
    description: 'Privacy policy for lanebelone.com: how we collect, use and protect your information.',
    images: ['/images/lane-machu-picchu-square.webp'],
  },
}

export default function PrivacyPage() {
  return (
    <section className="section pt-40">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Privacy Policy
        </h1>
        <p className="text-parchment/40 text-sm mb-12" style={{ fontFamily: 'var(--font-body)' }}>
          Effective date: March 2026
        </p>

        <div className="flex flex-col gap-10 text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              What we collect
            </h2>
            <p>
              When you submit an inquiry through our contact form, we collect the information you provide: your name, email address and the content of your message. This information is used solely to respond to your inquiry and assess whether there is a good fit for working together.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Cookies and analytics
            </h2>
            <p>
              This site may use basic, privacy-respecting analytics to understand how people are finding and using the site. We do not use invasive tracking, and we do not sell or share analytics data with third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Contact form data
            </h2>
            <p>
              Inquiry form submissions are handled through our CRM (HubSpot). By submitting a form, you agree that your information may be stored within HubSpot&apos;s systems for the purposes of managing our communication. HubSpot&apos;s own privacy policy applies to that data.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              We do not sell your data
            </h2>
            <p>
              We do not sell, rent or share your personal information with any third party for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Contact
            </h2>
            <p>
              If you have questions about this privacy policy or how your data is handled, you can reach us at{' '}
              <a href="mailto:howdy@lanebelone.com" className="underline underline-offset-4 text-parchment/80 hover:text-parchment transition-colors">
                howdy@lanebelone.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
