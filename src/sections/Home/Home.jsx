import { motion, useReducedMotion } from 'framer-motion'
import home from '../../data/home.js'
import { homeAsciiPortrait } from '../../data/homeAsciiPortrait.js'
import { accentText } from '../../utils/accentText.jsx'
import { cn } from '../../utils/cn.js'

export function Home() {
  const reduceMotion = useReducedMotion()
  const mailHref = `mailto:${home.email}`
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative scroll-mt-24 overflow-hidden pt-10 pb-16 max-lg:flex max-lg:min-h-[calc(100svh-4.75rem)] max-lg:flex-col max-lg:justify-center sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32"
    >
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 max-lg:justify-items-center lg:grid-cols-2 lg:items-center lg:justify-items-stretch lg:gap-16 lg:px-8">

        <div className="flex max-h-[min(52vh,440px)] min-h-[200px] w-full max-w-lg justify-center overflow-auto p-3 sm:max-h-[min(58vh,480px)] sm:p-4 lg:max-w-none">
          <pre
            className="m-0 inline-block min-w-min font-mono text-[4px] leading-[1.12] tracking-tight text-accent/90 antialiased sm:text-[5.5px] md:text-[6.5px] lg:text-[7px]"
            aria-hidden
          >
            {homeAsciiPortrait}
          </pre>
        </div>

        <div className="w-full max-w-xl max-lg:mx-auto max-lg:text-center lg:max-w-none lg:text-left">
          <motion.h1
            id="home-heading"
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:mt-0 lg:text-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {accentText(home.name)}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {accentText(home.summary)}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4 max-lg:justify-center"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href={mailHref}
              className={cn(
                'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold',
                'border border-accent text-accent bg-transparent transition hover:bg-accent/10'
              )}
            >
              {home.emailButtonLabel}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Home
