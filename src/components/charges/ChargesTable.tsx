import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Paper,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { ChargesTableProps } from '@/interface/charges';
import { capitalize, getStatusColor } from '@/utils/chargesUtils';
import useChargeComponent from './hooks/useChargeTable';
import useResponsive from '../../hooks/useResponsive';
import ChargesCardList from './ChargesCardList';
import { getStatusDescription } from '@/utils/commonUtils';

const ChargesTable = ({ charges, onEdit, onDelete }: ChargesTableProps) => {
  const {
    handleChangePage,
    paginatedCharges,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
  } = useChargeComponent(charges);

  const { isMobile } = useResponsive();

  // Estado para el menú de acciones (3 puntos)
  const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChargeId, setSelectedChargeId] = useState<string | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, chargeId: string) => {
    setActionAnchorEl(event.currentTarget);
    setSelectedChargeId(chargeId);
  };

  const handleCloseMenu = () => {
    setActionAnchorEl(null);
    setSelectedChargeId(null);
  };

  const handleEditClick = () => {
    if (!onEdit || !selectedChargeId) return;
    const charge = charges.find((c) => c._id === selectedChargeId);
    if (charge) onEdit(charge);
    handleCloseMenu();
  };

  const handleDeleteClick = () => {
    if (!onDelete || !selectedChargeId) return;
    onDelete(selectedChargeId);
    handleCloseMenu();
  };

  if (charges.length === 0) {
    return (
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          No se encontraron cobros.
        </Typography>
      </Box>
    );
  }

  // Versión Cards en móviles
  if (isMobile) {
    return (
      <ChargesCardList
        charges={charges}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  // Versión tabla para pantallas grandes
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: '8px' }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#f0f0f0',
              '& > th:first-of-type': { borderTopLeftRadius: '8px' },
              '& > th:last-of-type': { borderTopRightRadius: '8px' },
            }}
          >
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Monto</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Método de pago</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Fecha de creación</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCharges.map((charge) => (
            <TableRow key={charge._id}>
              <TableCell>{charge.client}</TableCell>
              <TableCell>{charge.amount}</TableCell>
              <TableCell>{charge.paymentType}</TableCell>
              <TableCell>
                <Chip
                  label={capitalize(getStatusDescription(charge.status))}
                  color={getStatusColor(charge.status)}
                  size="small"
                  sx={{
                    minWidth: 90,
                    fontWeight: 600,
                    justifyContent: 'center',
                    textTransform: 'capitalize',
                  }}
                />
              </TableCell>
              <TableCell>{new Date(charge.createdAt).toLocaleString()}</TableCell>
              <TableCell align="center">
                <IconButton
                  size="small"
                  onClick={(e) => handleOpenMenu(e, charge._id)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Menú de acciones (Editar / Eliminar) */}
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleEditClick}>Editar cobro</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Eliminar cobro</MenuItem>
      </Menu>

      <TablePagination
        component="div"
        count={charges.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
          color: '#555',
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            marginTop: '8px',
          },
        }}
      />
    </Paper>
  );
};

export default ChargesTable;

