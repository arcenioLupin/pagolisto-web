// src/pages/Login.tsx
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useAuthStore } from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
  const navigate = useNavigate()

  const { setAuth } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      setAuth(result.data.token,result.data.user)
      navigate('/dashboard', {replace: true})

      
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Ocurrió un error inesperado");
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          border: "1px solid #e0e0e0",
          bgcolor: "white",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box display="flex" justifyContent="center" mb={3}>
           <img src="/icons/pwa-192x192.png" alt="Logo de Pagolisto" style={{ width: 80, height: 80, borderRadius: '50%' }} />
        </Box>

        <Typography variant="h4" gutterBottom align="center">
          Iniciar Sesión
        </Typography>
        <Typography variant="subtitle2" align="center" color="textSecondary" gutterBottom>
             Bienvenido a PagoListo Express
        </Typography>

        <TextField
          label="Correo electrónico"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
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
          {isSubmitting ? "Cargando..." : "Ingresar"}
        </Button>
        <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
          ¿No tienes una cuenta?{' '}
          <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Regístrate
          </Link>
        </Typography>

      </Paper>
    </Box>
  );
};

export default LoginPage;
