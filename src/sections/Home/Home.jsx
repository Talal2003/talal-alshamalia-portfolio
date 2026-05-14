import { motion, useReducedMotion } from 'framer-motion'
import home from '../../data/home.js'
import { homeAsciiPortrait } from '../../data/homeAsciiPortrait.js'
import { cn } from '../../utils/cn.js'

export function Home() {
  const reduceMotion = useReducedMotion()
  const mailHref = `mailto:${home.email}`
  const showPhoto = Boolean(home.photo)

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative scroll-mt-24 overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32"
    >
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,min(100%,440px))] sm:items-center sm:gap-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16 lg:px-8">
        <div>
          <motion.p
            className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-accent-muted"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Portfolio
          </motion.p>
          <motion.h1
            id="home-heading"
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {home.name}
          </motion.h1>
          <motion.p
            className="mt-3 text-lg font-medium text-accent sm:text-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {home.title}
          </motion.p>
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {home.summary}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href={mailHref}
              className={cn(
                'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold',
                'bg-accent text-primary shadow-glow transition hover:bg-accent-strong'
              )}
            >
              {home.emailButtonLabel}
            </a>
          </motion.div>
        </div>

        <div className="max-h-[min(52vh,440px)] min-h-[200px] w-full overflow-auto overscroll-contain p-3 sm:max-h-[min(58vh,480px)] sm:p-4">
          <pre
            className="m-0 inline-block min-w-min font-mono text-[4px] leading-[1.12] tracking-tight text-accent/90 antialiased sm:text-[5.5px] md:text-[6.5px] lg:text-[7px]"
            aria-hidden
          >
            {homeAsciiPortrait}
          </pre>
        </div>
      </div>
    </section>
  )
}

export default Home
