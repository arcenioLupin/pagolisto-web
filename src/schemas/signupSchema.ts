import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  businessName: z.string().min(2, 'Nombre del negocio requerido'),
})

export type SignupFormValues = z.infer<typeof signupSchema>
