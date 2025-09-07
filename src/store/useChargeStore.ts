// src/store/useChargeStore.ts
import { create } from 'zustand'

interface Charge {
  _id: string
  client: string
  amount: number
  paymentType: string
  description?: string
  status: string
  createdAt: string
  expirationDate?: Date | string | undefined
}

interface ChargeState {
  charges: Charge[]
  fetchCharges: () => Promise<void>
  addCharge: (newCharge: Charge) => void
  updateCharge: (updated: Charge) => void
  deleteCharge: (id: string) => Promise<void>
  setCharges: (charges: Charge[]) => void
}

export const useChargeStore = create<ChargeState>((set) => ({
  charges: [],

  fetchCharges: async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/charges`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const result = await res.json()
      if (res.ok) {
        set({ charges: result.data })
      } else {
        console.error('❌ Error fetching charges:', result.message)
      }
    } catch (error) {
      console.error('❌ Network error fetching charges:', error)
    }
  },

  addCharge: (newCharge) =>
    set((state) => ({
      charges: [newCharge, ...state.charges],
    })),

  updateCharge: (updated) =>
    set((state) => ({
      charges: state.charges.map((c) => (c._id === updated._id ? updated : c)),
    })),

  deleteCharge: async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/charges/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error('Error deleting charge')

      set((state) => ({
        charges: state.charges.filter((c) => c._id !== id),
      }))
    } catch (error) {
      console.error('❌ Error deleting charge:', error)
      throw error
    }
  },

  setCharges: (charges) => set({ charges }),
}))
