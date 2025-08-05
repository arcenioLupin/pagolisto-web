import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale'
import type { DatePickerProps } from '@/interface/dashboard'



const DateFilter = ({ preset, range, onPresetChange, onRangeChange }: DatePickerProps) => {
  const [start, end] = range

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap" mb={2}>
        <ToggleButtonGroup
          value={preset}
          exclusive
          onChange={(_, val) => val && onPresetChange(val)}
          size="small"
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
              slots={{ field: DateField }}
            />
            <DatePicker
              label="Hasta"
              value={end}
              onChange={(newEnd) => onRangeChange([start, newEnd])}
              slots={{ field: DateField }}
            />
          </>
        )}
      </Box>
    </LocalizationProvider>
  )
}

export default DateFilter
