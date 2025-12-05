import type { ApiPaymentRequestResponse, PaymentRequest } from "@/interface/paymentRequest"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const useMarkAsPaid = () => {
  const { token } = useParams<{ token: string }>()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [requestData, setRequestData] = useState<PaymentRequest | null>(null)
  const [merchantQr, setMerchantQr] = useState<{ yape?: string; plin?: string }>({})
  const [merchantPhone, setMerchantPhone] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequestData = async () => {
      // En la práctica, con la ruta /mark-paid/:token esto nunca debería ser falsy,
      // pero dejamos el guard por si acaso.
      if (!token) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/payment-requests/public/${token}`
        )

        let result: ApiPaymentRequestResponse | null = null
        try {
          result = await res.json()
        } catch {
          result = null
        }

        const backendMessage = result?.message?.toLowerCase() ?? ""

        const isNotFoundLike =
          res.status === 404 ||
          res.status === 410 ||
          backendMessage.includes("not found")

        // Cualquier caso de "no existe / expirado / token malo"
        if (!res.ok || !result?.data || isNotFoundLike) {
          setStatus("error")
          setMessage(
            "Este link es inválido o ya expiró. Por favor verifica el enlace o contacta al comercio."
          )
          return
        }

        // Caso OK con data válida
        const { paymentRequest, merchantQr, phone } = result.data
        setRequestData(paymentRequest)
        setMerchantQr({
          yape: merchantQr?.yape ?? undefined,
          plin: merchantQr?.plin ?? undefined,
        })
        setMerchantPhone(phone ?? null)
        setStatus("idle")
        setMessage("")
      } catch (error) {
        console.error(error)
        setStatus("error")
        setMessage(
          "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo nuevamente."
        )
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
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      )

      let result: ApiPaymentRequestResponse | null = null
      try {
        result = await res.json()
      } catch {
        result = null
      }


      if (!res.ok || !result) {
        setStatus("error")
        // Si el backend envió un mensaje, lo usamos; si no, uno genérico amigable
        setMessage( "No se pudo marcar el pago como realizado. Por favor intenta nuevamente en unos minutos." )
        return
      }

      // Caso OK con data
      setMessage(result.message || "Pago marcado como realizado correctamente.")
      if (result.data) {
        setStatus("success")
        setRequestData(result.data.paymentRequest)
      } else {
        // Respuesta rara sin data, pero sin reventar
        setStatus("error")
        if (!result.message) {
          setMessage(
            "No se pudo marcar el pago como realizado. Por favor intenta nuevamente en unos minutos."
          )
        }
      }
    } catch (error) {
      console.error('error en catch: ', error)
      setStatus("error")
      // 👇 mensaje genérico de red, sin mostrar `${error}` al usuario
      setMessage(
        "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo nuevamente."
      )
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (isoDate?: string) =>
    isoDate ? new Date(isoDate).toLocaleDateString() : "—"

  return {
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

