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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ChargesTableProps } from '@/interface/charges';
import { capitalize, getStatusColor } from '@/utils/chargesUtils';
import useChargeComponent from './hooks/useChargeTable';
import useResponsive from '../../hooks/useResponsive';
import ChargesCardList from './ChargesCardList';
import { getStatusDescription } from '@/utils/commonUtils';

const ChargesTable = ({ charges, onEdit, onDelete }: ChargesTableProps) => {
  const {
    handleChangePage,
    paginatedCharges,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
  } = useChargeComponent(charges);

   const { isMobile, isDesktop } = useResponsive();
   console.log({isMobile, isDesktop})

  if (charges.length === 0) {
    return (
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          No charges found.
        </Typography>
      </Box>
    );
  }

  // Mostrar versión Card en móviles
  if (isMobile) {
    return (
      <ChargesCardList
        charges={charges}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  // Versión tabla para pantallas más grandes
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: '8px' }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#f0f0f0',
              '& > th:first-of-type': { borderTopLeftRadius: '8px' },
              '& > th:last-of-type': { borderTopRightRadius: '8px' },
            }}
          >
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Monto</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Método de pago</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Fecha creación</TableCell>
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
                  label={capitalize(getStatusDescription(charge.status))}
                  color={getStatusColor(charge.status)}
                  size="small"
                  sx={{
                    minWidth: 90,
                    fontWeight: 600,
                    justifyContent: 'center',
                    textTransform: 'capitalize',
                  }}
                  onClick={() => {}} // placeholder
                />
              </TableCell>
              <TableCell>{new Date(charge.createdAt).toLocaleString()}</TableCell>
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
  );
};

export default ChargesTable;

