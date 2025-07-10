import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Paper,
  Divider,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

interface PaymentRequest {
  _id: string
  client: string
  amount: number
  paymentType: string
  status: string
  description?: string
  expirationDate?: string
  paymentDate?: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: PaymentRequest | null
}

const PublicMarkAsPaidPage = () => {
  const { token } = useParams<{ token: string }>()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [requestData, setRequestData] = useState<PaymentRequest | null>(null)

  useEffect(() => {
    const fetchRequestData = async () => {
      if (!token) return
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/payment-requests/public/${token}`
        )
        const result: ApiResponse = await res.json()
        if (res.ok && result.data) {
          setRequestData(result.data)
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

      const result: ApiResponse = await res.json()
      setMessage(result.message)

      if (res.ok && result.data) {
        setStatus('success')
        setRequestData(result.data)
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

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    )
  }

  if (status === 'error' || !requestData) {
    return (
      <Box textAlign="center" mt={8}>
        <ErrorIcon color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h5" mt={2}>Ocurrió un error</Typography>
        <Typography variant="body1" mt={1}>{message}</Typography>
      </Box>
    )
  }

  return (
    <Box textAlign="center" mt={8} px={2}>
      {status === 'success' && (
        <>
          <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
          <Typography variant="h5" mt={2}>
            ¡Gracias! El pago fue marcado exitosamente.
          </Typography>
          <Typography variant="body1" mt={1}>{message}</Typography>
        </>
      )}

      <Paper sx={{ mt: 4, p: 3, maxWidth: 400, mx: 'auto' }} elevation={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          Detalles del pago
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography>Cliente: {requestData.client}</Typography>
        <Typography>Monto: S/ {requestData.amount}</Typography>
        <Typography>Método: {requestData.paymentType}</Typography>
        <Typography>Descripción: {requestData.description || '—'}</Typography>
        <Typography>Expira: {formatDate(requestData.expirationDate)}</Typography>
        <Typography>Pagado el: {formatDate(requestData.paymentDate)}</Typography>
        <Typography>Estado: {requestData.status}</Typography>
      </Paper>

      {requestData.status === 'pending' && status !== 'success' && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleMarkAsPaid}
          disabled={submitting}
        >
          {submitting ? 'Marcando…' : 'Ya realicé el pago'}
        </Button>
      )}
    </Box>
  )
}

export default PublicMarkAsPaidPage
