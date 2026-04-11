export default function NotFound() {
  return (
    <section className="section min-h-[60vh] flex flex-col justify-center">
      <p
        className="text-parchment/40 text-sm uppercase tracking-widest mb-4"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        404
      </p>
      <h1
        className="text-4xl md:text-6xl mb-6"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Page not found.
      </h1>
      <p
        className="text-parchment/60 mb-8 max-w-md leading-relaxed"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        That path doesn&apos;t exist. The writing, speaking and ideas are still here.
      </p>
      <a href="/" className="btn-gold self-start">
        Back to home
      </a>
    </section>
  )
}
