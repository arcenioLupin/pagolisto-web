import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
      >
         <App />
     </SnackbarProvider>

  </StrictMode>,
)

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Hay una nueva versión disponible. ¿Deseas actualizar?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App lista para usarse sin conexión')
  }
})