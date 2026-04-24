import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for lanebelone.com.',
  alternates: {
    canonical: 'https://www.lanebelone.com/terms',
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'Terms of Use · Lane Belone',
    description: 'Terms of use for lanebelone.com.',
    url: 'https://www.lanebelone.com/terms',
    images: [{ url: '/images/lane-machu-picchu-square.webp', width: 1200, height: 1200, alt: 'Lane Belone' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use · Lane Belone',
    description: 'Terms of use for lanebelone.com.',
    images: ['/images/lane-machu-picchu-square.webp'],
  },
}

export default function TermsPage() {
  return (
    <section className="section pt-40">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Terms of Use
        </h1>
        <p className="text-parchment/40 text-sm mb-12" style={{ fontFamily: 'var(--font-body)' }}>
          Effective date: April 2026
        </p>

        <div className="flex flex-col gap-10 text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Site use
            </h2>
            <p>
              This site is operated by Lane Belone. By accessing this site, you agree to use it for lawful purposes only. You may not copy, reproduce or redistribute content from this site without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Site operator
            </h2>
            <p>
              This site is operated by Lane Belone. By accessing this site or engaging through it, you are engaging with Lane Belone directly.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Speaking and content
            </h2>
            <p>
              Inquiries about speaking engagements submitted through this site do not constitute a booking. Engagement terms are agreed upon separately in writing.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              No warranties
            </h2>
            <p>
              The information on this site is provided as-is, without warranties of any kind. Lane Belone makes no guarantees about the accuracy, completeness or suitability of the content for any particular purpose.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, Lane Belone shall not be liable for any indirect, incidental or consequential damages arising from your use of this site or any services described on it.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-parchment/90 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Contact
            </h2>
            <p>
              Questions about these terms can be directed to{' '}
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
