import type { PaymentRequest } from "@/interface/paymentRequest"
import { useSnackbar } from "notistack"
import { useState } from "react"

const usePaymentRequestActions = ( request: PaymentRequest,  onCancel: (id: string) => void) => {
  const { enqueueSnackbar } = useSnackbar()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

const handleCancel = async () => {
  try {
    setLoading(true)

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/payment-requests/${request._id}/cancel`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // si estás usando cookies/sesión
      }
    )

    if (!res.ok) {
      throw new Error('Request failed')
    }

    enqueueSnackbar('Solicitud de pago cancelado exitosamente', { variant: 'success' })
    onCancel(request._id)
  } catch (err) {
    console.error(err)
    enqueueSnackbar('Error cancelling request', { variant: 'error' })
  } finally {
    setLoading(false)
    setOpenConfirm(false)
      requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
  })
  }
}

  return {
   handleCancel,
   openConfirm,
   setOpenConfirm,
   loading
  }
}

export default usePaymentRequestActions
