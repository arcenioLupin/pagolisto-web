import type { PaymentRequest } from "@/interface/paymentRequest";
import { getExpirationStatus } from "@/utils/paymentRequestUtils";
import { useSnackbar } from "notistack";

const usePaymentRequestDetailDialog = (request: PaymentRequest | null) => {
  const { enqueueSnackbar } = useSnackbar();

  if (!request) return null;

  const clientUrl = `${window.location.origin}/mark-paid/${request.publicToken}`;

  const handleCopy = async () => {
    try {
      if (!clientUrl) return;

      // 1) Mobile moderno: Web Share API → "Enviar link al cliente"
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "ControlWallet – Link de pago",
          text: "Te envío el link para completar tu pago:",
          url: clientUrl,
        });
        return;
      }

      // 2) Clipboard API moderna
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(clientUrl);
        enqueueSnackbar("🔗 Link copiado al portapapeles", {
          variant: "success",
        });
        return;
      }

      // 3) Fallback legacy con textarea (para navegadores viejos)
      const textarea = document.createElement("textarea");
      textarea.value = clientUrl;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      enqueueSnackbar("🔗 Link copiado al portapapeles", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("No se pudo compartir o copiar el link", {
        variant: "error",
      });
    }
  };

  const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString() : "—";

  const status = getExpirationStatus(request.expirationDate);

  return {
    handleCopy,
    formatDate,
    status,
    clientUrl,
  };
};

export default usePaymentRequestDetailDialog;
