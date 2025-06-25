import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSnackbar } from 'notistack'

type ConfigFormData = {
  telefono: string
  direccion: string
  metodosDePago: string
}

const ConfigurationForm = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { token } = useAuth()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ConfigFormData>({
    defaultValues: {
      telefono: '',
      direccion: '',
      metodosDePago: ''
    }
  })

  const fetchConfig = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/config`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()

      if (res.ok) {
        setValue('telefono', result.data.telefono || '')
        setValue('direccion', result.data.direccion || '')
        setValue('metodosDePago', result.data.metodosDePago?.join(', ') || '')
      } else if (res.status !== 404 && res.status !== 401) {
        enqueueSnackbar('Error al cargar configuración', { variant: 'error' })
      }
    } catch (error) {
      enqueueSnackbar(`Error de red al cargar configuración: ${error}`, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

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
          metodosDePago: data.metodosDePago.split(',').map((m) => m.trim())
        })
      })

      if (!res.ok) throw new Error('Error al guardar la configuración')

      enqueueSnackbar('Configuración guardada exitosamente', { variant: 'success' })
      const result = await res.json()
      console.log('✅ Configuración actualizada:', result)
    } catch (error) {
      enqueueSnackbar(`Error al guardar configuración: ${error}`, { variant: 'error' })
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Configuración del Comercio</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Controller
          name="telefono"
          control={control}
          rules={{ required: 'Este campo es obligatorio' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Teléfono"
              fullWidth
              margin="normal"
              error={!!errors.telefono}
              helperText={errors.telefono?.message}
            />
          )}
        />

        <Controller
          name="direccion"
          control={control}
          rules={{ required: 'Este campo es obligatorio' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dirección"
              fullWidth
              margin="normal"
              error={!!errors.direccion}
              helperText={errors.direccion?.message}
            />
          )}
        />

        <Controller
          name="metodosDePago"
          control={control}
          rules={{ required: 'Este campo es obligatorio' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Métodos de pago (separados por coma)"
              fullWidth
              margin="normal"
              error={!!errors.metodosDePago}
              helperText={errors.metodosDePago?.message}
            />
          )}
        />

        <Box mt={2} display="flex" justifyContent="center">
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar configuración'}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default ConfigurationForm
