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
import { useSnackbar } from 'notistack'

const PublicMarkAsPaidPage = () => {
  const {
    loading,
    submitting,
    status,
    message,
    requestData,
    formatDate,
    handleMarkAsPaid,
    merchantQr,
    merchantPhone,
  } = useMarkAsPaid()

  const { enqueueSnackbar } = useSnackbar()

  const handleCopyPhone = async () => {
    if (!merchantPhone) return

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(merchantPhone)
      } else {
        // Fallback para navegadores muy viejos
        const textarea = document.createElement('textarea')
        textarea.value = merchantPhone
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      enqueueSnackbar('Número copiado al portapapeles', {
        variant: 'success',
      })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('No se pudo copiar el número', {
        variant: 'error',
      })
    }
  }

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    )
  }

  console.log('requestData: ', { requestData, merchantPhone })

  if (status === 'error' || !requestData) {
    return (
      <Box textAlign="center" mt={8}>
        <ErrorIcon color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h5" mt={2}>
          Ocurrió un error
        </Typography>
        <Typography variant="body1" mt={1}>
          {message}
        </Typography>
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
          <Typography variant="body1" mt={1}>
            {message}
          </Typography>
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

      {requestData.status === 'pending' && (merchantQr?.yape || merchantQr?.plin) && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Escanea y paga con tu app
          </Typography>

          {merchantQr.yape && (
            <Box mt={2}>
              <Typography variant="subtitle2">QR de Yape</Typography>
              <a href={merchantQr.yape} download="qr-yape.png">
                <img
                  src={merchantQr.yape}
                  alt="QR Yape"
                  style={{ maxWidth: 200, borderRadius: 8 }}
                />
              </a>
              <Box mt={1}>
                <Button
                  variant="outlined"
                  href={merchantQr.yape}
                  download="qr-yape.png"
                  size="small"
                >
                  Descargar QR Yape
                </Button>
              </Box>
            </Box>
          )}

          {merchantQr.plin && (
            <Box mt={4}>
              <Typography variant="subtitle2">QR de Plin</Typography>
              <a href={merchantQr.plin} download="qr-plin.png">
                <img
                  src={merchantQr.plin}
                  alt="QR Plin"
                  style={{ maxWidth: 200, borderRadius: 8 }}
                />
              </a>
              <Box mt={1}>
                <Button
                  variant="outlined"
                  href={merchantQr.plin}
                  download="qr-plin.png"
                  size="small"
                >
                  Descargar QR Plin
                </Button>
              </Box>

              {/* 📱 Número para pagar por Yape/Plin + botón copiar */}
              {merchantPhone && (
                <Box mt={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Número para pagar por Yape/Plin
                  </Typography>

                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography variant="h6" component="span">
                      {merchantPhone}
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleCopyPhone}
                    >
                      Copiar número
                    </Button>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Copia este número y pégalo en tu app de pago.
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}

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

