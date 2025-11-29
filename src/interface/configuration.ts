export type PaymentMethodOption = 'YAPE' | 'PLIN' | 'CASH' | 'TRANSFER';

export type ConfigFormData = {
  phone: string
  address: string
  paymentsMethod: PaymentMethodOption[],
  walletQrImageYape: string | null
  walletQrImagePlin: string | null
}