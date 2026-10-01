import { useCallback, useState } from 'react'
import education from '../../data/education.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'
import TimelineItem from '../../components/TimelineItem/TimelineItem.jsx'
import MediaModal from '../../components/MediaModal/MediaModal.jsx' // adjust path to where MediaModal lives

export function Education() {
  const { items, heading, subheading } = education
  const [media, setMedia] = useState(null)
  const closeModal = useCallback(() => setMedia(null), [])

  return (
    <SectionWrapper id="education" eyebrow="Academic" title={heading} subtitle={subheading}>
      <div className="space-y-0">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            role={item.degree}
            company={item.institution}
            location={item.location}
            startDate={item.startDate}
            endDate={item.endDate}
            highlights={[item.notes]}
            tags={item.tags}
            isLast={index === items.length - 1}
          >
            {item.diploma ? (
              <button
                type="button"
                onClick={() => setMedia(item.diploma)}
                className="rounded-lg border border-accent/40 bg-secondary/60 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-secondary hover:underline"
              >
                View diploma
              </button>
            ) : null}
          </TimelineItem>
        ))}
      </div>

      <MediaModal media={media} onClose={closeModal} />
    </SectionWrapper>
  )
}

export default Education