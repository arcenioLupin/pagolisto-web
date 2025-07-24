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
import useMarkAsPaid from '@/hooks/useMarkAsPaid'


const PublicMarkAsPaidPage = () => {

  const { loading, submitting, status, message, requestData, formatDate, handleMarkAsPaid } = useMarkAsPaid()

  
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
