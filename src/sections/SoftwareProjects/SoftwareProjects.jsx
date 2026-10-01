import softwareProjects from '../../data/softwareProjects.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx'

export function SoftwareProjects() {
  const { items, heading, subheading } = softwareProjects

  return (
    <SectionWrapper id="software" eyebrow="Code" title={heading} subtitle={subheading}>
      <ul className="flex flex-wrap justify-center gap-6">
        {items.map((project) => (
          <li key={project.id} className="min-w-0 max-w-md flex-[1_1_min(100%,18rem)]">
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
