/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/charges/components/NewChargeModal.tsx
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { z } from 'zod'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem
} from '@mui/material'
import { useForm,Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newChargeSchema } from '@/schemas/newChargeSchema'
import { useSnackbar } from 'notistack'
import { useChargeStore } from '@/store/useChargeStore'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'


// Tipo inferido explícitamente
type NewChargeFormData = z.infer<typeof newChargeSchema>

interface ChargeModalProps {
  open: boolean
  onClose: () => void
  initialData?: NewChargeFormData & { _id?: string }
}

const paymentTypes = ['Yape', 'Plin', 'Efectivo']

const ChargeModal = ({ open, onClose, initialData  }: ChargeModalProps) => {
   const { enqueueSnackbar } = useSnackbar();
   const addCharge = useChargeStore(state => state.addCharge)
  const updateCharge = useChargeStore(state => state.updateCharge)
  const { token } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control
  } = useForm<NewChargeFormData>({
    resolver: zodResolver(newChargeSchema) as never, // 👈 forzamos aquí como bypass
    defaultValues: initialData || {
        client: '',
        amount: 0,
        paymentType: 'Yape',
        description: '',
        expirationDate: new Date(), // ✅ default
      }
  });

useEffect(() => {
  if (initialData) {
    const validData = {
      ...initialData,
      paymentType: paymentTypes.includes(initialData.paymentType)
        ? initialData.paymentType
        : 'Yape', // fallback seguro
    }

    reset(validData)
  }
}, [initialData, reset])


const onSubmit = async (data: NewChargeFormData) => {
    try {
 
      const url = initialData?._id
        ? `${import.meta.env.VITE_API_BASE_URL}/charges/${initialData._id}`
        : `${import.meta.env.VITE_API_BASE_URL}/charges`

      const method = initialData?._id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) throw new Error('Error en la operación')

      const result = await res.json()
      
      if (initialData?._id) {
        updateCharge(result.data)
        enqueueSnackbar('Charge actualizado con éxito', { variant: 'success' })
      } else {
        addCharge(result.data)
        enqueueSnackbar('Charge creado con éxito', { variant: 'success' })
      }

      onClose()
      reset()
    } catch (error) {
      enqueueSnackbar('Error al guardar el charge', { variant: 'error' })
    }
  }

  const getButtonCgargeText = (): string => {
    if (initialData?._id) return 'Update'
    return 'Create'
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>New Charge</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <TextField
            label="Client"
            fullWidth
            margin="normal"
            {...register('client')}
            error={!!errors.client}
            helperText={errors.client?.message}
          />

          <TextField
            label="Amount"
            fullWidth
            margin="normal"
            inputProps={{ step: 'any' }}
            type="number"
            {...register('amount')}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />

          <Controller
            name="paymentType"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Payment Type"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.paymentType}
                helperText={errors.paymentType?.message}
              >
                {paymentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />


          <TextField
            label="Description"
            fullWidth
            margin="normal"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="expirationDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Expiration Date"
                disablePast
                value={field.value}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    error: !!errors.expirationDate,
                    helperText: errors.expirationDate?.message,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>


        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : getButtonCgargeText()}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ChargeModal
