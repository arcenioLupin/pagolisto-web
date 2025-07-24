import { newPaymentRequestSchema, type NewPaymentRequestFormData } from "@/schemas/newPaymentRequestSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const usePaymentRequestModal = (initialData: NewPaymentRequestFormData  & { _id?: string }) => {
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control
      } = useForm<NewPaymentRequestFormData>({
        resolver: zodResolver(newPaymentRequestSchema) as never,
        defaultValues: initialData || {
          client: '',
          amount: 0,
          paymentType: 'Yape',
          description: '',
          expirationDate: new Date(),
        },
      })

  return {
    register,
    handleSubmit,
    reset,
    errors,
    isSubmitting,
    control,

  }
}

export default usePaymentRequestModal