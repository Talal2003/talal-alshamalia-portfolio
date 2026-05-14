import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './sections/Home/Home.jsx'
import AboutMe from './sections/AboutMe/AboutMe.jsx'
import Experience from './sections/Experience/Experience.jsx'
import Education from './sections/Education/Education.jsx'
import Certificates from './sections/Certificates/Certificates.jsx'
import HardwareProjects from './sections/HardwareProjects/HardwareProjects.jsx'
import SoftwareProjects from './sections/SoftwareProjects/SoftwareProjects.jsx'

function HomePage() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary"
      >
        Skip to main content
      </a>
      <Navbar />
      <main>
        <Home />
        <AboutMe />
        <Experience />
        <Education />
        <Certificates />
        <HardwareProjects />
        <SoftwareProjects />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
