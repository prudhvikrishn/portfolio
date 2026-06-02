import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navLinks } from "../constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <a href="#" className="nav-wordmark">
        Prudhvi <em>Krishna</em>
      </a>
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={active === link.id ? "nav-link active" : "nav-link"}
              onClick={() => setActive(link.id)}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta">Contact</a>
    </motion.nav>
  );
}
