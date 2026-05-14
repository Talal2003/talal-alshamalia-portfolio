import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/cn.js'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string[]} props.tags
 * @param {{ label: string, href: string, external?: boolean }[]} [props.links]
 * @param {string} [props.image]
 * @param {string} [props.imageAlt]
 * @param {string} [props.className]
 */
export function ProjectCard({ title, description, tags, links = [], image, imageAlt, className }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-accent-subtle bg-secondary/40 backdrop-blur-sm transition-colors hover:border-accent/35 hover:bg-secondary/70',
        className
      )}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    >
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-primary">
          <img
            src={image}
            alt={imageAlt ?? ''}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
        </div>
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-secondary to-primary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(240_214_182/0.35),transparent_55%)] opacity-40 mix-blend-screen" />
          <div className="absolute bottom-4 left-4 font-display text-2xl font-semibold text-accent/90">
            {title.slice(0, 1)}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400 sm:text-base">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-accent-subtle bg-primary/60 px-2.5 py-0.5 text-xs font-medium text-accent-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        {links.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 transition hover:text-accent-strong hover:underline"
              >
                {link.label}
                {link.external ? (
                  <span className="text-xs opacity-70" aria-hidden>
                    ↗
                  </span>
                ) : null}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  )
}

export default ProjectCard
