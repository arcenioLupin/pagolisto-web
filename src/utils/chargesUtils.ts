import type { Charge } from "@/interface/charges"
import type { NewChargeFormData } from "@/schemas/newChargeSchema";

export const paymentTypes = ['Yape', 'Plin', 'Efectivo', 'Transferencia'] as const;
export type PaymentType = (typeof paymentTypes)[number];


export const generateInitialData = (
  charge: Partial<Charge>
): NewChargeFormData & { _id?: string } => {
  const rawPaymentType = charge.paymentType as string | undefined;

  // Normalizamos a un PaymentType válido, usando 'Yape' como fallback
  const safePaymentType: PaymentType =
    rawPaymentType && (paymentTypes as readonly string[]).includes(rawPaymentType)
      ? (rawPaymentType as PaymentType)
      : "Yape";

  return {
    _id: charge._id,
    client: charge.client ?? "",
    amount: charge.amount ?? 0,
    paymentType: safePaymentType,
    description: charge.description ?? "",
    expirationDate: charge.expirationDate
      ? new Date(charge.expirationDate)
      : new Date(),
  };
};

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

