import type { PaymentRequestFiltersProps } from '@/interface/paymentRequest'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import usePaymentRequestFilters from './hooks/usePaymentRequestFilters'

const PaymentRequestFilters = ({ onFilterChange }: PaymentRequestFiltersProps) => {

  const { paymentType,
          status,
          expiration,
          handlePaymentTypeChange,
          handleStatusChange,
          handleExpirationChange } = usePaymentRequestFilters({onFilterChange })

  return (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>Tipo de Pago</InputLabel>
        <Select
          value={paymentType}
          label="Payment Type"
          onChange={handlePaymentTypeChange}
        >
          <MenuItem value="">Todo</MenuItem>
          <MenuItem value="Yape">Yape</MenuItem>
          <MenuItem value="Plin">Plin</MenuItem>
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

      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>Expiración</InputLabel>
        <Select
          value={expiration}
          label="Expiration"
          onChange={handleExpirationChange}
        >
          <MenuItem value="">Todo</MenuItem>
          <MenuItem value="today">Expira hoy</MenuItem>
          <MenuItem value="next7days">Próximos 7 días</MenuItem>
          <MenuItem value="expired">Ya expirados</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default PaymentRequestFilters
