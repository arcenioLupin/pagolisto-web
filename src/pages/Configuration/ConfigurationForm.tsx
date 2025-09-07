import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useConfiguration from "@/hooks/useConfiguration";

const ConfigurationForm = () => {
  const { fetchConfig, control, handleSubmit, errors, isSubmitting, onSubmit } =
    useConfiguration();

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Configuración del Comercio
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Este campo es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Teléfono"
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          rules={{ required: "Este campo es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dirección"
              fullWidth
              margin="normal"
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />

        <Controller
          name="paymentsMethod"
          control={control}
          rules={{ required: "Este campo es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Métodos de pago (separados por coma)"
              fullWidth
              margin="normal"
              error={!!errors.paymentsMethod}
              helperText={errors.paymentsMethod?.message}
            />
          )}
        />

        {/* QR de Yape */}
        <Controller
          name="walletQrImageYape"
          control={control}
          render={({ field }) => (
            <>
              <Typography variant="subtitle2" mt={2}>QR de Yape</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    field.onChange(reader.result?.toString() || '');
                  };
                  reader.readAsDataURL(file);
                }}
              />
              {field.value && (
                <Box mt={1}>
                  <img
                    src={field.value}
                    alt="QR Yape"
                    style={{ maxWidth: '150px', borderRadius: '8px' }}
                  />
                </Box>
              )}
            </>
          )}
        />

        {/* QR de Plin */}
        <Controller
          name="walletQrImagePlin"
          control={control}
          render={({ field }) => (
            <>
              <Typography variant="subtitle2" mt={2}>QR de Plin</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    field.onChange(reader.result?.toString() || '');
                  };
                  reader.readAsDataURL(file);
                }}
              />
              {field.value && (
                <Box mt={1}>
                  <img
                    src={field.value}
                    alt="QR Plin"
                    style={{ maxWidth: '150px', borderRadius: '8px' }}
                  />
                </Box>
              )}
            </>
          )}
        />


        <Box mt={2} display="flex" justifyContent="center">
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar configuración"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ConfigurationForm;
