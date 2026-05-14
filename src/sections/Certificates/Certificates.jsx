import { motion, useReducedMotion } from 'framer-motion'
import certificates from '../../data/certificates.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'

export function Certificates() {
  const reduceMotion = useReducedMotion()
  const { items, heading, subheading } = certificates

  return (
    <SectionWrapper id="certificates" eyebrow="Credentials" title={heading} subtitle={subheading}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {items.map((cert, index) => (
          <motion.li
            key={cert.id}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <article className="flex h-full flex-col rounded-2xl border border-accent-subtle bg-secondary/40 p-5 transition hover:border-accent/35 hover:bg-secondary/70 sm:p-6">
              <h3 className="font-display text-base font-semibold leading-snug text-zinc-50">{cert.name}</h3>
              <p className="mt-3 text-sm font-medium text-accent">{cert.issuer}</p>
              <p className="mt-1 font-mono text-xs text-zinc-500">{cert.date}</p>
              <div className="mt-4 flex-1" />
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex text-sm font-semibold text-accent underline-offset-4 hover:underline"
                >
                  View issuer ↗
                </a>
              ) : (
                <span className="text-xs text-zinc-600">Certificate on file</span>
              )}
            </article>
          </motion.li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

export default Certificates
