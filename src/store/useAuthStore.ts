// src/store/useAuthStore.ts
import { create } from 'zustand'

interface User {
  email: string
  businessName: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  setAuth: (token: string, user: User) => void
  logout: () => void
  initializeFromStorage: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setAuth: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    set({
      token,
      user,
      isAuthenticated: true,
    })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    })
  },

  initializeFromStorage: () => {
    const token = localStorage.getItem('token')
    const userRaw = localStorage.getItem('user')

    if (token && userRaw) {
      try {
        const user = JSON.parse(userRaw)
        set({
          token,
          user,
          isAuthenticated: true,
        })
      } catch {
        // Si hay un error al parsear el user, limpiamos
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        })
      }
    }
  }
}))
