import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import type { CancelPaymentProps } from '@/interface/paymentRequest'
import { SlideUp } from '@/utils/paymentRequestUtils'
import useCancelPRDialog from './hooks/useCancelPRDialog'


const CancelPaymentRequestDialog = ({
  setOpenConfirm,
  openConfirm,
  handleCancel,
  loading
}: CancelPaymentProps) => {

  const  { handleCloseCancelPaymentRequest } = useCancelPRDialog(setOpenConfirm);
  return (
    <Dialog
      open={openConfirm}
      onClose={handleCloseCancelPaymentRequest}
      slots={{ transition: SlideUp }}
      disableEnforceFocus
    >
      <DialogTitle>Cancelar solicitud de pago</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas cancelar esta solicitud de pago? Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseCancelPaymentRequest}
          disabled={loading}
          variant="outlined"
        >
          No, mantenerla
        </Button>
        <Button
          onClick={handleCancel}
          color="error"
          variant="contained"
          startIcon={<CancelIcon />}
          disabled={loading}
          autoFocus
        >
          {loading ? 'Cancelando...' : 'Sí, cancelar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CancelPaymentRequestDialog
