import type { Charge } from "@/components/charges/ChargesTable"

export const generateInitialData = (charge: Charge) => {
  return {
    _id: charge._id,
    client: charge.client,
    amount: charge.amount,
    paymentType: charge.paymentType as 'Yape' | 'Plin' | 'Transferencia' | 'Efectivo',
    description: charge.description || '',
    expirationDate: charge.expirationDate ? new Date(charge.expirationDate) : new Date(),
  }
}