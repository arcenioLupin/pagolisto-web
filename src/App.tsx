import { useEffect } from 'react'
import { AppRouter } from './router'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  useEffect(() => {
    useAuthStore.getState().initializeFromStorage()
  }, [])

  return <AppRouter />
}

export default App
