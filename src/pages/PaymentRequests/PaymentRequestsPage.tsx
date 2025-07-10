/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/PaymentRequests/PaymentRequestsPage.tsx
import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import PaymentRequestsTable from '@/components/paymentRequests/PaymentRequestsTable'
import PaymentRequestModal from '@/components/paymentRequests/PaymentRequestModal'
import { usePaymentRequestStore } from '@/store/usePaymentRequestStore'
import { useAuth } from '@/hooks/useAuth'
import { useSnackbar } from 'notistack'
import { type PaymentRequest } from '@/types/paymentRequest'
import { type NewPaymentRequestFormData } from '@/schemas/newPaymentRequestSchema'
import PaymentRequestFilters from '@/components/paymentRequests/PaymentRequestFilters'
import PaymentRequestDetailsDialog from '@/components/paymentRequests/PaymentRequestDetailsDialog'

const PaymentRequestsPage = () => {
  const { fetchPaymentRequests, paymentRequests, markAsPaid } = usePaymentRequestStore()
  const { token } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [modalOpen, setModalOpen] = useState(false)
  const [filters, setFilters] = useState({ paymentType: '', status: '', expiration: '' })
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)


  useEffect(() => {
    if (token) {
      fetchPaymentRequests()
    }
  }, [fetchPaymentRequests, token])

  const handleView = (request: PaymentRequest) => {
    setSelectedRequest(request)
    setViewDialogOpen(true)
  }


  const handleMarkAsPaid = async (id: string) => {
    try {
      await markAsPaid(id)
      enqueueSnackbar('✅ El pago ha sido marcado como pagado', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Ocurrió un error al marcar como pagado', {
        variant: 'error',
      })
    }
  }


  const handleSaveRequest = async (data: NewPaymentRequestFormData) => {
    try {
 
      const url =  `${import.meta.env.VITE_API_BASE_URL}/payment-requests`

      const method = 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) throw new Error('Error al crear la solicitud de pag0')
 
         await fetchPaymentRequests() // 🔁 solo recarga si el POST fue exitoso

        enqueueSnackbar('Charge creado con éxito', { variant: 'success' })
        setModalOpen(false)
      
    } catch (error) {
      enqueueSnackbar('Error al guardar el charge', { variant: 'error' })
    }
  }

    const filteredRequests = paymentRequests.filter((req) => {
    const matchesPayment = filters.paymentType ? req.paymentType === filters.paymentType : true
    const matchesStatus = filters.status ? req.status === filters.status : true
    const matchesExpiration = (() => {
      if (!filters.expiration) return true
      if (!req.expirationDate) return false

      const today = new Date()
      const expiration = new Date(req.expirationDate)
      expiration.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)

      if (filters.expiration === 'today') {
        return expiration.getTime() === today.getTime()
      }
      if (filters.expiration === 'next7days') {
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)
        return expiration > today && expiration <= nextWeek
      }
      if (filters.expiration === 'expired') {
        return req.status === 'expired'
      }
      return true
    })()

    return matchesPayment && matchesStatus && matchesExpiration
  })

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Payment Requests
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Here you can manage all your payment requests.
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
        />

        <PaymentRequestModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
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
          onClose={() => setViewDialogOpen(false)}
          request={selectedRequest}
        />
    
    </>
    

  )
}

export default PaymentRequestsPage
