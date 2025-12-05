import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { paymentTypes } from "@/utils/chargesUtils";
import type { ChargeModalProps } from "@/interface/charges";
import useChargeModal from "./hooks/useChargeModal";
import { useMerchantPaymentMethods } from "../../hooks/useMerchantPaymentMethods";


const ChargeModal = ({ open, onClose, initialData }: ChargeModalProps) => {

  const {
    reset,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    control,
    onSubmit,
    getButtonChargeText
  } = useChargeModal(
    initialData || {
      client: "",
      amount: 0,
      paymentType: "Yape",
      expirationDate: new Date(),
      description: "",
    }, onClose
  );
   const { paymentMethods, loading } = useMerchantPaymentMethods();

    useEffect(() => {
    if (initialData) {
      // usamos los métodos de config; si por alguna razón vienen vacíos, usamos los defaults
      const availableMethods =
        paymentMethods && paymentMethods.length > 0 ? paymentMethods : paymentTypes;

      const validData = {
        ...initialData,
        paymentType: availableMethods.includes(initialData.paymentType)
          ? initialData.paymentType
          : availableMethods[0], // fallback seguro: primer método disponible
      };

      reset(validData);
    }
  }, [initialData, reset, paymentMethods]);



  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableEnforceFocus
    >
      <DialogTitle>
        {initialData?._id ? "Editar cobro" : "Nuevo cobro"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <TextField
            label="Cliente"
            fullWidth
            margin="normal"
            {...register("client")}
            error={!!errors.client}
            helperText={errors.client?.message}
          />

          <TextField
            label="Monto"
            fullWidth
            margin="normal"
            inputProps={{ step: "any" }}
            type="number"
            {...register("amount")}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />


          <Controller
            name="paymentType"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Método de pago"
                fullWidth
                margin="normal"
                {...field}
                disabled={loading}
                error={!!errors.paymentType}
                helperText={errors.paymentType?.message}
              >
                {paymentMethods.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />


          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : getButtonChargeText()}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChargeModal;
