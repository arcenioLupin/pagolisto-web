import { useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newPaymentRequestSchema, type NewPaymentRequestFormData } from '@/schemas/newPaymentRequestSchema'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

interface PaymentRequestModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: NewPaymentRequestFormData) => void
  initialData?: NewPaymentRequestFormData  & { _id?: string }
}

const paymentTypes = ['Yape', 'Plin', 'Efectivo']

const PaymentRequestModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: PaymentRequestModalProps) => {
    
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control
  } = useForm<NewPaymentRequestFormData>({
    resolver: zodResolver(newPaymentRequestSchema) as never,
    defaultValues: initialData || {
      client: '',
      amount: 0,
      paymentType: 'Yape',
      description: '',
      expirationDate: new Date(),
    },
  })

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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>New Payment Request</DialogTitle>
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
            type="number"
            inputProps={{ step: 'any' }}
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
            multiline
            minRows={2}
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
                onChange={(date) => {
                if (date) {
                    // 🔧 Normaliza la fecha a medianoche local
                    const normalized = new Date(date)
                    normalized.setHours(0, 0, 0, 0)
                    field.onChange(normalized)
                }
                }}
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
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default PaymentRequestModal
