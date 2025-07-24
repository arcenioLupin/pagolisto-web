import type { ChargeFiltersProps } from "@/interface/charges"
import type { SelectChangeEvent } from "@mui/material"
import { useState } from "react"

const useChargeFilter = ({onFilterChange}: ChargeFiltersProps) => {
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
  return {
    paymentType,
    status,
    expiration,
    handlePaymentTypeChange,
    handleStatusChange,
    handleExpirationChange

  }
}

export default useChargeFilter