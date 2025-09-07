import { signupSchema, type SignupFormValues } from "@/schemas/signupSchema"
import { useAuthStore } from "@/store/useAuthStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSnackbar } from "notistack"
import { useForm } from "react-hook-form"

const useSignup = () => {

      const { setAuth } = useAuthStore()
      const { enqueueSnackbar } = useSnackbar()
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
      })
    
      const onSubmit = async (data: SignupFormValues) => {
        try {
          const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
    
          const result = await res.json()
    
          if (!res.ok) {
          enqueueSnackbar('Hubo un problema al registrar el usuario', { variant: 'error' })
          throw new Error(result.message)
          }
          setAuth(result.data.token, result.data.user)
          enqueueSnackbar('Usuario registrado con éxito', { variant: 'success' })
          // Aquí podrías redirigir a login si quieres
        } catch (error) {            
          if (error instanceof Error) {
            alert(error.message)
          } else {
            alert('Error desconocido al registrar')
          }
        }
      }

  return {
   register,
   handleSubmit,
   errors,
   isSubmitting,
   onSubmit
  }
}

export default useSignup