// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      localStorage.setItem("token", result.token);
      // Redirigir al dashboard o página de inicio
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
          <a href="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Regístrate aquí
          </a>
        </Typography>

      </Paper>
    </Box>
  );
};

export default LoginPage;
