import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, type SignupFormValues } from '@/schemas/signupSchema'
import MainLayout from '@/layouts/MainLayout'
import { useSnackbar } from 'notistack'
import { useAuthStore } from '@/store/useAuthStore'

const SignupPage = () => {
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

  return (
    <MainLayout>
      <Container maxWidth="sm">
        <Box
          component="form"
          mt={8}
          p={4}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Registro
          </Typography>

          <TextField
            label="Nombre del negocio"
            fullWidth
            margin="normal"
            {...register('businessName')}
            error={!!errors.businessName}
            helperText={errors.businessName?.message}
          />
          <TextField
            label="Correo electrónico"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creando...' : 'Crear cuenta'}
          </Button>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default SignupPage
