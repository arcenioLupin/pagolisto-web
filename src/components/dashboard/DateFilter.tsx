import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale'
import type { DatePickerProps } from '@/interface/dashboard'
import useResponsive from '@/hooks/useResponsive'



const DateFilter = ({ preset, range, onPresetChange, onRangeChange }: DatePickerProps) => {
  const [start, end] = range
  const { isMobile } = useResponsive();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap" mb={2}  sx={{ width: '100%' }}>
        <ToggleButtonGroup
          value={preset}
          exclusive
          onChange={(_, val) => val && onPresetChange(val)}
          size="small"
          sx={{
            display: 'flex',
            flexWrap: 'wrap', 
            gap: 1,
            '& .MuiToggleButton-root': {
              flex: isMobile ? '1 1 48%' : '0 0 auto', 
              minWidth: isMobile ? 'auto' : 0,
              whiteSpace: 'nowrap',
            },
          }}
        >
          <ToggleButton value="3d">Últimos 3 días</ToggleButton>
          <ToggleButton value="7d">Última semana</ToggleButton>
          <ToggleButton value="1m">Último mes</ToggleButton>
          <ToggleButton value="1y">Último año</ToggleButton>
          <ToggleButton value="custom">Personalizado</ToggleButton>
        </ToggleButtonGroup>

        {preset === 'custom' && (
          <>
            <DatePicker
              label="Desde"
              value={start}
              onChange={(newStart) => onRangeChange([newStart, end])}
              slotProps={{ textField: { size: 'small' } }}
              sx={{ width: { xs: '100%', sm: 280 } }}
            />
            <DatePicker
              label="Hasta"
              value={end}
              onChange={(newEnd) => onRangeChange([start, newEnd])}
              slotProps={{ textField: { size: 'small' } }}
              sx={{ width: { xs: '100%', sm: 280 } }}
            />
          </>
        )}
      </Box>
    </LocalizationProvider>
  )
}

export default DateFilter
