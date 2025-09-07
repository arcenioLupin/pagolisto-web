import { z } from 'zod'

export const newChargeSchema = z.object({
  client: z.string().min(1, 'El nombre es obligatorio'),
  amount: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const parsed = parseFloat(val)
        return isNaN(parsed) ? null : parsed
      }
      return val
    },
    z.number({
      invalid_type_error: 'Debe ser un número',
      required_error: 'El monto es obligatorio',
    }).positive('El monto debe ser mayor que cero')
  ),
  paymentType: z.enum(['Yape', 'Plin', 'Transferencia', 'Efectivo'], {
    errorMap: () => ({ message: 'Selecciona un método de pago válido' }),
  }),
  description: z.string().optional(),
  expirationDate: z
    .date()
    .refine((date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const input = new Date(date)
        input.setHours(0, 0, 0, 0)
        return input >= today
      }, {
        message: 'La fecha de expiración debe ser hoy o posterior',
      })

})

export type NewChargeFormData = z.infer<typeof newChargeSchema>
