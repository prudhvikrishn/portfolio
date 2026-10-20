import { useEffect, useRef } from 'react'
import { runReel } from './intro-reel/reel'
import './intro-reel/reel.css'

// Intro loader: the intro reel. Full 10 s on a first visit, jumps to the
// lockup (about 2 s) on return visits, still lockup for reduced motion.
// Add ?intro to the address to always see the full reel.

const STORAGE_KEY = 'intro-seen'

// Read once at load time so React StrictMode's double effect doesn't change it.
const SEEN_BEFORE = (() => {
  try {
    if (new URLSearchParams(window.location.search).has('intro')) return false
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
})()

const IntroLoader = ({ onDone }) => {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return undefined
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* storage blocked */ }

    let pageLoaded = document.readyState === 'complete'
    const onLoad = () => { pageLoaded = true }
    window.addEventListener('load', onLoad)
    document.body.classList.add('pb-lock')

    let done = false
    const cleanup = runReel(el, {
      quick: SEEN_BEFORE,
      reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      isPageLoaded: () => pageLoaded,
      onDone: () => {
        if (done) return
        done = true
        document.body.classList.remove('pb-lock')
        onDone()
      },
    })

    return () => {
      cleanup()
      window.removeEventListener('load', onLoad)
      document.body.classList.remove('pb-lock')
    }
  }, [onDone])

  return <div ref={root} className="rl-root" role="status" aria-label="Loading" />
}

export default IntroLoader
