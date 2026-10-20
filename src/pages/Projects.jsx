import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import ProjectThumb from '../components/ProjectThumb'
import NlpResults from '../components/NlpResults'
import { badgeClass, categories, workProjects as projects } from '../data'

export const ProjectRow = ({ project, number }) => {
  const [open, setOpen] = useState(false)
  const detailsId = `${project.id}-details`

  return (
    <article className={`project-row ${open ? 'is-open' : ''}`}>
      <div className="project-num" aria-hidden="true">{String(number).padStart(2, '0')}</div>

      <div className="project-main">
        <div className="project-title-row">
          <h3 className="project-name">{project.title}</h3>
          <span className={`badge ${badgeClass[project.kind] || 'badge-gold'}`}>{project.kind}</span>
        </div>

        {(project.period || project.award) && (
          <p className="project-meta">
            {project.period}
            {project.period && project.award && ' · '}
            {project.award && <span className="award">{project.award}</span>}
          </p>
        )}

        {project.coAuthors && (
          <p className="project-coauthors">{project.coAuthors}</p>
        )}

        <p className="project-desc">{project.summary}</p>

        <ul className="project-tags" aria-label="Tools used">
          {project.stack.map((tool) => (
            <li key={tool} className="project-tag">{tool}</li>
          ))}
        </ul>

        <div className="project-actions">
          <button
            type="button"
            className="details-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={detailsId}
          >
            {open ? 'Hide details' : 'Show details'}
            <span className="arrow" aria-hidden="true">↓</span>
          </button>
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="project-link">
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="project-thumb"
        onClick={() => setOpen(!open)}
        aria-label={`${open ? 'Hide' : 'Show'} details for ${project.title}`}
      >
        <ProjectThumb thumb={project.thumb} />
      </button>

      <div className="project-details-slot">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={detailsId}
              className="project-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="details-grid">
                <div className="details-cell">
                  <h4 className="mono-label">Problem</h4>
                  <p>{project.problem}</p>
                </div>
                <div className="details-cell">
                  <h4 className="mono-label">Approach</h4>
                  <ul>
                    {project.approach.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="details-cell">
                  <h4 className="mono-label">Result</h4>
                  <p>{project.result}</p>
                </div>
                {project.intents && (
                  <div className="details-cell details-wide">
                    <h4 className="mono-label">The 8 intents, with an example query for each</h4>
                    <dl className="intents">
                      {project.intents.map(([intent, example]) => (
                        <div key={intent}>
                          <dt>{intent}</dt>
                          <dd>“{example}”</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
              {project.results && <NlpResults />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  )
}

const Projects = ({ category, onCategoryChange, skill, onClearSkill }) => {
  const shown = projects.filter(
    (p) =>
      (category === 'all' || p.categories.includes(category)) &&
      (!skill || p.skills.includes(skill)),
  )
  const countFor = (id) =>
    id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(id)).length

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <Reveal>
          <p className="sec-label">Selected work</p>
          <h2 className="sec-heading">
            Things I have <em>built</em>
          </h2>
          <p className="sec-intro">
            Machine learning, NLP and hackathon builds. Open a project to see the problem, my
            approach and the result.
          </p>
        </Reveal>

        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="filter"
              onClick={() => onCategoryChange(c.id)}
              aria-pressed={category === c.id && !skill}
            >
              {c.label}
              <span className="filter-count">{countFor(c.id)}</span>
            </button>
          ))}
        </div>

        {skill && (
          <div className="skill-note">
            <span>
              Projects that use <strong>{skill}</strong>
            </span>
            <button type="button" className="text-link" onClick={onClearSkill}>
              Show all
            </button>
          </div>
        )}

        <div className="projects-list">
          {shown.map((p) => (
            <ProjectRow key={p.id} project={p} number={projects.indexOf(p) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
