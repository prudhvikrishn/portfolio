import Reveal from '../components/Reveal'
import { profile } from '../data'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { label: 'GitHub', value: profile.githubLabel, href: profile.github, external: true },
  { label: 'Resume', value: 'Download PDF', href: profile.resume, external: true },
]

const Contact = () => (
  <section id="contact" className="section section-alt">
    <div className="section-inner contact-inner">
      <Reveal>
        <p className="sec-label">Get in touch</p>
        <h2 className="sec-heading">
          Let’s <em>collaborate</em>
        </h2>
        <p className="contact-body">
          I am looking for data science and data analyst internships, research collaborations and ML
          project work, especially in healthcare analytics and fintech. Email is the fastest way to
          reach me.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="contact-links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="clink"
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className="clink-left">
              <span className="clink-label">{link.label}</span>
              <span className="clink-val">{link.value}</span>
            </span>
            <span className="clink-arr" aria-hidden="true">→</span>
          </a>
        ))}
      </Reveal>
    </div>
  </section>
)

export default Contact
