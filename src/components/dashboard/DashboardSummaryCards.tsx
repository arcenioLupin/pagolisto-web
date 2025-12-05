import type { DashboardSummaryCardsProps, SummaryCardProps } from '@/interface/dashboard'
import { Box, Card, CardContent, Typography } from '@mui/material'


const SummaryCard = ({ title, value }: SummaryCardProps) => (
   <Card sx={{ flex: '1 1 160px', minWidth: { xs: 140, sm: 180, md: 200 }, maxWidth: '100%' }}>
    <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
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
    <Box display="flex" flexWrap="wrap" gap={1.5} mb={2} sx={{ overflowX: 'hidden' }}>
      <SummaryCard title="Total vendido" value={`S/ ${totalSales.toFixed(2)}`} />
      <SummaryCard title="Cobros registrados" value={chargesCount} />
      <SummaryCard title="Solicitudes de pago creadas" value={paymentRequestsCount} />
    </Box>
  )
}

export default DashboardSummaryCards
