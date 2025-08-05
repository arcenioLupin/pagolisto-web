// src/components/dashboard/DashboardChargesOverTimeChart.tsx
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, Typography } from '@mui/material'

interface Props {
  data: {
    _id: string // fecha (formato YYYY-MM-DD)
    total: number
    count: number
  }[]
}

const DashboardChargesOverTimeChart = ({ data }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Cobros en el Tiempo
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" name="Total S/" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardChargesOverTimeChart
