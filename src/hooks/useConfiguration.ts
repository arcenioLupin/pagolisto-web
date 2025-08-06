import { useForm } from "react-hook-form";
import { useAuth } from "./useAuth"
import type { ConfigFormData } from "@/interface/configuration";
import { enqueueSnackbar } from "notistack";

const useConfiguration = () => {
  const { token } = useAuth();
    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors, isSubmitting }
    } = useForm<ConfigFormData>({
      defaultValues: {
        phone: '',
        address: '',
        paymentsMethod: '',
        walletQrImageYape: null,
        walletQrImagePlin: null,
      }
    });

const fetchConfig = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/config`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()

      if (res.ok) {
        setValue('phone', result.data.phone || '')
        setValue('address', result.data.address || '')
        setValue('paymentsMethod', result.data.paymentsMethod?.join(', ') || '')
        setValue('walletQrImageYape', result.data.walletQrImageYape || null)
        setValue('walletQrImagePlin', result.data.walletQrImagePlin || null)
      } else if (res.status !== 404 && res.status !== 401) {
        enqueueSnackbar('Error al cargar configuración', { variant: 'error' })
      }
    } catch (error) {
      enqueueSnackbar(`Error de red al cargar configuración: ${error}`, { variant: 'error' })
    }
  }

const onSubmit = async (data: ConfigFormData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          paymentsMethod: data.paymentsMethod.split(',').map((m) => m.trim()),
          walletQrImageYape: data.walletQrImageYape || null,
          walletQrImagePlin: data.walletQrImagePlin || null,
        })
      })

      if (!res.ok) throw new Error('Error al guardar la configuración')

      enqueueSnackbar('Configuración guardada exitosamente', { variant: 'success' })
      const result = await res.json()
      console.log('✅ Configuración actualizada:', result)
    } catch (error) {
      enqueueSnackbar(`Error al guardar configuración: ${error}`, { variant: 'error' })
    }
  };

  return{
   fetchConfig,
   control,
   handleSubmit,
   errors,
   isSubmitting,
   onSubmit
  }
}

export default useConfiguration
