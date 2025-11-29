import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { paymentTypes } from "@/utils/chargesUtils";
import { useAuth } from "@/hooks/useAuth";

export type PaymentMethodOption = (typeof paymentTypes)[number];

export const useMerchantPaymentMethods = () => {
  const { token } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodOption[]>(
    () => [...paymentTypes]
    );
    
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/config`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          // Si no hay config (404) o no autorizado, dejamos los defaults
          if (res.status !== 404 && res.status !== 401) {
            enqueueSnackbar("Error al cargar configuración", { variant: "error" });
          }
          setLoading(false);
          return;
        }

        const result = await res.json();

        if (
          result?.data?.paymentsMethod &&
          Array.isArray(result.data.paymentsMethod) &&
          result.data.paymentsMethod.length > 0
        ) {
          // asumimos que vienen strings tipo 'Yape', 'Plin', 'Efectivo'
          setPaymentMethods(result.data.paymentsMethod);
        }

        setLoading(false);
      } catch (error) {
        enqueueSnackbar(`Error de red al cargar configuración: ${error}`, {
          variant: "error",
        });
        setLoading(false);
      }
    };

    fetchConfig();
  }, [token]);

  return { paymentMethods, loading };
};
