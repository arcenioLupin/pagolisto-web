// src/components/dashboard/DashboardPaymentRequestsOverTimeChart.tsx
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, Typography } from '@mui/material'

interface Props {
  data: {
    _id: string
    total: number
    count: number
  }[]
}

const DashboardPaymentRequestsOverTimeChart = ({ data }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Solicitudes de Pago en el Tiempo
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" name="Total S/" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardPaymentRequestsOverTimeChart
