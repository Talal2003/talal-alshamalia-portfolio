import site from '../../data/site.js'

export function Footer() {
  const year = site.copyrightYear ?? new Date().getFullYear()

  return (
    <footer className="border-t border-accent-subtle/40 bg-secondary/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-zinc-50">{site.author}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">{site.footerTagline}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Connect</p>
          <ul className="mt-3 flex flex-col gap-2">
            {site.social.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="text-sm font-medium text-accent transition hover:text-accent-strong hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-accent-subtle/20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-4 text-xs text-zinc-600 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {year} {site.author}. All rights reserved.
          </p>
          <p className="text-zinc-600">{site.siteName}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
