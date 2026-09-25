import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AmbientPulse from '@/components/AmbientPulse'
import { PostHogProvider } from './providers'
import { PostHogPageView } from './PostHogPageView'
import { CrossSiteLinkTracker } from '@/components/CrossSiteLinkTracker'
import { UmamiAnalytics } from '@/components/UmamiAnalytics'
import { personJsonLd } from '@/lib/identity'

export const metadata: Metadata = {
  title: {
    default: 'Lane Belone | Writer on the Infinite Game',
    template: '%s | Lane Belone',
  },
  description:
    'Lane Belone is a writer on the Infinite Game, a former Green Beret and co-author of Unleash Your Humble Alpha. His work centers on the Infinite Player. Start free with One Alive Thing.',
  metadataBase: new URL('https://www.lanebelone.com'),
  alternates: {
    types: {
      'application/rss+xml': 'https://www.lanebelone.com/rss.xml',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'Lane Belone | Writer on the Infinite Game',
    description: 'Lane Belone is a writer on the Infinite Game, a former Green Beret and co-author of Unleash Your Humble Alpha. His work centers on the Infinite Player. Start free with One Alive Thing.',
    url: 'https://www.lanebelone.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lane Belone | Writer on the Infinite Game',
    description: 'Lane Belone is a writer on the Infinite Game, a former Green Beret and co-author of Unleash Your Humble Alpha. His work centers on the Infinite Player. Start free with One Alive Thing.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
  },
  icons: {
    icon: '/images/lane-belone-icon-color.png',
    apple: '/images/lane-belone-icon-color.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="describedby" href="https://www.lanebelone.com/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <PostHogProvider>
        <body style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} suppressHydrationWarning>
          <Suspense>
            <PostHogPageView />
          </Suspense>
          <CrossSiteLinkTracker />
          <UmamiAnalytics />
          <AmbientPulse />
          <Nav />
          <main>{children}</main>
          <Footer />
        </body>
      </PostHogProvider>
    </html>
  )
}
