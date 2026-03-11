import { useEffect, useState } from "react"
import { ShieldCheck, Users, Calendar, Clock, Mail, Phone, Building2 } from "lucide-react"
import { getVisits } from "../api/visits"
import { getProperties } from "../api/properties"
import useVisitStore from "../store/useVisitStore"

const statusStyles = {
  pendiente: "bg-yellow-100 text-yellow-700",
  confirmada: "bg-green-100 text-green-700",
  cancelada: "bg-red-100 text-red-700",
}

const PanelAdmin = () => {
  const { visits, setVisits } = useVisitStore((state) => state)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Llamamos ambas APIs en paralelo — más eficiente que esperar una por una
        const [visitsData, propertiesData] = await Promise.all([
          getVisits(),
          getProperties()
        ])
        setVisits(visitsData)
        setProperties(propertiesData)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Estadísticas rápidas
  const stats = [
    {
      label: "Total Visitas",
      value: visits.length,
      icon: <Calendar size={22} className="text-amber-500" />,
      bg: "bg-amber-50"
    },
    {
      label: "Pendientes",
      value: visits.filter(v => v.status === "pendiente").length,
      icon: <Clock size={22} className="text-yellow-500" />,
      bg: "bg-yellow-50"
    },
    {
      label: "Propiedades",
      value: properties.length,
      icon: <Building2 size={22} className="text-blue-500" />,
      bg: "bg-blue-50"
    },
    {
      label: "Clientes únicos",
      value: new Set(visits.map(v => v.clientEmail)).size,
      icon: <Users size={22} className="text-green-500" />,
      bg: "bg-green-50"
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-amber-100 p-2.5 rounded-xl">
          <ShieldCheck size={24} className="text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Panel Administrador</h1>
          <p className="text-slate-500 text-sm">Gestión de visitas y propiedades</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 flex flex-col gap-2`}>
            <div className="flex justify-between items-start">
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabla de visitas */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Todas las Visitas</h2>
          <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            {visits.length} registros
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin text-3xl mb-3">⏳</div>
            <p className="text-slate-400 text-sm">Cargando datos...</p>
          </div>
        )}

        {/* Tabla desktop */}
        {!loading && visits.length > 0 && (
          <>
            {/* Vista tabla — solo en pantallas medianas+ */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-5 py-3">Cliente</th>
                    <th className="text-left px-5 py-3">Propiedad</th>
                    <th className="text-left px-5 py-3">Fecha</th>
                    <th className="text-left px-5 py-3">Hora</th>
                    <th className="text-left px-5 py-3">Contacto</th>
                    <th className="text-left px-5 py-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">{visit.clientName}</p>
                        <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                          <Mail size={11} />
                          <span>{visit.clientEmail}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-slate-700 font-medium line-clamp-1">
                          {visit.propertyTitle}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Calendar size={13} className="text-amber-500" />
                          <span>{visit.date}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Clock size={13} className="text-amber-500" />
                          <span>{visit.time}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                          <Phone size={11} />
                          <span>{visit.clientPhone}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                          statusStyles[visit.status] || "bg-slate-100 text-slate-600"
                        }`}>
                          {visit.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista cards — solo en mobile */}
            <div className="md:hidden divide-y divide-slate-100">
              {visits.map((visit) => (
                <div key={visit.id} className="p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-slate-800">{visit.clientName}</p>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                      statusStyles[visit.status] || "bg-slate-100 text-slate-600"
                    }`}>
                      {visit.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{visit.propertyTitle}</p>
                  <div className="flex gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-amber-500" /> {visit.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-amber-500" /> {visit.time}
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail size={11} /> {visit.clientEmail}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={11} /> {visit.clientPhone}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Sin visitas */}
        {!loading && visits.length === 0 && (
          <div className="text-center py-16">
            <Calendar size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No hay visitas registradas aún</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PanelAdmin