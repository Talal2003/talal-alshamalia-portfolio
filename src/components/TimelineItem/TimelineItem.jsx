import { cn } from '../../utils/cn.js'

/**
 * @param {object} props
 * @param {string} props.role
 * @param {string} props.company
 * @param {string} props.startDate
 * @param {string} props.endDate
 * @param {string} [props.location]
 * @param {string[]} props.highlights
 * @param {boolean} [props.isLast]
 */
export function TimelineItem({ role, company, location, startDate, endDate, highlights, isLast }) {
  return (
    <article className={cn('relative pb-12 sm:pb-16', !isLast && 'border-b border-accent-subtle/30')}>
      <div className="grid gap-6 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-10">
        <div className="pt-0.5">
          <p className="font-mono text-xs text-accent-muted sm:text-sm">
            {startDate} — {endDate}
          </p>
          {location ? <p className="mt-2 text-sm text-zinc-500">{location}</p> : null}
        </div>

        <div className="relative pl-6 sm:pl-8">
          <div
            className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-primary shadow-[0_0_0_3px_rgb(21_21_21)] sm:top-2"
            aria-hidden
          />
          <h3 className="text-lg font-semibold text-zinc-50 sm:text-xl">{role}</h3>
          <p className="mt-1 text-sm font-medium text-accent sm:text-base">{company}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-accent sm:text-base">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default TimelineItem
