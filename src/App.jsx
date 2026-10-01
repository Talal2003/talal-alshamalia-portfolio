import { HashRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './sections/Home/Home.jsx'
import AboutMe from './sections/AboutMe/AboutMe.jsx'
import Experience from './sections/Experience/Experience.jsx'
import Education from './sections/Education/Education.jsx'
import Certificates from './sections/Certificates/Certificates.jsx'
import HardwareProjects from './sections/HardwareProjects/HardwareProjects.jsx'
import SoftwareProjects from './sections/SoftwareProjects/SoftwareProjects.jsx'
import HardwareProjectDetail from './pages/HardwareProjectDetail/HardwareProjectDetail.jsx'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function PageShell() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const id = location.state?.scrollTo
    if (!id) return undefined
    const t = window.setTimeout(() => scrollToId(id), 40)
    return () => window.clearTimeout(t)
  }, [location.state])

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary"
      >
        Skip to main content
      </a>
      <main>
        <Home />
        <AboutMe />
        <Experience />
        <Education />
        <Certificates />
        <HardwareProjects />
        <SoftwareProjects />
      </main>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PageShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hardware/:projectId" element={<HardwareProjectDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
