import { z } from 'zod'

const amountPreprocessed = z.preprocess(
  (val) => {
    const parsed = typeof val === 'string' ? parseFloat(val) : val
    return typeof parsed === 'number' && !isNaN(parsed) ? parsed : undefined
  },
  z.number({
    required_error: 'El monto es obligatorio',
    invalid_type_error: 'Debe ser un número',
  }).positive('El monto debe ser mayor que cero')
)

export const newPaymentRequestSchema = z.object({
  client: z.string().min(1, 'El nombre del cliente es obligatorio'),
  amount: amountPreprocessed,
  paymentType: z.enum(['Yape', 'Plin', 'Transferencia', 'Efectivo'], {
    errorMap: () => ({ message: 'Selecciona un método de pago válido' }),
  }),
 expirationDate: z
  .date({
    required_error: 'La fecha de expiración es obligatoria',
    invalid_type_error: 'Fecha inválida',
  })
  .refine((date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const inputDate = new Date(date)
    inputDate.setHours(0, 0, 0, 0)
    return inputDate >= today
  }, {
    message: 'La fecha debe ser hoy o una fecha futura',
  }),
  description: z.string().optional(),
})

// 👇 Forzamos explícitamente el tipo correcto para TypeScript
export type NewPaymentRequestFormData = {
  client: string
  amount: number
  paymentType: 'Yape' | 'Plin' | 'Transferencia' | 'Efectivo'
  expirationDate: Date
  description?: string
}
