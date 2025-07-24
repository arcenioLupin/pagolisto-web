import { useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import PaymentRequestsTable from '@/components/paymentRequests/PaymentRequestsTable'
import PaymentRequestModal from '@/components/paymentRequests/PaymentRequestModal'
import PaymentRequestFilters from '@/components/paymentRequests/PaymentRequestFilters'
import PaymentRequestDetailsDialog from '@/components/paymentRequests/PaymentRequestDetailsDialog'
import usePaymentRequest from '@/hooks/usePaymentRequest'

const PaymentRequestsPage = () => {
const {     fetchPaymentRequests,
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
    } = usePaymentRequest()

    useEffect(() => {
    if (token) {
      fetchPaymentRequests()
    }
  }, [fetchPaymentRequests, token])

  return (
    <>
      <Box sx={{ p: 4 }}>
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
        <Stack direction="row" justifyContent="flex-end" sx={{ my: 2 }}>
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            + Nueva Solicitud
          </Button>
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
              expirationDate: new Date(), // ✅ importante para evitar errores en el DatePicker
          }}
        />
      </Box>
      <PaymentRequestDetailsDialog
          open={viewDialogOpen}
          onClose={handleClosePaymentRequesDetailstModal}
          request={selectedRequest}
        />
    
    </>
    

  )
}

export default PaymentRequestsPage
