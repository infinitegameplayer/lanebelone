import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'The Library · Lane Belone'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return ogCard({
    eyebrow: 'Library',
    title: 'The Library.',
    body: 'Playbooks, Field Guides, Collections and a free ebook. Tools for playing the game of your life more beautifully.',
  })
}
