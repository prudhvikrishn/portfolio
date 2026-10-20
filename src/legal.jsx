import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LegalPage from './pages/LegalPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegalPage page={document.body.dataset.page} />
  </StrictMode>,
)
