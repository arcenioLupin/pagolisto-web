// src/components/dashboard/DashboardSalesByPaymentTypeChart.tsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, Typography } from '@mui/material'

type PaymentTypeData = {
  paymentType: string
  totalAmount: number
}[]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface Props {
  data: PaymentTypeData
}

const DashboardSalesByPaymentTypeChart = ({ data }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Ventas por Método de Pago
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="totalAmount"
              nameKey="paymentType"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
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
