import { useAuth } from "@/hooks/useAuth";
import { newChargeSchema } from "@/schemas/newChargeSchema";
import { useChargeStore } from "@/store/useChargeStore";
import type { NewChargeFormData } from "@/interface/charges";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

const useChargeModal = (initialData : NewChargeFormData& { _id?: string }, onClose: () => void ) => {
  const { enqueueSnackbar } = useSnackbar();
  const addCharge = useChargeStore((state) => state.addCharge);
  const updateCharge = useChargeStore((state) => state.updateCharge);
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<NewChargeFormData>({
    resolver: zodResolver(newChargeSchema) as never, // 👈 forzamos aquí como bypass
    defaultValues: initialData || {
      client: "",
      amount: 0,
      paymentType: "Yape",
      description: "",
    },
  });

  const onSubmit = async (data: NewChargeFormData) => {
    try {
      const url = initialData?._id
        ? `${import.meta.env.VITE_API_BASE_URL}/charges/${initialData._id}`
        : `${import.meta.env.VITE_API_BASE_URL}/charges`;

      const method = initialData?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error en la operación");

      const result = await res.json();

      if (initialData?._id) {
        updateCharge(result.data);
        enqueueSnackbar("Cobro actualizado con éxito", { variant: "success" });
      } else {
        addCharge(result.data);
        enqueueSnackbar("Cobro creado con éxito", { variant: "success" });
      }

      onClose();
      reset();
    } catch (error) {
      console.log(error)
      enqueueSnackbar("Error al guardar el charge", { variant: "error" });
    }
  };

  const getButtonChargeText = (): string => {
    if (initialData?._id) return "Actualizar";
    return "Crear";
  };
  return {
    register,
    handleSubmit,
    reset,
    errors,
    isSubmitting ,
    control,
    enqueueSnackbar,
    addCharge,
    updateCharge,
    token,
    initialData,
    onSubmit,
    getButtonChargeText,// Asumiendo que onClose es resetear el formulario
  };
};

export default useChargeModal;
