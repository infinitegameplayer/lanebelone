interface Props {
  variant?: 'slim' | 'full'
}

export default function SubstackSubscribeEmbed({ variant = 'full' }: Props) {
  const height = variant === 'slim' ? 72 : 320

  return (
    <div
      className="w-full max-w-2xl mx-auto my-8"
      aria-label="Subscribe to Lane Belone's Substack"
    >
      <iframe
        src="https://lanebelone.substack.com/embed"
        title="Subscribe to Lane Belone on Substack"
        width="100%"
        height={height}
        style={{ border: 'none', background: 'transparent' }}
        scrolling="no"
      />
    </div>
  )
}
