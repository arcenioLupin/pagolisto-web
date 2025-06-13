import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/Login/LoginPage'
import SignupPage from  '../pages/Signup/SignupPage'
import ConfiguracionPage from '../pages/Configuration/ConfigurationPage'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/configuracion" element={<ConfiguracionPage />} />
      </Routes>
    </BrowserRouter>
  )
}
