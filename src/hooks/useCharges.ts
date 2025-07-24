import { useState } from "react";
import { useSnackbar } from "notistack";
import { useChargeStore } from "@/store/useChargeStore";
import type { Charge } from "@/interface/charges";

const useCharges = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    paymentType: "",
    status: "",
    expiration: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chargeToDelete, setChargeToDelete] = useState<string | null>(null);
  const [editingCharge, setEditingCharge] = useState<Charge | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const charges = useChargeStore((state) => state.charges);
  const fetchCharges = useChargeStore((state) => state.fetchCharges);
  const deleteCharge = useChargeStore((state) => state.deleteCharge);

  const filteredCharges = charges.filter((c) => {
    const matchesPayment = filters.paymentType
      ? c.paymentType === filters.paymentType
      : true;

    const matchesStatus = filters.status ? c.status === filters.status : true;

    const matchesExpiration = (() => {
      if (!filters.expiration) return true;
      if (!c.expirationDate) return false;

      const today = new Date();
      const expiration = new Date(c.expirationDate);
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
        return c.status === "expired";
      }

      return true;
    })();

    return matchesPayment && matchesStatus && matchesExpiration;
  });

  const handleDeleteChargeClick = (id: string) => {
    setChargeToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleEdit = (charge: Charge) => {
    setEditingCharge(charge);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!chargeToDelete) return;
    try {
      await deleteCharge(chargeToDelete); // Llama al método del store
      enqueueSnackbar("Cobro eliminado correctamente", { variant: "success" });
    } catch (error) {
      console.log(error)
      enqueueSnackbar("Error al eliminar el charge", { variant: "error" });
    } finally {
      setDeleteDialogOpen(false);
      setChargeToDelete(null);
      
    }
  };

    const handleCloseChargeModal = () => {
    setModalOpen(false);
    setEditingCharge(null);
    requestAnimationFrame(() => { 
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    })
  };

  return {
    modalOpen,
    setModalOpen,
    filters,
    setFilters,
    deleteDialogOpen,
    setDeleteDialogOpen,
    chargeToDelete,
    setChargeToDelete,
    editingCharge,
    setEditingCharge,
    filteredCharges,
    fetchCharges,
    handleDeleteChargeClick,
    handleEdit,
    confirmDelete,
    handleCloseChargeModal
  };
};

export default useCharges;
