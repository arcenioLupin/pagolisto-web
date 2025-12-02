import { useState } from 'react';
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { type PaymentRequesActionsProps } from '@/interface/paymentRequest';
import CancelPaymentRequestDialog from '../dialogs/CancelPaymentRequestDialog';
import usePaymentRequestActions from './hooks/usePaymentRequestActions';

const PaymentRequestActions = ({
  request,
  onView,
  onMarkAsPaid,
  onCancel,
}: PaymentRequesActionsProps) => {
  const { handleCancel, openConfirm, setOpenConfirm, loading } =
    usePaymentRequestActions(request, onCancel);

  const isPendingOrReview = ['pending', 'review_pending'].includes(request.status);
  const tooltipText =
    request.status === 'review_pending'
      ? 'Revisar y confirmar pago'
      : 'Marcar como pagado';

  // Estado para el menú de 3 puntos
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    onView(request);
    handleCloseMenu();
  };

  const handleMarkAsPaidClick = () => {
    if (!isPendingOrReview) return;
    onMarkAsPaid(request._id);
    handleCloseMenu();
  };

  const handleOpenCancelDialog = () => {
    setOpenConfirm(true);
    handleCloseMenu();
  };

  return (
    <>
      <Tooltip title="Acciones">
        <IconButton size="small" onClick={handleOpenMenu}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* Ver detalles: siempre disponible */}
        <MenuItem onClick={handleViewClick}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ver detalles</ListItemText>
        </MenuItem>

        {/* Marcar como pagado: solo pending/review_pending */}
        {isPendingOrReview && (
          <MenuItem onClick={handleMarkAsPaidClick}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText>{tooltipText}</ListItemText>
          </MenuItem>
        )}

        {/* Cancelar solicitud: solo pending/review_pending */}
        {isPendingOrReview && (
          <MenuItem onClick={handleOpenCancelDialog}>
            <ListItemIcon>
              <CancelIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Cancelar solicitud</ListItemText>
          </MenuItem>
        )}
      </Menu>

      {/* Diálogo de confirmación de cancelación (lógica intacta) */}
      <CancelPaymentRequestDialog
        setOpenConfirm={setOpenConfirm}
        openConfirm={openConfirm}
        handleCancel={handleCancel}
        loading={loading}
      />
    </>
  );
};

export default PaymentRequestActions;

