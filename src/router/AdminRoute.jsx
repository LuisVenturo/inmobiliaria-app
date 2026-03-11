import { Navigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"

// Protege rutas que requieren ser admin
const AdminRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user)

  // Si no es admin, manda a unauthorized
  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default AdminRoute