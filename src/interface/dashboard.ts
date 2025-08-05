import type { PresetType } from "@/types/dashboard"

export interface DatePickerProps {
  preset: PresetType
  range: [Date | null, Date | null]
  onPresetChange: (value: PresetType) => void
  onRangeChange: (value: [Date | null, Date | null]) => void
}

export interface SummaryCardProps {
  title: string
  value: string | number
}

export interface DashboardSummaryCardsProps {
  totalSales: number
  chargesCount: number
  paymentRequestsCount: number
}