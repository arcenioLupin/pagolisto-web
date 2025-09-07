/* eslint-disable react-refresh/only-export-components */
import ScheduleIcon from '@mui/icons-material/Schedule'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { forwardRef } from 'react'
import type { TransitionProps } from 'notistack'
import { Slide } from '@mui/material'

export const formatMoney = (amount: number, currency = 'PEN', locale = 'es-PE') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}


// Función para obtener estado visual de expiración
export const getExpirationStatus = (expirationDateStr?: string) => {
  if (!expirationDateStr) {
    return {
      label: 'Sin fecha de expiración',
      color: 'default' as const,
      icon: <ScheduleIcon />,
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const expiration = new Date(expirationDateStr)
  expiration.setHours(0, 0, 0, 0)

  const isExpired = expiration < today
  const isToday = expiration.getTime() === today.getTime()

  if (isExpired) {
    return {
      label: 'Expirado',
      color: 'error' as const,
      icon: <EventBusyIcon />,
    }
  }

  if (isToday) {
    return {
      label: 'Expira hoy',
      color: 'warning' as const,
      icon: <ScheduleIcon />,
    }
  }

  return {
    label: `Expira: ${expiration.toLocaleDateString()}`,
    color: 'success' as const,
    icon: <EventAvailableIcon />,
  }
}

export const SlideUp = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})
