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
import { type DetailDialogProps } from '@/interface/paymentRequest'
import usePaymentRequestDetailDialog from './hooks/usePaymentRequestDetailDialog'

const PaymentRequestDetailsDialog = ({ open, onClose, request }: DetailDialogProps) => {

  const dialogUtils = usePaymentRequestDetailDialog(request)
  if (!dialogUtils || !request) return null
  const { handleCopy, formatDate, status, clientUrl } = dialogUtils

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableEnforceFocus>
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
