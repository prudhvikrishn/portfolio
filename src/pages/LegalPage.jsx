import Footer from '../components/Footer'
import { profile } from '../data'

const LAST_UPDATED = '18 October 2026'

const Email = () => (
  <a href={`mailto:${profile.email}`} className="text-link">
    {profile.email}
  </a>
)

const privacy = {
  title: 'Privacy Policy',
  sections: [
    {
      heading: 'Who runs this site',
      body: (
        <p>
          This is the personal portfolio of {profile.name}. If you have a question about this
          policy, email <Email />.
        </p>
      ),
    },
    {
      heading: 'What this site collects',
      body: (
        <p>
          This site has no sign-up, no contact form, no cookies and no analytics. I do not collect,
          store or sell any personal information through it.
        </p>
      ),
    },
    {
      heading: 'Services this site relies on',
      body: (
        <>
          <p>
            When you open this site, your browser connects to a few services that may log technical
            details such as your IP address, browser type and the time of the request:
          </p>
          <ul>
            <li>The hosting provider that serves these pages.</li>
            <li>Google Fonts, which supplies the fonts. See Google’s privacy policy at policies.google.com/privacy.</li>
          </ul>
          <p>I do not have access to those logs beyond what the hosting provider shows as standard traffic reports.</p>
        </>
      ),
    },
    {
      heading: 'Email',
      body: (
        <p>
          If you email me, I use your message and address only to reply to you. I do not add you to
          a mailing list or share your details.
        </p>
      ),
    },
    {
      heading: 'Links to other sites',
      body: (
        <p>
          This site links to GitHub, LinkedIn, project demos and certificate pages. Those sites have
          their own privacy policies, and I am not responsible for how they handle your data.
        </p>
      ),
    },
    {
      heading: 'Changes',
      body: <p>If this policy changes, I will update it here and change the date at the top.</p>,
    },
  ],
}

const terms = {
  title: 'Terms and Conditions',
  sections: [
    {
      heading: 'Using this site',
      body: (
        <p>
          By using this site you agree to these terms. The site is a personal portfolio of{' '}
          {profile.name}, provided for information only.
        </p>
      ),
    },
    {
      heading: 'Content and ownership',
      body: (
        <p>
          The text, design and project write-ups on this site belong to {profile.name} unless stated
          otherwise. You may share links to the site. Please do not copy the content and present it
          as your own.
        </p>
      ),
    },
    {
      heading: 'Code and projects',
      body: (
        <p>
          Source code linked from this site is hosted on GitHub. Use of that code is governed by the
          licence in each repository. Where a repository has no licence, all rights are reserved.
        </p>
      ),
    },
    {
      heading: 'Project demos and results',
      body: (
        <p>
          Project demos are student work, shared to show my skills. They are not professional,
          medical, financial or legal advice. Model results are reported on the datasets described
          in each project and may not hold for other data.
        </p>
      ),
    },
    {
      heading: 'No warranty',
      body: (
        <p>
          The site and its demos are provided as they are, without any warranty. I am not liable for
          any loss that results from using the site, its demos or the sites it links to.
        </p>
      ),
    },
    {
      heading: 'Governing law',
      body: <p>These terms are governed by the laws of India.</p>,
    },
    {
      heading: 'Contact',
      body: (
        <p>
          Questions about these terms can be sent to <Email />.
        </p>
      ),
    },
  ],
}

const LegalPage = ({ page }) => {
  const content = page === 'terms' ? terms : privacy

  return (
    <>
      <header className="legal-header">
        <a href={import.meta.env.BASE_URL} className="nav-wordmark">
          Prudhvi <em>Krishna</em>
        </a>
        <a href={import.meta.env.BASE_URL} className="nav-link">Back to portfolio</a>
      </header>

      <main className="legal-main">
        <h1>{content.title}</h1>
        <span className="mono-label updated">Last updated {LAST_UPDATED}</span>
        {content.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body}
          </section>
        ))}
      </main>

      <Footer />
    </>
  )
}

export default LegalPage
