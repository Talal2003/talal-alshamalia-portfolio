import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import certificates from '../../data/certificates.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'
import MediaModal from '../../components/MediaModal/MediaModal.jsx'

export function Certificates() {
  const reduceMotion = useReducedMotion()
  const { items, heading, subheading } = certificates
  const [media, setMedia] = useState(null)

  return (
    <SectionWrapper id="certificates" eyebrow="Credentials" title={heading} subtitle={subheading}>
      <ul className="flex flex-wrap justify-center gap-5">
        {items.map((cert, index) => (
          <motion.li
            key={cert.id}
            className="min-w-0 max-w-md flex-[1_1_min(100%,18rem)]"
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
              {cert.pdf ? (
                <button
                  type="button"
                  onClick={() =>
                    setMedia({
                      type: 'pdf',
                      src: cert.pdf,
                      title: `${cert.name} certificate`,
                    })
                  }
                  className="inline-flex self-start text-sm font-semibold text-accent underline-offset-4 hover:underline"
                >
                  View certificate
                </button>
              ) : (
                <span className="text-xs text-zinc-600">Certificate on file</span>
              )}
            </article>
          </motion.li>
        ))}
      </ul>
      <MediaModal media={media} onClose={() => setMedia(null)} />
    </SectionWrapper>
  )
}

export default Certificates