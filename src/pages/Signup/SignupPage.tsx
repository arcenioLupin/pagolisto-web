import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
} from '@mui/material'
import MainLayout from '@/layouts/MainLayout'
import useSignup from '@/hooks/useSignup'

const SignupPage = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useSignup()

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
