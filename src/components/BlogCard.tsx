import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/f/${post.slug}`}
      className="group block rounded-lg overflow-hidden border border-parchment/10 hover:border-parchment/25 transition-colors duration-300"
    >
      {post.heroImage && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        <p
          className="text-xs text-parchment/40 mb-2 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {formatDate(post.date)}
        </p>
        <h2
          className="text-xl text-parchment/90 leading-snug mb-2 group-hover:text-parchment transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {post.title}
        </h2>
        {post.description && (
          <p
            className="text-sm text-parchment/50 leading-relaxed line-clamp-3"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {post.description}
          </p>
        )}
      </div>
    </Link>
  )
}
