import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import hardwareProjects from '../../data/hardwareProjects.js'
import MediaModal from '../../components/MediaModal/MediaModal.jsx'

const actionClassName =
  'inline-flex items-center justify-center gap-1.5 rounded-lg border border-accent/40 bg-secondary/60 px-3 py-1.5 text-sm font-semibold text-accent transition hover:border-accent hover:bg-secondary'

function SectionImages({ images }) {
  if (!images?.length) return null
  const multiple = images.length > 1
  return (
    <div className={multiple ? 'mt-6 grid gap-4 sm:grid-cols-2' : 'mt-6'}>
      {images.map((img) => (
        <figure
          key={img.src}
          className={
            'overflow-hidden rounded-xl border border-accent-subtle bg-primary/50 p-2' +
            (multiple ? ' flex items-center justify-center' : '')
          }
        >
          <img
            src={img.src}
            alt={img.alt ?? ''}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            className={
              multiple
                ? 'h-64 w-full rounded-lg object-contain sm:h-72'
                : 'mx-auto h-auto max-h-[36rem] w-auto max-w-full rounded-lg object-contain'
            }
          />
        </figure>
      ))}
    </div>
  )
}

function PolarizerLayersFigure() {
  const angles = [0, 30, 45, 60, 90]
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-accent-subtle bg-primary/50 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent-muted">Moving film segments</p>
      <div className="grid grid-cols-5 gap-2">
        {angles.map((angle) => (
          <div key={angle} className="text-center">
            <div
              className="mx-auto aspect-[3/4] w-full max-w-[4.5rem] rounded-md border border-accent/30"
              style={{
                background: `repeating-linear-gradient(${angle}deg, rgb(240 214 182 / 0.12) 0 3px, rgb(240 214 182 / 0.45) 3px 6px)`,
              }}
              aria-hidden
            />
            <p className="mt-2 font-mono text-xs text-zinc-400">{angle}°</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        A fixed polarizer stays on the glass. Rolling one of these bands over it sets how much sunlight is transmitted.
      </p>
    </div>
  )
}

function MotorRodFigure() {
  const stages = [
    { title: 'NEMA stepper', body: '200 steps/rev, 32× microstep, 60 RPM cruise' },
    { title: 'Rod & gears', body: 'Torque from the motor shaft into the roller pair' },
    { title: 'Twin rollers', body: 'Wind the segmented polarizer past the fixed film' },
    { title: 'ENA idle-off', body: 'TB6600 disabled after each move to save power' },
  ]
  return (
    <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((stage, index) => (
        <li key={stage.title} className="rounded-xl border border-accent-subtle bg-primary/50 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-muted">
            {String(index + 1).padStart(2, '0')}
          </p>
          <p className="mt-2 font-display text-sm font-semibold text-zinc-100">{stage.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">{stage.body}</p>
        </li>
      ))}
    </ol>
  )
}

function FrameFigure() {
  const zones = [
    { label: 'Sensor slits', className: 'left-[8%] top-[6%] h-[10%] w-[22%]' },
    { label: 'Clip slots', className: 'right-[8%] top-[6%] h-[10%] w-[22%]' },
    { label: 'Rod mount', className: 'left-[4%] top-[28%] h-[34%] w-[10%]' },
    { label: 'Rod mount', className: 'right-[4%] top-[28%] h-[34%] w-[10%]' },
    { label: 'Electronics bay', className: 'left-[22%] top-[64%] h-[20%] w-[56%]' },
    { label: 'Power opening', className: 'left-[40%] bottom-[2%] h-[8%] w-[20%]' },
  ]
  const steps = [
    { title: 'Model in Fusion', body: 'Rods, gears, couplers and bearings laid out and checked on screen' },
    { title: 'Check alignment', body: 'Film path verified so the rollers turn smoothly before cutting' },
    { title: 'Cut plywood', body: 'Panels cut from the CAD reference, with slits and slots included' },
    { title: 'Assemble', body: 'Sections joined with screws and a nail gun, clips and wiring added' },
  ]
  return (
    <div className="mt-5 space-y-3">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-xl border border-accent-subtle bg-primary/50 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent-muted">
              {String(index + 1).padStart(2, '0')}
            </p>
            <p className="mt-2 font-display text-sm font-semibold text-zinc-100">{step.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function ArchitectureFigure() {
  const nodes = [
    { title: 'BH1750 lux sensors', body: 'Brightness / glare (0x23, 0x5C)' },
    { title: 'Arduino controller', body: 'AUTO mapping, EEPROM, Bluetooth' },
    { title: 'TB6600 + stepper', body: 'DIR / STEP / ENA, then idle-off' },
    { title: 'Rod, gears, rollers', body: 'Segmented polarizer film' },
  ]
  return (
    <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {nodes.map((node, index) => (
        <li
          key={node.title}
          className="relative rounded-xl border border-accent-subtle bg-primary/50 p-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-muted">
            {String(index + 1).padStart(2, '0')}
          </p>
          <p className="mt-2 font-display text-sm font-semibold text-zinc-100">{node.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">{node.body}</p>
        </li>
      ))}
    </ol>
  )
}

export function HardwareProjectDetail() {
  const { projectId } = useParams()
  const project = useMemo(
    () => hardwareProjects.items.find((item) => item.id === projectId),
    [projectId]
  )
  const [media, setMedia] = useState(null)

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="pb-16 sm:pb-24">
      <div className="border-b border-accent-subtle/30 bg-secondary/20">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Link
            to="/"
            state={{ scrollTo: 'hardware' }}
            className="inline-flex text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            ← Back to hardware projects
          </Link>
          <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent-muted">
            Hardware project
          </p>
          <h1
            id="project-heading"
            className="mt-2 max-w-4xl font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
          >
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              className={actionClassName}
              onClick={() =>
                setMedia({
                  type: 'youtube',
                  youtubeId: project.youtubeId,
                  title: `${project.title} demo`,
                })
              }
            >
              Watch demo
            </button>
            {project.award ? (
              <button
                type="button"
                className={actionClassName}
                onClick={() =>
                  setMedia({
                    type: 'image',
                    src: project.award.image,
                    alt: project.award.imageAlt,
                    title: 'Competition award',
                    caption: project.award.title,
                  })
                }
              >
                Award
              </button>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={actionClassName}
              >
                GitHub ↗
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {project.image ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-accent-subtle bg-primary">
            <img src={project.image} alt={project.imageAlt ?? ''} className="max-h-[28rem] w-full object-cover" />
          </div>
        ) : null}

        {project.award ? (
          <aside className="mt-8 rounded-2xl border border-accent/35 bg-secondary/40 p-5 sm:p-6">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">Award</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200 sm:text-base">{project.award.title}</p>
          </aside>
        ) : null}

        <section className="mt-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="font-display text-2xl font-semibold text-zinc-50">
            Overview
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <nav className="mt-10 flex flex-wrap gap-2" aria-label="Project detail sections">
          {project.details.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-accent-subtle bg-primary/60 px-3 py-1 text-xs font-medium text-accent-muted transition hover:border-accent/40 hover:text-accent"
            >
              {section.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-8">
          {project.details.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-28 rounded-2xl border border-accent-subtle bg-secondary/40 p-5 sm:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-zinc-50 sm:text-2xl">{section.title}</h2>
              {section.tools?.length ? (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Programs and tools">
                  {section.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-accent-subtle bg-primary/60 px-2.5 py-0.5 text-xs font-medium text-accent-muted"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <SectionImages images={section.images} />

              {section.id === 'polarizers' ? <PolarizerLayersFigure /> : null}
              {section.id === 'motor' ? <MotorRodFigure /> : null}
              {section.id === 'architecture' ? <ArchitectureFigure /> : null}
              {section.id === 'frame' ? <FrameFigure /> : null}

              {section.pinout ? (
                <div className="mt-6 overflow-x-auto rounded-xl border border-accent-subtle">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-primary/80 text-xs uppercase tracking-wider text-accent-muted">
                      <tr>
                        <th className="px-3 py-2.5 font-semibold">Pin</th>
                        <th className="px-3 py-2.5 font-semibold">Signal</th>
                        <th className="px-3 py-2.5 font-semibold">Connects to</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-accent-subtle/40">
                      {section.pinout.map((row) => (
                        <tr key={row.pin} className="bg-primary/30">
                          <td className="whitespace-nowrap px-3 py-2.5 font-mono text-accent">{row.pin}</td>
                          <td className="px-3 py-2.5 text-zinc-200">{row.signal}</td>
                          <td className="px-3 py-2.5 text-zinc-400">{row.dest}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-2">
                {section.pdf ? (
                  <>
                    <button
                      type="button"
                      className={actionClassName}
                      onClick={() =>
                        setMedia({
                          type: 'pdf',
                          src: section.pdf,
                          title: section.title,
                        })
                      }
                    >
                      {section.pdfLabel ?? 'Open PDF'}
                    </button>
                  </>
                ) : null}
                {section.githubUrl ? (
                  <a
                    href={section.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={actionClassName}
                  >
                    Open GitHub repository ↗
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>

      <MediaModal media={media} onClose={() => setMedia(null)} />
    </main>
  )
}

export default HardwareProjectDetail
