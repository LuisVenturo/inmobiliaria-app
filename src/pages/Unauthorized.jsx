import { Link } from "react-router-dom"
import { ShieldOff } from "lucide-react"
import useAuthStore from "../store/useAuthStore"

const Unauthorized = () => {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="text-center max-w-md">
        <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldOff size={36} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Acceso Denegado</h1>
        <p className="text-slate-500 mb-6">
          No tienes permisos para ver esta página.
        </p>
        <Link
          to={user?.role === "admin" ? "/panel-admin" : "/dashboard"}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized