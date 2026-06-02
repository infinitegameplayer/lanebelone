import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Lane Belone. Writer, speaker and guide of the Infinite Game.'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return ogCard({
    eyebrow: 'Lane Belone',
    title: 'Writer, speaker and guide.',
    body: 'Exploring the Infinite Game and sharing breadcrumbs along the way.',
  })
}
