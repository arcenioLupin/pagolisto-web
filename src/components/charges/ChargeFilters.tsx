import type { ChargeFiltersProps } from "@/interface/charges";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useChargeFilter from "./hooks/useChargeFilter";


const ChargeFilters = ({ onFilterChange }: ChargeFiltersProps) => {
  const {
    paymentType,
    status,
    handlePaymentTypeChange,
    handleStatusChange,
  } = useChargeFilter({ onFilterChange });


  return (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>Tipo de pago</InputLabel>
        <Select
          value={paymentType}
          label="Payment Type"
          onChange={handlePaymentTypeChange}
        >
          <MenuItem value="">Todo</MenuItem>
          <MenuItem value="Yape">Yape</MenuItem>
          <MenuItem value="Plin">Plin</MenuItem>
          <MenuItem value="Tunki">Tunki</MenuItem>
          <MenuItem value="Transferencia">Transferencia</MenuItem>
          <MenuItem value="Efectivo">Efectivo</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>Estado</InputLabel>
        <Select value={status} label="Status" onChange={handleStatusChange}>
          <MenuItem value="">Todo</MenuItem>
          <MenuItem value="pending">Pendiente</MenuItem>
          <MenuItem value="paid">Pagado</MenuItem>
          <MenuItem value="cancelled">Cancelado</MenuItem>
          <MenuItem value="expired">Expirado</MenuItem>
        </Select>
      </FormControl>

    </Box>
  );
};

export default ChargeFilters;
