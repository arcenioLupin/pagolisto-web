import type { PaymentRequest } from "@/interface/paymentRequest"
import { getExpirationStatus } from "@/utils/paymentRequestUtils"
import { useSnackbar } from "notistack"

const usePaymentRequestDetailDialog = (request: PaymentRequest | null) => {

      const { enqueueSnackbar } = useSnackbar()
    
      if (!request) return null
    
      const clientUrl = `${window.location.origin}/mark-paid/${request.publicToken}`
    
      const handleCopy = () => {
        navigator.clipboard.writeText(clientUrl)
        enqueueSnackbar('🔗 Link copiado al portapapeles', { variant: 'success' })
      }
    
      const formatDate = (iso?: string) =>
        iso ? new Date(iso).toLocaleDateString() : '—'
    
      const status = getExpirationStatus(request.expirationDate)

      return {
            handleCopy ,
            formatDate,
            status,
            clientUrl
        }
}

export default usePaymentRequestDetailDialog