import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Joyful Sovereignty · Lane Belone'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return ogCard({
    eyebrow: 'Joyful Sovereignty',
    title: 'A way of moving.',
    body: 'Life inhabited fully, from the inside, with spaciousness, play and genuine peace.',
  })
}
