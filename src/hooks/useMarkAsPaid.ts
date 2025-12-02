import type { ApiPaymentRequestResponse, PaymentRequest } from "@/interface/paymentRequest"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const useMarkAsPaid = () => {
  const { token } = useParams<{ token: string }>()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [requestData, setRequestData] = useState<PaymentRequest | null>(null)
  const [merchantQr, setMerchantQr] = useState<{ yape?: string; plin?: string }>({});
  const [ merchantPhone, setMerchantPhone] = useState<string | null>(null);


  useEffect(() => {
    const fetchRequestData = async () => {
      if (!token) return
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/payment-requests/public/${token}`
        )
        const result: ApiPaymentRequestResponse = await res.json()
        if (res.ok && result.data) {
          const { paymentRequest, merchantQr, phone } = result.data;
          setRequestData(paymentRequest);
          setMerchantQr({
            yape: merchantQr?.yape ?? undefined,
            plin: merchantQr?.plin ?? undefined,
          });
          setMerchantPhone(phone ?? null);
        } else {
          setStatus('error')
          setMessage(result.message || 'No se pudo obtener los datos')
        }
      } catch (error) {
        setStatus('error')
        setMessage(`Error inesperado al cargar la solicitud: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchRequestData()
  }, [token])

  const handleMarkAsPaid = async () => {
    if (!token) return
    setSubmitting(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/payment-requests/public/${token}/mark-paid`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        }
      )

      const result: ApiPaymentRequestResponse = await res.json()
      setMessage(result.message)

      
      if (res.ok && result.data) {
        setStatus('success')
        setRequestData(result.data.paymentRequest)
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
      setMessage(`Error inesperado al marcar como pagado ${error}`)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (isoDate?: string) =>
    isoDate ? new Date(isoDate).toLocaleDateString() : '—'

  return{
    loading,
    submitting,
    status,
    message,
    requestData,
    formatDate,
    handleMarkAsPaid,
    merchantQr,
    merchantPhone,

  }
}

export default useMarkAsPaid
