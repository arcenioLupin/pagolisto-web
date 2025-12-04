import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import useLogin from "@/hooks/useLogin";



const LoginPage = () => {

  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useLogin();

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
           <img src="/icons/pwa-192x192.png" alt="Logo de ControlWallet" style={{ width: 80, height: 80, borderRadius: '50%' }} />
        </Box>

        <Typography variant="h4" gutterBottom align="center">
          Iniciar Sesión
        </Typography>
        <Typography variant="subtitle2" align="center" color="textSecondary" gutterBottom>
             Bienvenido a <strong>ControlWallet</strong>
        </Typography>
        <Typography
          variant="caption"
          align="center"
          color="textSecondary"
          display="block"
          gutterBottom
        >
          Una solución de FloweyPay
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
