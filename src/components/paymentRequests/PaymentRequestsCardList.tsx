// src/components/paymentRequests/PaymentRequestsCardList.tsx

import {
  Box,
  Typography,
  Stack,
  Pagination,
} from '@mui/material';

import type { PaymentRequestsTableProps } from '@/interface/paymentRequest';
import usePaymentRequestTable from './hooks/usePaymentRequestTable';
import PaymentRequestCard from './PaymentRequestCard';

const PaymentRequestsCardList = ({
  paymentRequests,
  onView,
  onMarkAsPaid,
  fetchPaymentRequests,
}: PaymentRequestsTableProps) => {
  const {
    paginated,
    handleChangePage,
    page,
    rowsPerPage,
    renderStatusChip,
  } = usePaymentRequestTable(paymentRequests);

  if (paymentRequests.length === 0) {
    return (
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          No se encontraron solicitudes de pago.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack spacing={2}>
        {paginated.map((req) => (
          <PaymentRequestCard
            key={req._id}
            request={req}
            onView={onView}
            onMarkAsPaid={onMarkAsPaid}
            onCancel={fetchPaymentRequests}
            renderStatusChip={renderStatusChip}
          />
        ))}
      </Stack>

        <Stack direction="row" justifyContent="center" mt={2} mb={2}>
              <Pagination
                aria-label="Paginación de solicitudes de pago"
                count={Math.ceil(paymentRequests.length / rowsPerPage)}
                page={page + 1}
                onChange={(_, newPage) => handleChangePage(null as unknown, newPage - 1)}
                color="primary"
                shape="rounded"
              />
        </Stack>
    </Box>
  );
};

export default PaymentRequestsCardList;
