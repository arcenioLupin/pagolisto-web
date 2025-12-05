// src/components/dashboard/DashboardChargesOverTimeChart.tsx
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, Typography } from '@mui/material'
import useResponsive from '@/hooks/useResponsive'

interface Props {
  data: {
    _id: string // fecha (formato YYYY-MM-DD)
    total: number
    count: number
  }[]
}

const DashboardChargesOverTimeChart = ({ data }: Props) => {
  const { isMobile } = useResponsive();
  const height = isMobile ? 260 : 300;

  return (
    <Card sx={{ overflowX: 'hidden' }}>
      <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
        <Typography variant="subtitle1" gutterBottom>
          Cobros por día
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" name="Total cobrado (S/)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardChargesOverTimeChart
