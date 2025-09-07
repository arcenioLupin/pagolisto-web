import type { ChargesDeleteDialogProps } from '@/interface/charges'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import useChargeDeleteDialog from './hooks/useChargeDeleteDialog';



const ChargesDeleteDialog = ({setDeleteDialogOpen, deleteDialogOpen, confirmDelete } : ChargesDeleteDialogProps) => {

const { handleClose } = useChargeDeleteDialog(setDeleteDialogOpen);

  return (
     <Dialog open={deleteDialogOpen} onClose={handleClose} disableEnforceFocus>
        <DialogTitle>¿Eliminar este cobro?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción no se puede deshacer. ¿Estás seguro que deseas eliminar este cobro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default ChargesDeleteDialog
