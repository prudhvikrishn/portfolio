import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import IntroLoader from './components/IntroLoader'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Research from './pages/Research'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import { workProjects } from './data'

function App() {
  const [category, setCategory] = useState('all')
  const [skill, setSkill] = useState(null)
  const [loading, setLoading] = useState(true)
  const handleLoaded = useCallback(() => setLoading(false), [])

  // Clicking a skill jumps to the projects that use it,
  // or to Research if only the research work uses it.
  const showProjectsFor = (name) => {
    const inProjects = workProjects.some((p) => p.skills.includes(name))
    setCategory('all')
    setSkill(inProjects ? name : null)
    document.getElementById(inProjects ? 'projects' : 'research')?.scrollIntoView()
  }

  return (
    <MotionConfig reducedMotion="user">
      {loading && <IntroLoader onDone={handleLoaded} />}
      <Navbar />
      <main>
        <Home play={!loading} />
        <About />
        <Skills onSelectSkill={showProjectsFor} />
        <Projects
          category={category}
          onCategoryChange={(id) => {
            setCategory(id)
            setSkill(null)
          }}
          skill={skill}
          onClearSkill={() => setSkill(null)}
        />
        <Research />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}

export default App
