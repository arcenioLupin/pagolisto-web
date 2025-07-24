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


const ChargeModal = ({ open, onClose, initialData }: ChargeModalProps) => {

  const {
    reset,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    control,
    onSubmit,
    getButtonCgargeText
  } = useChargeModal(
    initialData || {
      client: "",
      amount: 0,
      paymentType: "Yape",
      expirationDate: new Date(),
      description: "",
    }, onClose
  );

  useEffect(() => {
    if (initialData) {
      const validData = {
        ...initialData,
        paymentType: paymentTypes.includes(initialData.paymentType)
          ? initialData.paymentType
          : "Yape", // fallback seguro
      };

      reset(validData);
    }
  }, [initialData, reset]);

 /*const onSubmit = async (data: NewChargeFormData) => {
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
        enqueueSnackbar("Charge actualizado con éxito", { variant: "success" });
      } else {
        addCharge(result.data);
        enqueueSnackbar("Charge creado con éxito", { variant: "success" });
      }

      onClose();
      reset();
    } catch (error) {
      enqueueSnackbar("Error al guardar el charge", { variant: "error" });
    }
  };

  const getButtonCgargeText = (): string => {
    if (initialData?._id) return "Actualizar";
    return "Crear";
  };*/

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
                label="Tipo de pago"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.paymentType}
                helperText={errors.paymentType?.message}
              >
                {paymentTypes.map((type) => (
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
            {isSubmitting ? "Creating..." : getButtonCgargeText()}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChargeModal;
