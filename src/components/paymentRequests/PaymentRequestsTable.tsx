import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography
} from '@mui/material';

import { formatMoney } from '@/utils/paymentRequestUtils';
import PaymentRequestActions from './PaymentRequestActions';
import usePaymentRequestTable from './hooks/usePaymentRequestTable';
import type { PaymentRequestsTableProps } from '@/interface/paymentRequest';

import useResponsive from '@/hooks/useResponsive';
import PaymentRequestsCardList from './PaymentRequestsCardList';

const PaymentRequestsTable = ({ paymentRequests, onView, onMarkAsPaid, fetchPaymentRequests }: PaymentRequestsTableProps) => {
  const {
    paginated,
    handleChangePage,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    renderStatusChip,
  } = usePaymentRequestTable(paymentRequests);

  const { isMobile } = useResponsive();

  if (paymentRequests.length === 0) {
    return (
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          No se encontraron solicitudes de pago.
        </Typography>
      </Box>
    );
  }

  //  Versión móvil: Cards con paginación
  if (isMobile) {
    return (
      <PaymentRequestsCardList
        paymentRequests={paymentRequests}
        onView={onView}
        onMarkAsPaid={onMarkAsPaid}
        fetchPaymentRequests={fetchPaymentRequests}
      />
    );
  }

  //  Versión escritorio: Tabla
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
            <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Monto</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Tipo de pago</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Expiración</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Creación</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
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
                <PaymentRequestActions
                  request={req}
                  onView={onView}
                  onMarkAsPaid={onMarkAsPaid}
                  onCancel={() => fetchPaymentRequests()}
                />
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
  );
};

export default PaymentRequestsTable;

