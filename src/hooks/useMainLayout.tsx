import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PaidIcon from '@mui/icons-material/Paid'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import SettingsIcon from '@mui/icons-material/Settings'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'


const useMainLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { label: 'Resumen', path: '/dashboard', icon: <InsertChartIcon  /> },
    { label: 'Cobros', path: '/charge', icon: <PaidIcon /> },
    { label: 'Configuración', path: '/configuration', icon: <SettingsIcon /> },
    { label: 'Solicitudes de Pago', path: '/payment-requests', icon: <RequestQuoteIcon /> },
  ]

  return {
      user,
      mobileOpen,
      handleDrawerToggle,
      handleLogout,
      menuItems,
      location,
      navigate,
      setMobileOpen,
      drawerWidth 
  }
}

export default useMainLayout