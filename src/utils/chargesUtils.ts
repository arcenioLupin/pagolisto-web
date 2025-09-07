import type { Charge } from "@/interface/charges"

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

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Retorna el color del chip según estado
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning'
    case 'paid':
      return 'success'
    case 'cancelled':
      return 'default'
    case 'expired':
      return 'error'
    default:
      return 'default'
  }
}

export const paymentTypes = ['Yape', 'Plin', 'Efectivo']