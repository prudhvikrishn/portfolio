import Reveal from '../components/Reveal'
import { projects, skillGroups } from '../data'

// How many projects use each skill (real counts, worked out from the project list).
const usage = projects.reduce((acc, p) => {
  p.skills.forEach((s) => {
    acc[s] = (acc[s] || 0) + 1
  })
  return acc
}, {})

const Skills = ({ onSelectSkill }) => (
  <section id="skills" className="section section-alt">
    <div className="section-inner">
      <Reveal>
        <p className="sec-label">Technical stack</p>
        <h2 className="sec-heading">
          Skills &amp; <em>expertise</em>
        </h2>
        <p className="sec-intro">
          A number next to a skill shows how many of my projects use it. Select it to see those
          projects.
        </p>
      </Reveal>

      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05} className="skill-card">
            <h3>{group.title}</h3>
            <ul className="skill-list">
              {group.skills.map((skill) => {
                const count = usage[skill]
                return (
                  <li key={skill}>
                    {count ? (
                      <button
                        type="button"
                        className="skill-item"
                        onClick={() => onSelectSkill(skill)}
                        aria-label={`${skill}, used in ${count} project${count > 1 ? 's' : ''}. Show them.`}
                      >
                        {skill}
                        <span className="skill-count" aria-hidden="true">{count}</span>
                      </button>
                    ) : (
                      <span className="skill-item">{skill}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default Skills
