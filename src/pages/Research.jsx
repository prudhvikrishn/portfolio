import Reveal from '../components/Reveal'
import { ProjectRow } from './Projects'
import { researchItems } from '../data'

const Research = () => (
  <section id="research" className="section section-alt">
    <div className="section-inner">
      <Reveal>
        <p className="sec-label">Research</p>
        <h2 className="sec-heading">
          Data science meets <em>drug discovery</em>
        </h2>
        <p className="sec-intro">
          My research applies machine learning to computational biology. Open a paper to see the
          question, how I am approaching it and where it stands.
        </p>
      </Reveal>

      <div className="projects-list">
        {researchItems.map((item, i) => (
          <ProjectRow key={item.id} project={item} number={i + 1} />
        ))}
      </div>
    </div>
  </section>
)

export default Research
