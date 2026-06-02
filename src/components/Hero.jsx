import { motion } from "framer-motion";
import { Suspense } from "react";
import MolecularCanvas from "./canvas/MolecularCanvas";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-canvas">
        <Suspense fallback={null}>
          <MolecularCanvas />
        </Suspense>
      </div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="hero-label">— Data Scientist · ML Researcher · VIT-AP University</p>
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          Prudhvi Krishna<br />
          <span className="hero-name-accent">Dupakuntla</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          Building intelligent systems at the intersection of data science,
          computational biology, and artificial intelligence.
        </motion.p>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <div className="stat-item">
            <span className="stat-val">3<span className="stat-sup">+</span></span>
            <span className="stat-key">Live Projects</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-val">2<span className="stat-sup">×</span></span>
            <span className="stat-key">Hackathon Awards</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-val">1</span>
            <span className="stat-key">Research Paper</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
        >
          <a href="#projects" className="btn-primary">View Work</a>
          <a href="#contact" className="btn-secondary">Get in Touch</a>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span className="scroll-text">scroll</span>
      </div>
    </section>
  );
}
