import { useEffect, useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ChargesTable from "@/components/charges/ChargesTable";
import ChargeFilters from "@/components/charges/ChargeFilters";
import ChargesDeleteDialog from "@/components/dialogs/ChargesDeleteDialog";
import ChargeModal from "@/components/charges/ChargeModal";
import { generateInitialData } from "@/utils/chargesUtils";
import useCharges from "@/hooks/useCharges";
import ExportMenu from "@/components/common/ExportMenu";
import { formatCurrency, formatDate, type ColumnDef } from "@/utils/exportUtils";
import type { Charge } from "@/interface/charges";
import { getStatusDescription } from "@/utils/commonUtils";
import useResponsive from "@/hooks/useResponsive";

const ChargePage = () => {
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

  const { isMobile } = useResponsive();

  useEffect(() => {
    fetchCharges();
  }, [fetchCharges]);

  // Define aquí las columnas para exportación (mismo orden/formatters que tu UI)
    const exportColumns: ColumnDef<Charge>[] = [
      { key: "_id", header: "ID de cobro" },
      { key: "client", header: "Cliente" },
      { key: "amount", header: "Monto", formatter: (v) => formatCurrency(Number(v ?? 0))},
      { key: "paymentType", header: "Método de pago" },
      { key: "status", header: "Estado",formatter: (v) => getStatusDescription(String(v))},
      { key: "createdAt", header: "Fecha de creación", formatter: (v) => formatDate(v as string)},
    ];

  const exportFileName = useMemo(
    () => `charges_${new Date().toISOString().slice(0, 10)}`,
    []
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="subtitle1">
        Aquí puedes revisar y gestionar tus cobros.
      </Typography>

      {/* Filtros */}
      <Box mt={3}>
        <ChargeFilters onFilterChange={setFilters} />
      </Box>

      {/* Acciones: Nuevo + Exportar */}
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "stretch" : "center"}
        spacing={isMobile ? 1.5 : 2}
        sx={{ mt: 2, mb: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? "small" : "medium"}
          onClick={() => setModalOpen(true)}
          sx={{
            width: isMobile ? "100%" : "auto",
            py: 0.9, px: 1.5, fontWeight: 400,
          }}
        >
          + Nuevo Cobro
        </Button>

        <ExportMenu
          rows={filteredCharges}
          columns={exportColumns}
          fileName={exportFileName}
          title="Listado de cobros"
          disabled={filteredCharges.length === 0}
          buttonProps={{
            size: isMobile ? "small" : "medium",
            sx: {
              width: isMobile ? "100%" : "auto",
              py: 0.9, px: 1.5,
            },
          }}
        />
      </Stack>


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

      <ChargesDeleteDialog
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        confirmDelete={confirmDelete}
      />
    </Box>
  );
};

export default ChargePage;

