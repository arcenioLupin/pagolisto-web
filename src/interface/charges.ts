import type { newChargeSchema } from "@/schemas/newChargeSchema";
import type { z } from "zod";

export interface ChargesDeleteDialogProps {
  setDeleteDialogOpen: (open: boolean) => void ;
  deleteDialogOpen: boolean;
  confirmDelete: () => void;
}

export interface Charge {
  _id: string
  client: string
  amount: number
  paymentType: string
  status: string
  createdAt: string
  description?: string
  expirationDate?: Date | string | undefined
}

export interface ChargesTableProps {
  charges: Charge[];
  onEdit?: (charge: Charge) => void;
  onDelete?: (id: string) => void;
}

export type NewChargeFormData = z.infer<typeof newChargeSchema>

export interface ChargeModalProps {
  open: boolean
  onClose: () => void
  initialData?: NewChargeFormData& { _id?: string }
}

export interface ChargeFiltersProps {
  onFilterChange: (filters: {
    paymentType: string
    status: string
    expiration: string
  }) => void
}


