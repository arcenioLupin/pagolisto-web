import { usePaymentRequestStore } from "@/store/usePaymentRequestStore";
import { useAuth } from "./useAuth";
import { useSnackbar } from "notistack";
import { useState } from "react";
import type { NewPaymentRequestFormData } from "@/schemas/newPaymentRequestSchema";
import type { PaymentRequest } from "@/interface/paymentRequest";

const usePaymentRequest = () => {
  const { fetchPaymentRequests, paymentRequests, markAsPaid } =  usePaymentRequestStore();
  const { token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    paymentType: "",
    status: "",
    expiration: "",
  });
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleView = (request: PaymentRequest) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  const handleMarkAsPaid = async (id: string) => {
    try {
      await markAsPaid(id);
      enqueueSnackbar("✅ El pago ha sido marcado como pagado", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Ocurrió un error al marcar como pagado", {
        variant: "error",
      });
    }
  };

  const handleSaveRequest = async (data: NewPaymentRequestFormData) => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/payment-requests`;

      const method = "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al crear la solicitud de pag0");

      await fetchPaymentRequests(); // 🔁 solo recarga si el POST fue exitoso

      enqueueSnackbar("Cobro creado con éxito", { variant: "success" });
      setModalOpen(false);
      //evitar que el botón Submit quede enfocado
      requestAnimationFrame(() => { 
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    })
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error al guardar el charge", { variant: "error" });
    }
  };

  const filteredRequests = paymentRequests.filter((req) => {
    const matchesPayment = filters.paymentType
      ? req.paymentType === filters.paymentType
      : true;
    const matchesStatus = filters.status ? req.status === filters.status : true;
    const matchesExpiration = (() => {
      if (!filters.expiration) return true;
      if (!req.expirationDate) return false;

      const today = new Date();
      const expiration = new Date(req.expirationDate);
      expiration.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (filters.expiration === "today") {
        return expiration.getTime() === today.getTime();
      }
      if (filters.expiration === "next7days") {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return expiration > today && expiration <= nextWeek;
      }
      if (filters.expiration === "expired") {
        return req.status === "expired";
      }
      return true;
    })();

    return matchesPayment && matchesStatus && matchesExpiration;
  });

  const handleClosePaymentRequestModal = () => {
    setModalOpen(false);
    requestAnimationFrame(() => { 
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    })
  };

const handleClosePaymentRequesDetailstModal = () => {
    setViewDialogOpen(false);
    // Evitar que el botón de cerrar quede enfocado
    requestAnimationFrame(() => { 
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    })
  };

  return {
    fetchPaymentRequests,
    paymentRequests: filteredRequests,
    handleMarkAsPaid,
    handleSaveRequest,
    modalOpen,
    setModalOpen,
    filters,
    setFilters,
    selectedRequest,
    setSelectedRequest,
    viewDialogOpen,
    setViewDialogOpen,
    handleView,
    token,
    handleClosePaymentRequestModal,
    handleClosePaymentRequesDetailstModal
  };
};

export default usePaymentRequest;
