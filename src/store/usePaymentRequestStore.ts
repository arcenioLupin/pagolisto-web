/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { type PaymentRequest } from '@/types/paymentRequest'
import {type  NewPaymentRequestFormData } from '@/schemas/newPaymentRequestSchema'

interface PaymentRequestState {
  paymentRequests: PaymentRequest[]
  fetchPaymentRequests: () => Promise<void>
  addPaymentRequest: (request: NewPaymentRequestFormData) => Promise<void>
  markAsPaid: (id: string) => Promise<void>
}

export const usePaymentRequestStore = create<PaymentRequestState>((set, _get) => ({
  paymentRequests: [],

  fetchPaymentRequests: async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const result = await res.json()
      if (res.ok) {
        set({ paymentRequests: result.data })
      } else {
        console.error('Error fetching payment requests:', result.message)
      }
    } catch (err) {
      console.error(' Network error fetching payment requests:', err)
    }
  },

addPaymentRequest: async (request: NewPaymentRequestFormData) => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(request),
  })

  if (!res.ok) {
    throw new Error('Error al crear la solicitud de pago')
  }

  const newRequest: PaymentRequest = await res.json()

  set((state) => ({
    paymentRequests: [newRequest, ...state.paymentRequests],
  }))
},


  markAsPaid: async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment-requests/${id}/mark-paid`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error('Error marking as paid')

      //const updated = await res.json()
      set((state) => ({
        paymentRequests: state.paymentRequests.map((req) =>
          req._id === id ? { ...req, status: 'paid' } : req
        ),
      }))
    } catch (err) {
      console.error('❌ Error marking request as paid:', err)
    }
  },
}))
