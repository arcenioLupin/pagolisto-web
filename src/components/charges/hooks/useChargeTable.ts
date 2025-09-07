import type { Charge } from "@/interface/charges"
import { useState } from "react"


const useChargeComponent = ( charges: Charge[] ) => {

      const [page, setPage] = useState(0)
      const [rowsPerPage, setRowsPerPage] = useState(5)
    
    
      const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage)
      }
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
      }
    
      const paginatedCharges = charges.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )

   

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedCharges
  }
}

export default useChargeComponent
