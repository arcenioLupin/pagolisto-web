import { useEffect, useState } from 'react'
import { Box, Typography, Divider  } from '@mui/material'
import { useDashboardFilters } from '@/hooks/useDashboardFilters'
import DateFilter from '@/components/dashboard/DateFilter'
import DashboardSummaryCards from '@/components/dashboard/DashboardSummaryCards'
import { useAuth } from '@/hooks/useAuth'
import { useDashboardData } from '@/hooks/useDashboardData'
import DashboardSalesByPaymentTypeChart from '@/components/dashboard/DashboardSalesByPaymentTypeChart'
import DashboardChargesOverTimeChart from '@/components/dashboard/DashboardChargesOverTimeChart'
import DashboardPaymentRequestsOverTimeChart from '@/components/dashboard/DashboardPaymentRequestsOverTimeChart'
  // import useResponsive from '@/hooks/useResponsive';


const DashboardPage = () => {
  const { range, preset, setRange, handlePresetChange } = useDashboardFilters()
  const { fetchSummary, fetchByPaymentType, fetchChargesOverTime, fetchPaymentRequestsOverTime } = useDashboardData()
  const { user } = useAuth()
  // const { isMobile } = useResponsive();
  const [summary, setSummary] = useState({
    totalSales: 0,
    chargesCount: 0,
    paymentRequestsCount: 0
  })

  const [chargesByMethod, setChargesByMethod] = useState([])
  const [chargesOverTime, setChargesOverTime] = useState([])
  const [paymentRequestsOverTime, setPaymentRequestsOverTime] = useState([])  


  useEffect(() => {
    const [startDate, endDate] = range
    const merchantId = user?.merchantId
    if (startDate && endDate && merchantId) {
      fetchSummary(merchantId, startDate.toISOString(), endDate.toISOString())
        .then((data) => {
          if (data) setSummary(data)
        })
    }
  }, [range, fetchSummary, user?.merchantId])

    useEffect(() => {
    const [startDate, endDate] = range
    const merchantId = user?.merchantId
    if (startDate && endDate && merchantId) {
      fetchByPaymentType(merchantId, startDate.toISOString(), endDate.toISOString())
        .then((data) => {
          if (data) setChargesByMethod(data)
        })
    }
  }, [range, user?.merchantId, fetchByPaymentType])

  useEffect(() => {
    const [startDate, endDate] = range
    const merchantId = user?.merchantId
    if (startDate && endDate && merchantId) {
      fetchChargesOverTime(merchantId, startDate.toISOString(), endDate.toISOString())
        .then((data) => {
          if (data) setChargesOverTime(data)
        })
    }
  }, [range, user?.merchantId, fetchChargesOverTime])

  useEffect(() => {
    const [startDate, endDate] = range
    const merchantId = user?.merchantId
    if (startDate && endDate && merchantId) {
      fetchPaymentRequestsOverTime(merchantId, startDate.toISOString(), endDate.toISOString())
        .then((data) => {
          if (data) setPaymentRequestsOverTime(data)
        })
    }
  }, [range, user?.merchantId, fetchPaymentRequestsOverTime])

  return (
    <Box
      sx={{
        px: { xs: 1.5, md: 2 },
        py: 2,
        overflowX: 'hidden',      // <- corta cualquier desborde
        maxWidth: 1280,
        mx: 'auto',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Resumen de Actividad
      </Typography>

      
          <DateFilter
            preset={preset}
            range={range}
            onPresetChange={handlePresetChange}
            onRangeChange={setRange}
          />

       <Box sx={{ mt: 2, overflowX: 'hidden' }}>
          <DashboardSummaryCards
            totalSales={summary.totalSales}
            chargesCount={summary.chargesCount}
            paymentRequestsCount={summary.paymentRequestsCount}
          />
        </Box>  

      <Divider sx={{ my: 3 }} />
      <Box sx={{ overflowX: 'hidden' }}>
        <DashboardSalesByPaymentTypeChart  data={chargesByMethod}/>
      </Box>

      <Divider sx={{ my: 3 }} />

       <Box sx={{ overflowX: 'hidden' }}>
        <DashboardChargesOverTimeChart  data={chargesOverTime} />
      </Box>

      <Divider sx={{ my: 3 }} />

       <Box sx={{ overflowX: 'hidden' }}>
         <DashboardPaymentRequestsOverTimeChart data={paymentRequestsOverTime} />
      </Box>
    </Box>
  )
}

export default DashboardPage
