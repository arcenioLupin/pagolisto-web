import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
  redirectTo?: string
}

const PublicRoute = ({ children, redirectTo = "/dashboard" }: Props) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Navigate to={redirectTo} replace /> : children
}

export default PublicRoute
