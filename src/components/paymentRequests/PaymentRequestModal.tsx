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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { paymentTypes } from "@/utils/chargesUtils";
import type { PaymentRequestModalProps } from "@/interface/paymentRequest";
import usePaymentRequestModal from "./hooks/usePaymentRequestModal";
import { useMerchantPaymentMethods } from "@/hooks/useMerchantPaymentMethods";

const PaymentRequestModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: PaymentRequestModalProps) => {

  const { register, handleSubmit, reset, errors, isSubmitting, control } =
    usePaymentRequestModal(
      initialData || {
        client: "",
        amount: 0,
        paymentType: "Yape",
        description: "",
        expirationDate: new Date(),
      }
    );

    const { paymentMethods, loading } = useMerchantPaymentMethods();
    
      useEffect(() => {
    if (initialData) {
      const availableMethods =
        paymentMethods && paymentMethods.length > 0 ? paymentMethods : paymentTypes;

      const validData = {
        ...initialData,
        paymentType: availableMethods.includes(initialData.paymentType)
          ? initialData.paymentType
          : availableMethods[0], 
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
      <DialogTitle>Nueva Solcitud de Pago</DialogTitle>
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
            type="number"
            inputProps={{ step: "any" }}
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
            multiline
            minRows={2}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="expirationDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Fecha de Expiración"
                  disablePast
                  value={field.value}
                  onChange={(date) => {
                    if (date) {
                      const normalized = new Date(date);
                      normalized.setHours(0, 0, 0, 0);
                      field.onChange(normalized);
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "normal",
                      error: !!errors.expirationDate,
                      helperText: errors.expirationDate?.message,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PaymentRequestModal;
