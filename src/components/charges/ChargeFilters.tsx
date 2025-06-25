import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent
} from '@mui/material'
import { useState } from 'react'

interface ChargeFiltersProps {
  onFilterChange: (filters: {
    paymentType: string
    status: string
    expiration: string
  }) => void
}

const ChargeFilters = ({ onFilterChange }: ChargeFiltersProps) => {
  const [paymentType, setPaymentType] = useState('')
  const [status, setStatus] = useState('')
  const [expiration, setExpiration] = useState('')

  const handlePaymentTypeChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setPaymentType(value)
    onFilterChange({ paymentType: value, status, expiration })
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setStatus(value)
    onFilterChange({ paymentType, status: value, expiration })
  }

  const handleExpirationChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setExpiration(value)
    onFilterChange({ paymentType, status, expiration: value })
  }

  return (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>Payment Type</InputLabel>
        <Select
          value={paymentType}
          label="Payment Type"
          onChange={handlePaymentTypeChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Yape">Yape</MenuItem>
          <MenuItem value="Plin">Plin</MenuItem>
          <MenuItem value="Transferencia">Transferencia</MenuItem>
          <MenuItem value="Efectivo">Efectivo</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>Status</InputLabel>
        <Select value={status} label="Status" onChange={handleStatusChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="expired">Expired</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>Expiration</InputLabel>
        <Select
          value={expiration}
          label="Expiration"
          onChange={handleExpirationChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="today">Expira hoy</MenuItem>
          <MenuItem value="next7days">Próximos 7 días</MenuItem>
          <MenuItem value="expired">Ya expirados</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default ChargeFilters
