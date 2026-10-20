import { motion } from 'framer-motion'

// Gentle one-time fade-up when a block first scrolls into view.
// MotionConfig in App turns this off for visitors who prefer reduced motion.
const Reveal = ({ children, delay = 0, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

export default Reveal
