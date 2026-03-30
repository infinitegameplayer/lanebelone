import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Lane Belone',
    template: '%s | Lane Belone',
  },
  description:
    'Writer, speaker and guide. Exploring the infinite game and sharing breadcrumbs along the way.',
  metadataBase: new URL('https://lanebelone.com'),
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/lane-belone-logo-white.png',
    apple: '/images/lane-belone-logo-white.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lane Belone',
  url: 'https://lanebelone.com',
  description:
    'Writer, speaker and guide exploring the infinite game, clearer perception and personal freedom.',
  sameAs: [
    'https://www.instagram.com/increasefreedom/',
    'https://www.linkedin.com/in/lanebelone/',
    'https://www.facebook.com/increasefreedom',
    'https://lanebelone.substack.com/',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} suppressHydrationWarning>
        <Nav />
        <main>{children}</main>
        <Footer />
        <Script
          src="//js-na2.hsforms.net/forms/embed/v2.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
