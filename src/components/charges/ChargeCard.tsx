import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { capitalize, getStatusColor } from '@/utils/chargesUtils';
import type { Charge } from '@/interface/charges';

interface ChargeCardProps {
  charge: Charge;
  onEdit?: (charge: Charge) => void;
  onDelete?: (id: string) => void;
}

const ChargeCard = ({ charge, onEdit, onDelete }: ChargeCardProps) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          Cliente: {charge.client}
        </Typography>

        <Typography variant="body2">Monto: {charge.amount}</Typography>
        <Typography variant="body2">Método de pago: {charge.paymentType}</Typography>

        <Stack direction="row" alignItems="center" gap={1} mt={1}>
          <Typography variant="body2">Estado:</Typography>
          <Chip
            label={capitalize(charge.status)}
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

        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
          <IconButton color="primary" onClick={() => onEdit?.(charge)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete?.(charge._id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChargeCard;
