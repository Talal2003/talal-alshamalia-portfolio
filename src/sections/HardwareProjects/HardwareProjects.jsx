import { useState } from 'react'
import hardwareProjects from '../../data/hardwareProjects.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx'
import MediaModal from '../../components/MediaModal/MediaModal.jsx'

export function HardwareProjects() {
  const { items, heading, subheading } = hardwareProjects
  const [media, setMedia] = useState(null)

  return (
    <SectionWrapper id="hardware" eyebrow="Electronics" title={heading} subtitle={subheading}>
      <ul className="flex flex-wrap justify-center gap-6">
        {items.map((project) => (
          <li key={project.id} className="min-w-0 max-w-md flex-[1_1_min(100%,18rem)]">
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              imageAlt={project.imageAlt}
              to={`/hardware/${project.id}`}
              actions={[
                { label: 'Details', to: `/hardware/${project.id}` },
                {
                  label: 'Watch demo',
                  onClick: () =>
                    setMedia({
                      type: 'youtube',
                      youtubeId: project.youtubeId,
                      title: `${project.title} demo`,
                    }),
                },
                project.award
                  ? {
                      label: 'Award',
                      onClick: () =>
                        setMedia({
                          type: 'image',
                          src: project.award.image,
                          alt: project.award.imageAlt,
                          title: 'Competition award',
                          caption: project.award.title,
                        }),
                    }
                  : null,
              ].filter(Boolean)}
            />
          </li>
        ))}
      </ul>
      <MediaModal media={media} onClose={() => setMedia(null)} />
    </SectionWrapper>
  )
}

export default HardwareProjects
