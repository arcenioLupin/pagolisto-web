import type { DashboardSummaryCardsProps, SummaryCardProps } from '@/interface/dashboard'
import { Box, Card, CardContent, Typography } from '@mui/material'


const SummaryCard = ({ title, value }: SummaryCardProps) => (
  <Card sx={{ flex: 1, minWidth: 200 }}>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
)



const DashboardSummaryCards = ({
  totalSales,
  chargesCount,
  paymentRequestsCount
}: DashboardSummaryCardsProps) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
      <SummaryCard title="Total vendido" value={`S/ ${totalSales.toFixed(2)}`} />
      <SummaryCard title="Cobros registrados" value={chargesCount} />
      <SummaryCard title="Solicitudes de pago" value={paymentRequestsCount} />
    </Box>
  )
}

export default DashboardSummaryCards
