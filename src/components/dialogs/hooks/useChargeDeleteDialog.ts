const useChargeDeleteDialog = (setDeleteDialogOpen: (open: boolean) => void) => {
    
  const handleClose = () => {
    setDeleteDialogOpen(false);
    // Esperamos a que el DOM libere focus antes de limpiar
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  };
  return {
    handleClose,
  };
};

export default useChargeDeleteDialog;
