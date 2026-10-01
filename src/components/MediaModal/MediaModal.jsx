import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/cn.js'

function AwardImage({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div className="rounded-xl border border-accent-subtle bg-secondary/50 px-6 py-12 text-center text-sm leading-relaxed text-zinc-400">
        Award photo is not in the site files yet. Add it as{' '}
        <code className="text-accent">public/hardware-projects/polarized-window/award.webp</code>. The citation is shown
        below.
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt ?? ''}
      className="mx-auto max-h-[min(70vh,40rem)] w-auto max-w-full rounded-lg object-contain"
      onError={() => setFailed(true)}
    />
  )
}

function PdfPreview({ src, title }) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!src) {
      setStatus('missing')
      return undefined
    }
    let cancelled = false
    setStatus('loading')
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') ?? ''
        const looksLikePdf = res.ok && type.includes('pdf')
        if (!cancelled) setStatus(looksLikePdf ? 'ready' : 'missing')
      })
      .catch(() => {
        if (!cancelled) setStatus('missing')
      })
    return () => {
      cancelled = true
    }
  }, [src])

  if (status === 'loading') {
    return <p className="px-5 py-10 text-center text-sm text-zinc-400">Loading PDF…</p>
  }

  if (status === 'missing') {
    return (
      <p className="px-5 py-10 text-center text-sm leading-relaxed text-zinc-400">
        This PDF is not in the site files yet. Place it at{' '}
        <code className="text-accent">{src?.replace(/^\//, 'public/')}</code> and the button will open it here.
      </p>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <iframe title={title ?? 'PDF'} src={src} className="h-[min(70vh,40rem)] w-full bg-zinc-100" />
      <a
        href={src}
        target="_blank"
        rel="noreferrer noopener"
        className="border-t border-accent-subtle/40 px-4 py-2 text-center text-xs font-semibold text-accent hover:underline"
      >
        Open PDF in a new tab ↗
      </a>
    </div>
  )
}
function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return undefined
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers / non-secure contexts
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded-md border border-accent-subtle bg-secondary/60 px-2 py-1 text-xs font-semibold text-accent transition hover:border-accent/40 hover:bg-secondary"
    >
      <span aria-live="polite">{copied ? 'Copied ✔' : label}</span>
    </button>
  )
}
function CertificatePreview({ media }) {
  const { src, alt, credentialId, issuedDate, verifyUrl } = media

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6">
      <AwardImage src={src} alt={alt ?? 'Diploma'} />

      <dl className="grid gap-3 rounded-xl border border-accent-subtle/40 bg-secondary/40 p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-zinc-400">Credential ID</dt>
          <dd className="mt-1 flex items-center gap-2">
            <span className="min-w-0 select-all break-all font-mono text-zinc-50">
              {credentialId ?? '—'}
            </span>
            {credentialId ? (
              <CopyButton text={credentialId} label="Copy ID" />
            ) : null}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-zinc-400">Issued</dt>
          <dd className="mt-1 text-zinc-50">{issuedDate ?? '—'}</dd>
        </div>
      </dl>

      {verifyUrl ? (
        <a
          href={verifyUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="self-center rounded-lg border border-accent/40 bg-secondary/60 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-secondary hover:underline"
        >
          Validate Now ✔
        </a>
      ) : null}
    </div>
  )
}

/**
 * @param {object} props
 * @param {null | { type: 'youtube' | 'image' | 'pdf', title?: string, youtubeId?: string, src?: string, alt?: string, caption?: string }} props.media
 * @param {() => void} props.onClose
 */
export function MediaModal({ media, onClose }) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!media) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [media, onClose])

  if (!media) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/75 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-modal-title"
        className={cn(
          'relative z-[81] flex w-full max-h-[min(92vh,52rem)] flex-col overflow-hidden rounded-2xl border border-accent-subtle bg-primary shadow-2xl',
          media.type === 'youtube' ? 'max-w-4xl' : 'max-w-3xl'
        )}
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={reduceMotion ? false : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-accent-subtle/40 px-4 py-3 sm:px-5">
          <h2 id="media-modal-title" className="font-display text-base font-semibold text-zinc-50 sm:text-lg">
            {media.title ?? (media.type === 'youtube' ? 'Project demo' : 'Preview')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-accent-subtle bg-secondary/60 p-1.5 text-zinc-200 transition hover:border-accent/40 hover:bg-secondary"
          >
            <span className="sr-only">Close</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-secondary/20">
          {media.type === 'youtube' && media.youtubeId ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${media.youtubeId}?autoplay=1&rel=0`}
                title={media.title ?? 'YouTube demo'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : null}

          {media.type === 'youtube' && !media.youtubeId ? (
            <p className="px-5 py-10 text-center text-sm leading-relaxed text-zinc-400">
              The demo player is ready. Set <code className="text-accent">youtubeId</code> in{' '}
              <code className="text-accent">src/data/hardwareProjects.js</code> to the 11-character ID from the
              YouTube URL (the part after <code className="text-accent">v=</code>).
            </p>
          ) : null}

          {media.type === 'image' ? (
            <figure className="p-4 sm:p-6">
              <AwardImage src={media.src} alt={media.alt} />
              {media.caption ? (
                <figcaption className="mt-4 text-center text-sm leading-relaxed text-zinc-300">
                  {media.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          {media.type === 'pdf' ? <PdfPreview src={media.src} title={media.title} /> : null}
          {media.type === 'certificate' ? <CertificatePreview media={media} /> : null}
        </div>
      </motion.div>
    </div>
  )
}

export default MediaModal
