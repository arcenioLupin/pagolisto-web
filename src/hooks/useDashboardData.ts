import { useCallback } from 'react'
import { useAuth } from './useAuth'
import { enqueueSnackbar } from 'notistack'

export const useDashboardData = () => {
  const { token } = useAuth()
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const fetchSummary = useCallback(
    async (merchantId: string, startDate: string, endDate: string) => {
      try {
        const res = await fetch(
          `${baseUrl}/dashboard?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        if (!res.ok) throw new Error('Error al obtener resumen')
        return await res.json()
      } catch (error) {
        enqueueSnackbar(`Error al cargar resumen: ${error}`, { variant: 'error' })
        return null
      }
    },
    [baseUrl, token]
  )



  const fetchByPaymentType =  useCallback(
  async (merchantId: string, startDate: string, endDate: string) => {
    try {
      const res = await fetch(`${baseUrl}/dashboard/payment-methods-summary?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error al obtener datos por tipo de pago')
      return await res.json()
    } catch (error) {
      enqueueSnackbar(`Error al cargar tipos de pago: ${error}`, { variant: 'error' })
      return []
    }
  },[baseUrl, token]
  )

  const fetchChargesOverTime = useCallback(
    async (merchantId: string, startDate: string, endDate: string) => {
    try {
      const res = await fetch(`${baseUrl}/dashboard/charges-over-time?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error al obtener charges por fecha')
      return await res.json()
    } catch (error) {
      enqueueSnackbar(`Error al cargar charges por fecha: ${error}`, { variant: 'error' })
      return []
    }
  },[baseUrl, token]
  )

  const fetchPaymentRequestsOverTime = useCallback(
     async (merchantId: string, startDate: string, endDate: string) => {
    try {
      const res = await fetch(`${baseUrl}/dashboard/payment-requests-over-time?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error al obtener solicitudes por fecha')
      return await res.json()
    } catch (error) {
      enqueueSnackbar(`Error al cargar solicitudes por fecha: ${error}`, { variant: 'error' })
      return []
    }
  },[baseUrl, token]
  )

  return {
    fetchSummary,
    fetchByPaymentType,
    fetchChargesOverTime,
    fetchPaymentRequestsOverTime
  }
}
