import {
  IconButton,
  Tooltip
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { type PaymentRequesActionsProps } from '@/interface/paymentRequest'
import CancelPaymentRequestDialog from '../dialogs/CancelPaymentRequestDialog'
import usePaymentRequestActions from './hooks/usePaymentRequestActions'


const PaymentRequestActions = ({ request, onView, onMarkAsPaid, onCancel }: PaymentRequesActionsProps) => {

  const { handleCancel, openConfirm, setOpenConfirm, loading } = usePaymentRequestActions(request, onCancel);
  const isPendingOrReview = ['pending', 'review_pending'].includes(request.status)
  const tooltipText = request.status === 'review_pending'
    ? 'Revisar y confirmar pago'
    : 'Marcar como pagado'


  return (
    <>
      <Tooltip title="Ver detalles de la solicitud">
        <IconButton onClick={() => onView(request)}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {['pending', 'review_pending'].includes(request.status)  && (
        <>
          {
            isPendingOrReview && <Tooltip title={tooltipText}>
            <IconButton color="success" onClick={() => onMarkAsPaid(request._id)}>
              <CheckCircleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          }

          <Tooltip title="Cancelar solicitud de pago">
            <IconButton color="error" onClick={() => setOpenConfirm(true)}>
              <CancelIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}

      <CancelPaymentRequestDialog 
        setOpenConfirm={setOpenConfirm}
        openConfirm={openConfirm}
        handleCancel={handleCancel}
        loading={loading} />
    </>
  )
}

export default PaymentRequestActions
