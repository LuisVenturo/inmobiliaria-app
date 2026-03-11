import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, Clock, Phone, MapPin, Plus, Inbox } from "lucide-react"
import { getVisitsByEmail } from "../api/visits"
import useAuthStore from "../store/useAuthStore"
import useVisitStore from "../store/useVisitStore"

const statusStyles = {
  pendiente: "bg-yellow-100 text-yellow-700",
  confirmada: "bg-green-100 text-green-700",
  cancelada: "bg-red-100 text-red-700",
}

const MyVisits = () => {
  const user = useAuthStore((state) => state.user)
  const { myVisits, setMyVisits } = useVisitStore((state) => state)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyVisits = async () => {
      try {
        setLoading(true)
        const data = await getVisitsByEmail(user?.email)
        setMyVisits(data)
      } catch (error) {
        console.error("Error cargando visitas:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMyVisits()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mis Visitas</h1>
          <p className="text-slate-500 text-sm mt-1">Historial de visitas agendadas</p>
        </div>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          <Plus size={16} /> Agendar nueva visita
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-5 h-24 animate-pulse">
              <div className="bg-slate-200 h-4 rounded w-1/2 mb-3" />
              <div className="bg-slate-200 h-3 rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Sin visitas */}
      {!loading && myVisits.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <Inbox size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-semibold">No tienes visitas agendadas</p>
          <p className="text-slate-400 text-sm mt-1">Explora las propiedades y agenda tu primera visita</p>
          <Link
            to="/dashboard"
            className="inline-block mt-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
          >
            Ver propiedades
          </Link>
        </div>
      )}

      {/* Lista de visitas */}
      {!loading && myVisits.length > 0 && (
        <div className="flex flex-col gap-4">
          {myVisits.map((visit) => (
            <div
              key={visit.id}
              className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-800">{visit.propertyTitle}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                    statusStyles[visit.status] || "bg-slate-100 text-slate-600"
                  }`}>
                    {visit.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-amber-500" />
                    <span>{visit.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-amber-500" />
                    <span>{visit.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={14} className="text-amber-500" />
                    <span>{visit.clientPhone}</span>
                  </div>
                </div>
                {visit.message && (
                  <p className="text-xs text-slate-400 italic">"{visit.message}"</p>
                )}
              </div>
              <Link
                to={`/property/${visit.propertyId}`}
                className="flex items-center gap-1 text-amber-500 hover:text-amber-600 text-sm font-semibold whitespace-nowrap transition"
              >
                <MapPin size={14} /> Ver propiedad
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyVisits