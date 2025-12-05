// src/components/dashboard/DashboardSalesByPaymentTypeChart.tsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, Typography } from '@mui/material'
import useResponsive from '@/hooks/useResponsive'

type PaymentTypeData = {
  paymentType: string
  totalAmount: number
}[]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface Props {
  data: PaymentTypeData
}

const DashboardSalesByPaymentTypeChart = ({ data }: Props) => {
  const { isMobile } = useResponsive();
  const height = isMobile ? 260 : 300;
  const radius = isMobile ? 80 : 100;
  return (
    <Card sx={{ overflowX: 'hidden' }}>
      <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
        <Typography variant="subtitle1" gutterBottom>
          Ventas por método de pago
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              dataKey="totalAmount"
              nameKey="paymentType"
              cx="50%"
              cy="50%"
              outerRadius={radius}
              label={!isMobile}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardSalesByPaymentTypeChart
