import { useState } from 'react'
import { subDays } from 'date-fns'

export const useDashboardFilters = () => {
  const [range, setRange] = useState<[Date | null, Date | null]>([
    subDays(new Date(), 7),
    new Date()
  ])

  const [preset, setPreset] = useState<'3d' | '7d' | '1m' | '1y' | 'custom'>('7d')

  const handlePresetChange = (value: typeof preset) => {
    const now = new Date()
    let from: Date

    if (value === 'custom') {
      setPreset(value) // <- importante que esté aquí
      return
    }

    switch (value) {
      case '3d':
        from = subDays(now, 3)
        break
      case '7d':
        from = subDays(now, 7)
        break
      case '1m':
        from = subDays(now, 30)
        break
      case '1y':
        from = subDays(now, 365)
        break
    }

    setRange([from, now])
    setPreset(value)
  }

  return { range, setRange, preset, setPreset, handlePresetChange }
}
