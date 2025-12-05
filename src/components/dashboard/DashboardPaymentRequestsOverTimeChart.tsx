// src/components/dashboard/DashboardPaymentRequestsOverTimeChart.tsx
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, Typography } from '@mui/material'
import useResponsive from '@/hooks/useResponsive'

interface Props {
  data: {
    _id: string
    total: number
    count: number
  }[]
}

const DashboardPaymentRequestsOverTimeChart = ({ data }: Props) => {
  const { isMobile } = useResponsive();
  const height = isMobile ? 260 : 300;

  return (
    <Card sx={{ overflowX: 'hidden' }}>
      <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
        <Typography variant="subtitle1" gutterBottom>
          Solicitudes de pago por día
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" name="Total cobrado (S/)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardPaymentRequestsOverTimeChart
