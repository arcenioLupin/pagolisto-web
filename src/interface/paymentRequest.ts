import type { NewPaymentRequestFormData } from "@/schemas/newPaymentRequestSchema"


export interface PaymentRequest {
  _id: string
  client: string
  amount: number
  paymentType: 'Yape' | 'Plin' | 'Transferencia' | 'Efectivo'
  description?: string
  status: 'pending' | 'paid' | 'expired' | 'cancelled' | 'review_pending'
  expirationDate: string
  paymentDate?: string
  createdAt: string
  publicToken?: string
}

export interface ApiPaymentRequestResponse {
  success: boolean
  message: string
  data: PaymentRequest | null
}

export interface CancelPaymentProps {
  setOpenConfirm: (open: boolean) => void
  openConfirm: boolean
  handleCancel: () => void
  loading: boolean
}

export interface PaymentRequestsTableProps {
  paymentRequests: PaymentRequest[]
  onView: (request: PaymentRequest) => void
  onMarkAsPaid: (id: string) => void
 fetchPaymentRequests: () => Promise<void>
}

export interface PaymentRequestModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: NewPaymentRequestFormData) => void
  initialData?: NewPaymentRequestFormData  & { _id?: string }
}

export interface PaymentRequestFiltersProps {
  onFilterChange: (filters: {
    paymentType: string
    status: string
    expiration: string
  }) => void
}

export interface DetailDialogProps {
  open: boolean
  onClose: () => void
  request: PaymentRequest | null
}

export interface PaymentRequesActionsProps {
  request: PaymentRequest
  onView: (request: PaymentRequest) => void
  onMarkAsPaid: (id: string) => void
  onCancel: (id: string) => void
}
