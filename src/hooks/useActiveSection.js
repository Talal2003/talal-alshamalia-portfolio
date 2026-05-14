import { useEffect, useState } from 'react'

/**
 * Tracks which section id is nearest the upper viewport while scrolling.
 * @param {string[]} sectionIds — top-to-bottom order on the page
 * @returns {string}
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    if (!sectionIds.length) return undefined

    const compute = () => {
      const marker = window.scrollY + Math.min(window.innerHeight * 0.22, 160)
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= marker + 1) current = id
      }
      setActiveId((prev) => (prev === current ? prev : current))
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [sectionIds])

  return activeId
}
