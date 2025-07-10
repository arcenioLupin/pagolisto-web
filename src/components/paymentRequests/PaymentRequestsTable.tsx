
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'
import { type PaymentRequest } from '@/types/paymentRequest'
import { formatMoney } from '@/utils/paymentRequestUtils'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface PaymentRequestsTableProps {
  paymentRequests: PaymentRequest[]
  onView: (request: PaymentRequest) => void
  onMarkAsPaid: (id: string) => void
}

const PaymentRequestsTable = ({ paymentRequests, onView, onMarkAsPaid }: PaymentRequestsTableProps) => {
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

const renderStatusChip = (status?: string) => {
  const colorMap: Record<string, 'default' | 'success' | 'error' | 'warning'> = {
    pending: 'warning',
    paid: 'success',
    expired: 'error',
    cancelled: 'default',
  }

  const safeStatus = status ?? 'pending' // fallback
  return (
    <Chip
      label={safeStatus.toUpperCase()}
      color={colorMap[safeStatus] || 'default'}
      size="small"
    />
  )
}


  if (paymentRequests.length === 0) {
    return (
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          No payment requests found.
        </Typography>
      </Box>
    )
  }

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: '8px' }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#f0f0f0',
              '& > th:first-of-type': { borderTopLeftRadius: '8px' },
              '& > th:last-of-type': { borderTopRightRadius: '8px' }
            }}
          >
            <TableCell sx={{ fontWeight: 'bold' }}>Client</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Payment Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Expiration Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginated.map((req) => (
            <TableRow key={req._id}>
              <TableCell>{req.client}</TableCell>
              <TableCell>{formatMoney(req.amount)}</TableCell>
              <TableCell>{req.paymentType}</TableCell>

              <TableCell>{renderStatusChip(req.status)}</TableCell>
              <TableCell>
                {req.expirationDate
                  ? new Date(req.expirationDate).toLocaleDateString()
                  : '—'}
              </TableCell>
              <TableCell>
                {new Date(req.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Tooltip title="View details">
                  <IconButton onClick={() => onView(req)}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                {req.status === 'pending' && (
                  <Tooltip title="Mark as paid">
                    <IconButton color="success" onClick={() => onMarkAsPaid(req._id)}>
                      <CheckCircleIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={paymentRequests.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
          color: '#555',
        }}
      />
    </Paper>
  )
}

export default PaymentRequestsTable
