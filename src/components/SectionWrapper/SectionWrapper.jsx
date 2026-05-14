import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/cn.js'

/**
 * @param {object} props
 * @param {string} props.id — DOM id for anchor navigation
 * @param {string} [props.eyebrow]
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 */
export function SectionWrapper({ id, eyebrow, title, subtitle, children, className }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('relative scroll-mt-24 py-16 sm:py-20 lg:py-24', className)}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? false : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-subtle to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl sm:mb-14">
          {eyebrow ? (
            <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent-muted">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={`${id}-heading`}
            className="font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-base leading-relaxed text-zinc-400 sm:text-lg">{subtitle}</p>
          ) : null}
        </header>
        {children}
      </div>
    </motion.section>
  )
}

export default SectionWrapper
