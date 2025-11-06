import type { PaymentRequest } from "@/interface/paymentRequest"
import { getStatusDescription } from "@/utils/commonUtils"
import { Chip } from "@mui/material"
import { useState } from "react"

const usePaymentRequestTable = (paymentRequests: PaymentRequest[]) => {

 const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const paginated = paymentRequests.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

const renderStatusChip = ( status?: string) => {
  const colorMap: Record<string, 'default' | 'success' | 'error' | 'warning' | 'info'> = {
    pending: 'warning',
    review_pending: 'info', // Nuevo estado
    paid: 'success',
    expired: 'error',
    cancelled: 'default',
  }

  const safeStatus = status ?? 'pendiente'

  return (
    <Chip
      label={getStatusDescription(status).replace('_', ' ').toUpperCase()}
      color={colorMap[safeStatus] || 'default'}
      size="small"
    />
  )
}


  return {
    paginated,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    renderStatusChip

  }
}

export default usePaymentRequestTable
