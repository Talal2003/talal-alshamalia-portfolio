import softwareProjects from '../../data/softwareProjects.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx'

export function SoftwareProjects() {
  const { items, heading, subheading } = softwareProjects

  return (
    <SectionWrapper id="software" eyebrow="Code" title={heading} subtitle={subheading}>
      <ul className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((project) => (
          <li key={project.id}>
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              imageAlt={project.imageAlt}
              links={project.links}
            />
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

export default SoftwareProjects
