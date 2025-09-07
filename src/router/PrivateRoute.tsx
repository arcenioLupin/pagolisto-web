import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'


interface Props {
  children: ReactElement
}

const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
