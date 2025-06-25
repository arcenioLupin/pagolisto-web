/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/Dashboard/DashboardPage.tsx
import { useEffect, useState } from 'react'
import { Box, Button,  Stack, Typography } from '@mui/material'
import { useAuth } from '@/hooks/useAuth'
import ChargesTable, { type Charge } from '@/components/charges/ChargesTable'
import ChargeFilters from '@/components/charges/ChargeFilters'
import { useChargeStore } from '@/store/useChargeStore'
import { useSnackbar } from 'notistack'
import ChargesDeleteDialog from '@/components/dialogs/ChargesDeleteDialog'
import ChargeModal from '@/components/charges/ChargeModal'
import { generateInitialData } from '@/utils/chargesUtils'


const DashboardPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [filters, setFilters] = useState({ paymentType: '', status: '', expiration: '' })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [chargeToDelete, setChargeToDelete] = useState<string | null>(null);
  const [editingCharge, setEditingCharge] = useState<Charge | null>(null);
  const { enqueueSnackbar } = useSnackbar();


  const { user } = useAuth()
  const charges = useChargeStore(state => state.charges)
  const fetchCharges = useChargeStore(state => state.fetchCharges)
  const deleteCharge = useChargeStore(state => state.deleteCharge)

const filteredCharges = charges
  .filter((c) => {
    const matchesPayment = filters.paymentType
      ? c.paymentType === filters.paymentType
      : true

    const matchesStatus = filters.status ? c.status === filters.status : true

    const matchesExpiration = (() => {
      if (!filters.expiration) return true
      if (!c.expirationDate) return false

      const today = new Date()
      const expiration = new Date(c.expirationDate)
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
        return c.status === 'expired'
      }

      return true
    })()

    return matchesPayment && matchesStatus && matchesExpiration
  })


  const handleDeleteChargeClick = (id: string) => {
  setChargeToDelete(id)
  setDeleteDialogOpen(true)
}

const handleEdit = (charge: Charge) => {
  setEditingCharge(charge)
  setModalOpen(true)
}

const confirmDelete = async () => {
  if (!chargeToDelete) return
  try {
    await deleteCharge(chargeToDelete) // Llama al método del store
    enqueueSnackbar('Charge eliminado correctamente', { variant: 'success' })
  } catch (error) {
    enqueueSnackbar('Error al eliminar el charge', { variant: 'error' })
  } finally {
    setDeleteDialogOpen(false)
    setChargeToDelete(null)
  }
}




  useEffect(() => {
  fetchCharges()
  }, [fetchCharges]);



  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user?.businessName || 'Comercio'}
      </Typography>
      <Typography variant="subtitle1">
        Este es tu panel principal. Aquí verás tus cobros recientes y otra información relevante.
      </Typography>

      {/* Filtros */}
      <Box mt={3}>
        <ChargeFilters onFilterChange={setFilters}  />
      </Box>

      {/* Botón de nuevo cobro */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          + Nuevo Cobro
        </Button>
      </Stack>

      {/* Tabla filtrada */}
      <ChargesTable charges={filteredCharges}  onDelete={handleDeleteChargeClick} onEdit={handleEdit}/>
      <ChargeModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingCharge(null)
        }}
        initialData={generateInitialData(editingCharge || {} as Charge)}
      />
     
         {/* Diálogo de confirmación */}
         <ChargesDeleteDialog 
             setDeleteDialogOpen={setDeleteDialogOpen} 
             deleteDialogOpen={deleteDialogOpen}
             confirmDelete={confirmDelete}
          />
    </Box>
  )
}

export default DashboardPage
