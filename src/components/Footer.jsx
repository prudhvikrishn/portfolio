import { profile } from '../data'

const Footer = () => (
  <footer className="footer">
    <span className="footer-name">{profile.shortName} Dupakuntla</span>
    <nav className="footer-links" aria-label="Legal">
      <a href={`${import.meta.env.BASE_URL}privacy.html`}>Privacy Policy</a>
      <a href={`${import.meta.env.BASE_URL}terms.html`}>Terms</a>
    </nav>
    <span className="footer-copy">© {new Date().getFullYear()}</span>
  </footer>
)

export default Footer
