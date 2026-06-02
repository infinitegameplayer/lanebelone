import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Speaking · Lane Belone'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return ogCard({
    eyebrow: 'Speaking',
    title: 'Keynotes, workshops and retreats.',
    body: 'On the Infinite Game, perception, flow and leadership.',
  })
}
