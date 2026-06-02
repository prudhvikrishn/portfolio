import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "../constants";

const badgeClass = {
  Hackathon: "badge-gold",
  Research: "badge-sage",
  ML: "badge-teal",
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="sec-label">Selected Work</p>
          <h2 className="sec-heading">Projects & <em>Research</em></h2>
        </motion.div>

        <div className="projects-list">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              className="project-row"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ backgroundColor: "rgba(196,154,82,0.03)" }}
            >
              <div className="project-num">0{i + 1}</div>
              <div className="project-main">
                <div className="project-title-row">
                  <span className="project-name">{project.name}</span>
                  <span className={`badge ${badgeClass[project.badge] || "badge-gold"}`}>
                    {project.badge}
                  </span>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-arrow">↗</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
