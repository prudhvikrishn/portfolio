import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const page = (file) => fileURLToPath(new URL(file, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site under /portfolio/; Vercel and local dev use /.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: {
    // The 3D chunk (three.js) is lazy-loaded after the page renders.
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      input: {
        main: page('./index.html'),
        privacy: page('./privacy.html'),
        terms: page('./terms.html'),
      },
    },
  },
})
