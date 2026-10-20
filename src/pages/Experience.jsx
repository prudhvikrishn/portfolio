import Reveal from '../components/Reveal'
import { achievements, certifications, education, leadership } from '../data'

const Experience = () => {
  const [current, previous] = leadership.roles
  const workshop = leadership.highlights[0]

  const timeline = [
    {
      date: current.status,
      role: current.title,
      org: leadership.org,
      isCurrent: true,
      points: [`${workshop.title}, ${workshop.date}. ${workshop.text}`],
    },
    previous && { date: previous.status, role: previous.title, org: leadership.org, points: [] },
    {
      date: education.period,
      role: education.degree,
      org: `${education.school}, ${education.place}`,
      points: [`CGPA ${education.cgpa}`],
    },
  ].filter(Boolean)

  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <Reveal>
          <p className="sec-label">Background</p>
          <h2 className="sec-heading">
            Experience &amp; <em>leadership</em>
          </h2>
        </Reveal>

        <div className="exp-grid">
          <Reveal>
            <span className="mono-label col-label">Leadership and education</span>
            <ol className="timeline">
              {timeline.map((item) => (
                <li key={item.role} className="timeline-item">
                  <span className={`timeline-dot ${item.isCurrent ? 'is-current' : ''}`} aria-hidden="true" />
                  <span className="tl-date">{item.date}</span>
                  <h3 className="tl-role">{item.role}</h3>
                  <p className="tl-org">{item.org}</p>
                  {item.points.length > 0 && (
                    <ul className="tl-bullets">
                      {item.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="mono-label col-label">Recognition</span>
            <ul className="cards-col">
              {achievements.map((a) => (
                <li key={a.title} className="award-card">
                  <div className="award-top">
                    <span className="award-title">{a.title}</span>
                    <span className="award-date">{a.date}</span>
                  </div>
                  <p className="award-org">{a.org}</p>
                  {a.text && <p className="award-desc">{a.text}</p>}
                </li>
              ))}
            </ul>

            <span className="mono-label col-label col-gap">Certifications</span>
            <ul className="cards-col">
              {certifications.map((c) => (
                <li key={c.title} className="award-card">
                  <div className="award-top">
                    <span className="award-title">{c.title}</span>
                    <span className="award-date">{c.date}</span>
                  </div>
                  {c.org && <p className="award-org">{c.org}</p>}
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-link">
                    View certificate
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Experience
