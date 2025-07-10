import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useSnackbar } from 'notistack'
import { type PaymentRequest } from '@/types/paymentRequest'
import { getExpirationStatus } from '@/utils/paymentRequestUtils'

interface Props {
  open: boolean
  onClose: () => void
  request: PaymentRequest | null
}

const PaymentRequestDetailsDialog = ({ open, onClose, request }: Props) => {
  const { enqueueSnackbar } = useSnackbar()

  if (!request) return null

  const clientUrl = `${window.location.origin}/mark-paid/${request.publicToken}`

  const handleCopy = () => {
    navigator.clipboard.writeText(clientUrl)
    enqueueSnackbar('🔗 Link copiado al portapapeles', { variant: 'success' })
  }

  const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString() : '—'

  const status = getExpirationStatus(request.expirationDate)

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detalles de la Solicitud de Pago</DialogTitle>
      <DialogContent dividers>
        <Typography><strong>Cliente:</strong> {request.client}</Typography>
        <Typography><strong>Monto:</strong> S/ {request.amount}</Typography>
        <Typography><strong>Método de pago:</strong> {request.paymentType}</Typography>
        {request.status === 'paid' &&<Typography><strong>Fecha de pago:</strong> {formatDate(request.paymentDate)}</Typography>}
       <Box display="flex" alignItems="center" gap={5}>
            <Typography>
                <strong>Estado:</strong> {request.status}
            </Typography>
            <Chip
                label={status.label}
                color={status.color}
                icon={status.icon}
                variant="outlined"
            />
        </Box>

        <Typography><strong>Descripción:</strong> {request.description || '—'}</Typography>

       

        {request.status === 'pending'  &&  (<><Divider sx={{ my: 2 }} /> <Box display="flex" alignItems="center" gap={1}>
          <Typography sx={{ fontWeight: 'bold' }}>Enlace para cliente:</Typography>
          <Typography variant="body2" sx={{ wordBreak: 'break-all', flex: 1 }}>
            {clientUrl}
          </Typography>
          <Tooltip title="Enviar link al cliente">
            <IconButton onClick={handleCopy} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box></>)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PaymentRequestDetailsDialog
