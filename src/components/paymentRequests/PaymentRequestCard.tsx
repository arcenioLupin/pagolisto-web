import type { JSX } from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import type { PaymentRequest } from '@/interface/paymentRequest';
import PaymentRequestActions from './PaymentRequestActions';
import { formatMoney } from '@/utils/paymentRequestUtils';

type Props = {
  request: PaymentRequest;
  onView: (request: PaymentRequest) => void;
  onMarkAsPaid: (id: string) => void;
  onCancel: () => void;
  renderStatusChip: (status: string) => JSX.Element;
};

const PaymentRequestCard = ({
  request,
  onView,
  onMarkAsPaid,
  onCancel,
  renderStatusChip,
}: Props) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: '12px', mb: 2 }}>
      <CardContent>
        {/* Header: cliente + menú de 3 puntos en la esquina sup. derecha */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={1}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Cliente: {request.client}
          </Typography>

          <PaymentRequestActions
            request={request}
            onView={onView}
            onMarkAsPaid={onMarkAsPaid}
            onCancel={onCancel}
          />
        </Box>

        {/* Resto del contenido */}
        <Stack spacing={0.5}>
          <Typography variant="body2">
            Monto: {formatMoney(request.amount)}
          </Typography>

          <Typography variant="body2">
            Tipo de pago: {request.paymentType}
          </Typography>

          <Box mt={0.5}>{renderStatusChip(request.status)}</Box>

          <Typography variant="body2">
            Expira:{' '}
            {request.expirationDate
              ? new Date(request.expirationDate).toLocaleDateString()
              : '—'}
          </Typography>

          <Typography variant="body2">
            Creado: {new Date(request.createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PaymentRequestCard;

