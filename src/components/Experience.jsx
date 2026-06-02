import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { experiences, achievements } from "../constants";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section section-alt" ref={ref}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="sec-label">Background</p>
          <h2 className="sec-heading">Experience & <em>Leadership</em></h2>
        </motion.div>

        <div className="exp-grid">
          <div className="timeline">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="tl-date">{exp.date}</span>
                  <h3 className="tl-role">{exp.title}</h3>
                  <p className="tl-org">{exp.company}</p>
                  <ul className="tl-bullets">
                    {exp.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="awards-col">
            <p className="sec-label" style={{ marginBottom: "1.5rem" }}>Recognition</p>
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.title}
                className="award-card"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                whileHover={{ y: -3, borderColor: "rgba(196,154,82,0.5)" }}
              >
                <span className="award-icon">{ach.icon}</span>
                <div>
                  <div className="award-title">{ach.title}</div>
                  <div className="award-desc">{ach.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
