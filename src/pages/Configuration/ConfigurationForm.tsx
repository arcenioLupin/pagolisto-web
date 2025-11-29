import { Box, Button, Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useConfiguration from "@/hooks/useConfiguration";

const ConfigurationForm = () => {
  const { fetchConfig, control, handleSubmit, errors, isSubmitting, onSubmit, paymentMethodOptions } =
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


        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.paymentsMethod}
        >
          <InputLabel id="payments-method-label">
            Métodos de pago aceptados
          </InputLabel>

          <Controller
            name="paymentsMethod"
            control={control}
            rules={{ required: "Selecciona al menos un método de pago" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="payments-method-label"
                multiple
                input={<OutlinedInput label="Métodos de pago aceptados" />}
                // aseguramos que siempre sea array
                value={field.value || []}
                onChange={(event) => {
                  const value = event.target.value as string[];
                  field.onChange(value);
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      const option = paymentMethodOptions.find(
                        (opt) => opt.value === value
                      );

                      const label = option?.label ?? value;

                      const handleDelete = (e: React.MouseEvent) => {
                        e.stopPropagation(); // evitar que se abra el menú
                        const newValue = (field.value || []).filter(
                          (m: string) => m !== value
                        );
                        field.onChange(newValue);
                      };

                      return (
                        <Chip
                          key={value}
                          label={label}
                          size="small"
                          onMouseDown={(e) => e.stopPropagation()} // no abrir el select al hacer click en la X
                          onDelete={handleDelete}
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {paymentMethodOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          {errors.paymentsMethod && (
            <FormHelperText>
              {errors.paymentsMethod.message as string}
            </FormHelperText>
          )}
        </FormControl>



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
