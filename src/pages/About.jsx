import Reveal from '../components/Reveal'
import { aboutChips } from '../data'

const Chips = ({ items }) => (
  <ul className="chips-wrap">
    {items.map(([label, tone]) => (
      <li key={label} className={`chip chip-${tone}`}>{label}</li>
    ))}
  </ul>
)

const About = () => (
  <section id="about" className="section">
    <div className="section-inner about-grid">
      <Reveal>
        <p className="sec-label">Background</p>
        <h2 className="sec-heading">
          Transforming data into <em>decisions</em>
        </h2>
        <div className="about-body">
          <p>
            I am a <strong>B.Sc.–M.Sc. Data Science</strong> (integrated) student at VIT-AP University. Most of my work
            is applied machine learning: predicting diabetes risk from patient data, sorting banking
            customer queries by intent, and ranking smart meter faults so utility teams know what to
            fix first.
          </p>
          <p>
            My research sits where <strong>data science and computational biology</strong> meet. I
            am drafting a review paper on AI-based virtual screening, which combines machine learning
            with molecular docking tools such as AutoDock and MOE.
          </p>
          <p>
            Outside coursework, I am <strong>Vice President of the Data Science Club</strong>, where I
            previously served as V-TOP Manager.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <span className="mono-label chips-label">Core tools</span>
        <Chips items={aboutChips.tools} />
        <span className="mono-label chips-label">Research domains</span>
        <Chips items={aboutChips.domains} />
      </Reveal>
    </div>
  </section>
)

export default About
