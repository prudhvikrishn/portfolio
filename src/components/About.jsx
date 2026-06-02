import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const chips = [
  { label: "Python", cls: "chip-teal" },
  { label: "Scikit-learn", cls: "chip-teal" },
  { label: "Pandas", cls: "chip-teal" },
  { label: "Flask", cls: "chip-teal" },
  { label: "SQL", cls: "chip-gold" },
  { label: "GCP", cls: "chip-gold" },
  { label: "AutoDock", cls: "chip-dim" },
  { label: "MOE", cls: "chip-dim" },
  { label: "R", cls: "chip-dim" },
  { label: "Matlab", cls: "chip-dim" },
];

const domains = [
  { label: "Machine Learning", cls: "chip-teal" },
  { label: "Bioinformatics", cls: "chip-teal" },
  { label: "Data Science", cls: "chip-gold" },
  { label: "Drug Discovery", cls: "chip-dim" },
  { label: "Virtual Screening", cls: "chip-dim" },
  { label: "Computational Biology", cls: "chip-dim" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section" ref={ref}>
      <motion.div
        className="section-inner about-grid"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="about-left">
          <p className="sec-label">Background</p>
          <h2 className="sec-heading">
            Transforming data into <em>decisions</em>
          </h2>
          <div className="about-body">
            <p>
              I'm a <strong>B.Sc. Data Science</strong> student at VIT-AP University
              with a deep interest in how machine learning can solve real-world problems —
              from legal document automation to accelerating drug discovery.
            </p>
            <p>
              My research sits at the boundary of <strong>Data Science, Computational
              Biology, and Artificial Intelligence</strong> — exploring how computational
              methods can be applied to molecular docking and drug-target interaction prediction.
            </p>
            <p>
              I actively drive leadership initiatives as a <strong>V-TOP Student Coordinator
              for the DSC Club</strong> at VIT-AP, managing operational workflows and
              fostering team productivity using agile principles.
            </p>
          </div>
        </div>

        <div className="about-right">
          <p className="chips-label">Technical Arsenal</p>
          <div className="chips-wrap">
            {chips.map((c) => (
              <span key={c.label} className={`chip ${c.cls}`}>{c.label}</span>
            ))}
          </div>
          <p className="chips-label" style={{ marginTop: "1.5rem" }}>Research Domains</p>
          <div className="chips-wrap">
            {domains.map((c) => (
              <span key={c.label} className={`chip ${c.cls}`}>{c.label}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
