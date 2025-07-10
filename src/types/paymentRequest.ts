

export interface PaymentRequest {
  _id: string
  client: string
  amount: number
  paymentType: 'Yape' | 'Plin' | 'Transferencia' | 'Efectivo'
  description?: string
  status: 'pending' | 'paid' | 'expired'
  expirationDate: string
  paymentDate?: string
  createdAt: string
  publicToken?: string
}