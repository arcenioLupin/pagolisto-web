import { Box, Pagination, Stack } from '@mui/material';
import { type Charge } from '@/interface/charges';
import ChargeCard from './ChargeCard';
import useChargeComponent from './hooks/useChargeTable';

type ChargesCardListProps = {
  charges: Charge[];
  onEdit?: (charge: Charge) => void;
  onDelete?: (id: string) => void;
};

const ChargesCardList = ({ charges, onEdit, onDelete }: ChargesCardListProps) => {
  const {
    page,
    paginatedCharges,
    rowsPerPage,
    handleChangePage,
  } = useChargeComponent(charges);

  if (charges.length === 0) {
    return <Box mt={2}>No charges available.</Box>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {paginatedCharges.map((charge) => (
        <ChargeCard
          key={charge._id}
          charge={charge}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      <Stack direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(charges.length / rowsPerPage)}
          page={page + 1}
          onChange={(_, newPage) => handleChangePage(null as unknown, newPage - 1)}
          color="primary"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default ChargesCardList;
