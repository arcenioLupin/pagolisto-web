import { useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ChargesTable from "@/components/charges/ChargesTable";
import ChargeFilters from "@/components/charges/ChargeFilters";
import ChargesDeleteDialog from "@/components/dialogs/ChargesDeleteDialog";
import ChargeModal from "@/components/charges/ChargeModal";
import { generateInitialData } from "@/utils/chargesUtils";
import useCharges from "@/hooks/useCharges";
import type { Charge } from "@/interface/charges";

const DashboardPage = () => {
  const {
    modalOpen,
    setModalOpen,
    setFilters,
    deleteDialogOpen,
    setDeleteDialogOpen,
    editingCharge,
    filteredCharges,
    fetchCharges,
    handleDeleteChargeClick,
    handleEdit,
    confirmDelete,
    handleCloseChargeModal
  } = useCharges();

  useEffect(() => {
    fetchCharges();
  }, [fetchCharges]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="subtitle1">
        Este es tu panel principal. Aquí verás tus cobros recientes y otra
        información relevante.
      </Typography>

      {/* Filtros */}
      <Box mt={3}>
        <ChargeFilters onFilterChange={setFilters} />
      </Box>

      {/* Botón de nuevo cobro */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          + Nuevo Cobro
        </Button>
      </Stack>

      {/* Tabla filtrada */}
      <ChargesTable
        charges={filteredCharges}
        onDelete={handleDeleteChargeClick}
        onEdit={handleEdit}
      />
      <ChargeModal
        open={modalOpen}
        onClose={handleCloseChargeModal}
        initialData={generateInitialData(editingCharge || ({} as Charge))}
      />

      {/* Diálogo de confirmación */}
      <ChargesDeleteDialog
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        confirmDelete={confirmDelete}
      />
    </Box>
  );
};

export default DashboardPage;
