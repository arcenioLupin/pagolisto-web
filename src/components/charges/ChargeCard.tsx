import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Stack,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { capitalize, getStatusColor } from '@/utils/chargesUtils';
import type { Charge } from '@/interface/charges';
import { getStatusDescription } from '@/utils/commonUtils';

interface ChargeCardProps {
  charge: Charge;
  onEdit?: (charge: Charge) => void;
  onDelete?: (id: string) => void;
}

const ChargeCard = ({ charge, onEdit, onDelete }: ChargeCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    if (onEdit) onEdit(charge);
    handleCloseMenu();
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(charge._id);
    handleCloseMenu();
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Cliente: {charge.client}
            </Typography>
          </Box>

          <IconButton size="small" onClick={handleOpenMenu}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2">Monto: {charge.amount}</Typography>
        <Typography variant="body2">Método de pago: {charge.paymentType}</Typography>

        <Stack direction="row" alignItems="center" gap={1} mt={1}>
          <Typography variant="body2">Estado:</Typography>
          <Chip
            label={capitalize(getStatusDescription(charge.status))}
            color={getStatusColor(charge.status)}
            size="small"
            sx={{
              minWidth: 90,
              fontWeight: 600,
              justifyContent: 'center',
              textTransform: 'capitalize',
            }}
          />
        </Stack>

        <Typography variant="body2" mt={1}>
          Fecha creación: {new Date(charge.createdAt).toLocaleString()}
        </Typography>

        {/* Menú de acciones en mobile */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleEditClick}>Editar</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Eliminar</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ChargeCard;

