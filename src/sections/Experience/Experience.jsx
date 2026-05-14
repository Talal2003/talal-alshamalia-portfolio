import experience from '../../data/experience.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'
import TimelineItem from '../../components/TimelineItem/TimelineItem.jsx'

export function Experience() {
  const { items, heading, subheading } = experience

  return (
    <SectionWrapper id="experience" eyebrow="Career" title={heading} subtitle={subheading}>
      <div className="space-y-0">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            role={item.role}
            company={item.company}
            location={item.location}
            startDate={item.startDate}
            endDate={item.endDate}
            highlights={item.highlights}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}

export default Experience
