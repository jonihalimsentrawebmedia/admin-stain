import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Providers from '@/provider'
import { HelmetProvider } from 'react-helmet-async'
import { TooltipProvider } from '@/components/ui/tooltip.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <HelmetProvider>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </HelmetProvider>
    </Providers>
  </StrictMode>
)
