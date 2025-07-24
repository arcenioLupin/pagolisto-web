
const useCancelPRDialog = (setOpenConfirm: (open: boolean) => void) => {

 const handleCloseCancelPaymentRequest = () => {
    setOpenConfirm(false)
    // Esperamos a que el DOM libere focus antes de limpiar
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    })
  } 
  return {
  handleCloseCancelPaymentRequest
  }
}

export default useCancelPRDialog
