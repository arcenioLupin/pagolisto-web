import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const useLogin = () => {

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

      if (!res.ok) {
        // mensaje del backend si viene algo legible, si no, uno genérico
        const backendMessage =
          typeof result?.message === "string" && result.message.trim().length > 0
            ? result.message
            : "Credenciales inválidas o error al iniciar sesión.";
        throw new Error(backendMessage);
      }

      setAuth(result.data.token,result.data.user)
      navigate('/dashboard', {replace: true})

      
    }catch (err: unknown) {
      const fallbackMessage =
        "Ocurrió un problema en el servicio. Intenta nuevamente en unos minutos.";

      if (err instanceof Error) {
        // Caso red / backend caído
        const message =
          err.message === "Failed to fetch"
            ? fallbackMessage
            : err.message || fallbackMessage;

        enqueueSnackbar(message, { variant: "error" });
      } else {
        enqueueSnackbar(fallbackMessage, { variant: "error" });
      }
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  }
}

export default useLogin