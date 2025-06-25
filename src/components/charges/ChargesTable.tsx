import { useState } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Paper,
  Chip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Charge {
  _id: string
  client: string
  amount: number
  paymentType: string
  status: string
  createdAt: string
  description?: string
  expirationDate?: Date | string | undefined
}

interface ChargesTableProps {
  charges: Charge[];
  onEdit?: (charge: Charge) => void;
  onDelete?: (id: string) => void;
}

// Capitaliza la primera letra
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Retorna el color del chip según estado
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning'
    case 'paid':
      return 'success'
    case 'cancelled':
      return 'default'
    case 'expired':
      return 'error'
    default:
      return 'default'
  }
}

const ChargesTable = ({ charges, onEdit, onDelete }: ChargesTableProps) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)


  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

 

  const paginatedCharges = charges.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  if (charges.length === 0) {
    return (
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          No charges found.
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
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Client</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Payment Method</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Created At</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Expires At</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCharges.map((charge) => (
            <TableRow key={charge._id}>
              <TableCell>{charge.client}</TableCell>
              <TableCell>{charge.amount}</TableCell>
              <TableCell>{charge.paymentType}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>{new Date(charge.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                {charge.expirationDate ? new Date(charge.expirationDate).toLocaleDateString() : '—'}
              </TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => onEdit?.(charge)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete?.(charge._id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={charges.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
          color: '#555',
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            marginTop: '8px',
          },
        }}
      />
    </Paper>
  )
}

export default ChargesTable
