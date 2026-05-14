import education from '../../data/education.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'
import TimelineItem from '../../components/TimelineItem/TimelineItem.jsx'

export function Education() {
  const { items, heading, subheading } = education

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
          />
        ))}
      </div>
    </SectionWrapper>
  )
}

export default Education
