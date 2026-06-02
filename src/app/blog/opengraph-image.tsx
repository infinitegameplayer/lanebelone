import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Writing · Lane Belone'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return ogCard({
    eyebrow: 'Writing',
    title: 'Breadcrumbs along the way.',
    body: 'Essays on the Infinite Game, clearer perception and the art of living freely.',
  })
}
