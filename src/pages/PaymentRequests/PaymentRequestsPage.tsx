import { useEffect, useMemo } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import PaymentRequestsTable from '@/components/paymentRequests/PaymentRequestsTable';
import PaymentRequestModal from '@/components/paymentRequests/PaymentRequestModal';
import PaymentRequestFilters from '@/components/paymentRequests/PaymentRequestFilters';
import PaymentRequestDetailsDialog from '@/components/paymentRequests/PaymentRequestDetailsDialog';
import usePaymentRequest from '@/hooks/usePaymentRequest';
import useResponsive from '@/hooks/useResponsive';
import ExportMenu from '@/components/common/ExportMenu';
import { formatDate, type ColumnDef } from '@/utils/exportUtils';
import { formatMoney } from '@/utils/paymentRequestUtils';
import { getStatusDescription } from '@/utils/commonUtils';

const PaymentRequestsPage = () => {
  const {
    fetchPaymentRequests,
    paymentRequests: filteredRequests,
    handleMarkAsPaid,
    handleSaveRequest,
    modalOpen,
    setModalOpen,
    setFilters,
    selectedRequest,
    viewDialogOpen,
    handleView,
    token,
    handleClosePaymentRequestModal,
    handleClosePaymentRequesDetailstModal
  } = usePaymentRequest();

  const { isMobile } = useResponsive();

    useEffect(() => {
      if (token) fetchPaymentRequests();
    }, [fetchPaymentRequests, token]);

    // Tipar columnas sin depender del interface exacto:
    type Row = typeof filteredRequests[number];

    const exportColumns: ColumnDef<Row>[] = [
      { key: '_id' as keyof Row, header: 'ID de solicitud' },
      { key: 'client' as keyof Row, header: 'Cliente' },
      { key: 'amount' as keyof Row,header: 'Monto',formatter: (v) => formatMoney(Number(v ?? 0))},
      { key: 'paymentType' as keyof Row, header: 'Método de pago' },
      { key: 'status' as keyof Row, header: 'Estado', formatter: (v) => getStatusDescription(String(v ?? ''))},
      { key: 'expirationDate' as keyof Row, header: 'Fecha de Expiración',formatter: (v) => (v ? formatDate(v as string) : '—')},
      { key: 'createdAt' as keyof Row, header: 'Fecha de Creación', formatter: (v) => formatDate(v as string)},
    ];


  const exportFileName = useMemo(
    () => `payment_requests_${new Date().toISOString().slice(0, 10)}`,
    []
  );

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom>
          Solicitudes de Pago
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Aqui puedes gestionar todas tus solicitudes de pago.
        </Typography>

        {/* Filtros */}
        <Box mt={3}>
          <PaymentRequestFilters onFilterChange={setFilters} />
        </Box>

        {/* Acciones: Nueva + Exportar (responsive con tu hook) */}
        <Stack
          direction={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems={isMobile ? 'stretch' : 'center'}
          spacing={isMobile ? 1.5 : 2}
          sx={{ my: 2 }}
        >
          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              width: isMobile ? '100%' : 'auto',
              py: 0.9, px: 1.5, fontWeight: 400,
            }}
          >
            + Nueva Solicitud
          </Button>

          <ExportMenu
            rows={filteredRequests}
            columns={exportColumns}
            fileName={exportFileName}
            title="Listado de solicitudes de pago"
            disabled={filteredRequests.length === 0}
            buttonProps={{
              size: isMobile ? 'small' : 'medium',
              sx: {
                width: isMobile ? '100%' : 'auto',
                py: 0.9, px: 1.5,
              },
            }}
          />
        </Stack>

        <PaymentRequestsTable
          paymentRequests={filteredRequests}
          onView={handleView}
          onMarkAsPaid={handleMarkAsPaid}
          fetchPaymentRequests={fetchPaymentRequests}
        />

        <PaymentRequestModal
          open={modalOpen}
          onClose={handleClosePaymentRequestModal}
          onSubmit={handleSaveRequest}
          initialData={{
            client: '',
            amount: 0,
            paymentType: 'Yape',
            description: '',
            expirationDate: new Date(),
          }}
        />
      </Box>

      <PaymentRequestDetailsDialog
        open={viewDialogOpen}
        onClose={handleClosePaymentRequesDetailstModal}
        request={selectedRequest}
      />
    </>
  );
};

export default PaymentRequestsPage;

