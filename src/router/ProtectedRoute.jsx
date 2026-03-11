import { Navigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"

// Protege rutas que requieren estar logueado
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // Si no está logueado, manda al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si está logueado, muestra la página
  return children
}

export default ProtectedRoute