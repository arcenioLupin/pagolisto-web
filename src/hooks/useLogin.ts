import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
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
  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  }
}

export default useLogin