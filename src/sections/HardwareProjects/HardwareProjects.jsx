import hardwareProjects from '../../data/hardwareProjects.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx'

export function HardwareProjects() {
  const { items, heading, subheading } = hardwareProjects

  return (
    <SectionWrapper id="hardware" eyebrow="Electronics" title={heading} subtitle={subheading}>
      <ul className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((project) => (
          <li key={project.id}>
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              imageAlt={project.imageAlt}
            />
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

export default HardwareProjects
