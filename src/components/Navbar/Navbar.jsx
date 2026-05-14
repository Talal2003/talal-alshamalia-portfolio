import { useEffect, useState } from 'react'
import { cn } from '../../utils/cn.js'
import { NAV_ITEMS, NAV_SECTION_IDS } from '../../styles/theme.js'
import { useActiveSection } from '../../hooks/useActiveSection.js'

const sectionIds = NAV_SECTION_IDS
function scrollToId(id) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onNavigate = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-accent-subtle/40 bg-primary/80 backdrop-blur-md relative">
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site sections"
            className="absolute inset-x-0 top-full z-[41] max-h-[min(70vh,calc(100dvh-3.5rem))] overflow-y-auto border-b border-accent-subtle/40 bg-primary/98 shadow-lg backdrop-blur-md lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-0.5 p-3 sm:px-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate(item.id)
                    }}
                    className={cn(
                      'block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-secondary/60 hover:text-zinc-100',
                      activeId === item.id && 'border border-accent bg-secondary/40 text-accent'
                    )}
                    aria-current={activeId === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <nav
        className="relative z-50 mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="group flex min-w-0 flex-1 items-center gap-2 rounded-lg focus-visible:outline-offset-4 sm:flex-initial"
          onClick={(e) => {
            e.preventDefault()
            onNavigate('home')
          }}
        >
          <img
            src="/talal.svg"
            alt="Logo"
            className="h-9 w-9"
          />
          <span className="truncate font-display text-sm font-semibold tracking-tight text-zinc-100 sm:text-base">
            Talal Alshamalia
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(item.id)
                }}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-100',
                  activeId === item.id && 'border border-accent text-accent'
                )}
                aria-current={activeId === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-accent-subtle bg-secondary/60 p-2 text-zinc-100 transition hover:border-accent/40 hover:bg-secondary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            {open ? (
              <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>
    </header>
  )
}

export default Navbar
