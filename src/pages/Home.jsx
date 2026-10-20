import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { heroFacts } from '../data'

// The 3D scene loads after the text, so the page appears immediately.
const HeroScene = lazy(() => import('../components/HeroScene'))

const Home = ({ play = true }) => {
  // The entrance waits until the intro loader has finished
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  })

  return (
  <section id="home" className="hero-section">
    <div className="hero-canvas" aria-hidden="true">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>
    <div className="hero-shade" aria-hidden="true" />

    <motion.p className="hero-caption" {...fadeUp(0.9)}>
      Gradient descent with momentum on a loss surface · each dot is one step
    </motion.p>

    <div className="hero-content">
      <motion.p className="hero-label" {...fadeUp(0.1)}>
        Data Science Student · VIT-AP University
      </motion.p>

      <motion.h1 className="hero-name" {...fadeUp(0.2)}>
        Prudhvi Krishna
        <br />
        <span className="hero-name-accent">Dupakuntla</span>
      </motion.h1>

      <motion.p className="hero-sub" {...fadeUp(0.3)}>
        I build machine learning and NLP models on healthcare, banking and legal data, and I am Vice
        President of the Data Science Club at VIT-AP University.
      </motion.p>

      <motion.dl className="hero-facts" {...fadeUp(0.4)}>
        {heroFacts.map((f) => (
          <div key={f.label} className="hero-fact">
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </motion.dl>

      <motion.div className="hero-btns" {...fadeUp(0.5)}>
        <a href="#projects" className="btn btn-primary">View work</a>
        <a href="#contact" className="btn btn-secondary">Get in touch</a>
      </motion.div>
    </div>
  </section>
  )
}

export default Home
