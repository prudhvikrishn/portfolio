import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer className="footer">
        <span className="footer-name">Prudhvi Krishna Dupakuntla</span>
        <span className="footer-copy">© 2025 · Vijayawada, Andhra Pradesh</span>
      </footer>
    </>
  );
}
