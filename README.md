# Talal Portfolio

A single-page, production-style portfolio built with **React 19**, **Vite 7**, **Tailwind CSS v4**, **React Router**, and **Framer Motion**. Content lives in `src/data/` so each section can be edited independently of the UI.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ recommended (LTS)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The `preview` command serves the optimized build locally.

## Lint

```bash
npm run lint
```

## Customizing content

| Section        | Data file                      |
| -------------- | ------------------------------ |
| Site / footer  | `src/data/site.js`             |
| Home / hero    | `src/data/home.js`            |
| About          | `src/data/about.js`            |
| Experience     | `src/data/experience.js`       |
| Education      | `src/data/education.js`        |
| Certificates   | `src/data/certificates.js`     |
| Hardware work  | `src/data/hardwareProjects.js` |
| Software work  | `src/data/softwareProjects.js` |

- Navigation targets are defined in `src/styles/theme.js` (`SECTION_IDS`, `NAV_ITEMS`) and must match each section’s `id` in the corresponding section component.

## Color palette

The theme uses Tailwind theme tokens in `src/styles/global.css`:

- **Primary** (charcoal): `rgb(21, 21, 21)`
- **Secondary** (graphite): `rgb(44, 44, 44)`
- **Accent** (pale wheat): `rgb(240, 214, 182)`

Utilities include `bg-primary`, `bg-secondary`, `text-accent`, and `border-accent-subtle`.

## Deployment note

This app uses `BrowserRouter`. Hosts such as GitHub Pages or static file servers must redirect unknown paths to `index.html`, or you can switch to `HashRouter` in `src/App.jsx` if you need hash-based URLs without server configuration.
