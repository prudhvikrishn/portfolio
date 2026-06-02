import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const links = [
  { label: "Email", value: "prudhviworkspace@gmail.com", href: "mailto:prudhviworkspace@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/prudhvi30", href: "https://linkedin.com/in/prudhvi30" },
  { label: "GitHub", value: "github.com/prudhvikrishn", href: "https://github.com/prudhvikrishn" },
  { label: "Phone", value: "+91 74162 03048", href: "tel:+917416203048" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="section-inner contact-inner">
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="sec-label">Get in Touch</p>
          <h2 className="sec-heading">Let's <em>collaborate</em></h2>
          <p className="contact-body">
            I'm actively seeking Data Science internships, research
            collaborations, and ML project opportunities. Open to both
            academic and industry roles.
          </p>
        </motion.div>

        <motion.div
          className="contact-links"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="clink"
              whileHover={{ borderColor: "rgba(37,168,173,0.6)", x: 4 }}
            >
              <div className="clink-left">
                <span className="clink-icon">{link.label}</span>
                <span className="clink-val">{link.value}</span>
              </div>
              <span className="clink-arr">→</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
