import { useEffect, useState } from 'react'
import { navItems, profile } from '../data'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link for the section in view
  useEffect(() => {
    const ids = ['home', ...navItems.map((n) => n.id)]
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`navbar ${scrolled || open ? 'navbar-scrolled' : ''}`}>
      <a href="#home" className="nav-wordmark" onClick={close}>
        Prudhvi <em>Krishna</em>
      </a>

      <nav aria-label="Sections">
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="nav-link"
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="nav-cta">
        Resume
      </a>

      <button
        type="button"
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Sections">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={close}>
              {item.label}
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" onClick={close}>
            Resume (PDF)
          </a>
        </nav>
      )}
    </header>
  )
}

export default Navbar
