import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'About Lane Belone'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return ogCard({
    eyebrow: 'About',
    title: 'Lane Belone.',
    body: 'Writer, speaker and guide. Former Green Beret. Founder of Side Quest HQ.',
  })
}
