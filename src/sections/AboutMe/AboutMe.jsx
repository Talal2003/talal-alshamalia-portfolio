import about from '../../data/about.js'
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper.jsx'

export function AboutMe() {
  return (
    <SectionWrapper id="about" eyebrow="Profile" title={about.heading} subtitle={about.lead}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div className="space-y-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
          {about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="font-display text-lg font-semibold text-zinc-100">{about.skills.title}</h3>
            <ul className="mt-4 space-y-6">
              {about.skills.groups.map((group) => (
                <li key={group.name}>
                  <p className="text-sm font-semibold text-accent">{group.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {group.items.join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-zinc-100">{about.interests.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.interests.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-accent-subtle bg-primary/50 px-3 py-1 text-sm text-zinc-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default AboutMe
