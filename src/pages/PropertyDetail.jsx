import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MapPin, Bed, Bath, Maximize, Calendar, Phone, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Swal from "sweetalert2"
import { getPropertyById } from "../api/properties"
import { createVisit } from "../api/visits"
import useAuthStore from "../store/useAuthStore"
import useVisitStore from "../store/useVisitStore"

const PropertyDetail = () => {
  const { id } = useParams()        // extrae el :id de la URL
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const addVisit = useVisitStore((state) => state.addVisit)

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    clientName: user?.name || "",
    clientEmail: user?.email || "",
    clientPhone: "",
    date: "",
    time: "",
    message: ""
  })

  // Cargar propiedad al montar
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const data = await getPropertyById(id)
        setProperty(data)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validación
    if (!formData.clientPhone || !formData.date || !formData.time) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa teléfono, fecha y hora",
        confirmButtonColor: "#f59e0b"
      })
      return
    }

    // Confirmar antes de enviar
    const confirm = await Swal.fire({
      icon: "question",
      title: "¿Confirmar visita?",
      html: `
        <p><strong>Propiedad:</strong> ${property.title}</p>
        <p><strong>Fecha:</strong> ${formData.date} a las ${formData.time}</p>
      `,
      showCancelButton: true,
      confirmButtonText: "Sí, agendar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#f59e0b"
    })

    if (!confirm.isConfirmed) return

    try {
      setSubmitting(true)

      const visitData = {
        ...formData,
        propertyId: property.id,
        propertyTitle: property.title,
        status: "pendiente"
      }

      const newVisit = await createVisit(visitData)

      // Guardar en Zustand para no volver a llamar la API
      addVisit(newVisit)

      await Swal.fire({
        icon: "success",
        title: "¡Visita agendada!",
        text: "Nos pondremos en contacto contigo pronto",
        confirmButtonColor: "#f59e0b"
      })

      // Redirigir a mis visitas
      navigate("/my-visits")

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al agendar",
        text: "No se pudo registrar la visita",
        confirmButtonColor: "#f59e0b"
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
        <div className="bg-slate-200 h-72 rounded-2xl mb-6" />
        <div className="bg-slate-200 h-8 rounded w-2/3 mb-3" />
        <div className="bg-slate-200 h-4 rounded w-1/3" />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Propiedad no encontrada</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Volver */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-slate-500 hover:text-amber-500 text-sm mb-6 transition"
      >
        <ArrowLeft size={16} /> Volver a propiedades
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna izquierda — info propiedad */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Imagen */}
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-72 object-cover"
              onError={(e) => { e.target.src = "https://placehold.co/800x400?text=Sin+imagen" }}
            />
            <span className={`absolute top-4 left-4 text-sm font-bold px-4 py-1.5 rounded-full text-white ${
              property.operation === "venta" ? "bg-blue-600" : "bg-green-600"
            }`}>
              {property.operation === "venta" ? "En Venta" : "En Alquiler"}
            </span>
          </div>

          {/* Título y ubicación */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{property.title}</h1>
                <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                  <MapPin size={14} />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Precio</p>
                <p className="text-2xl font-bold text-amber-600">
                  ${property.price.toLocaleString()}
                  {property.operation === "alquiler" &&
                    <span className="text-sm font-normal text-slate-400">/mes</span>
                  }
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-slate-100">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Bed size={18} className="text-amber-500" />
                  <span className="text-sm"><strong>{property.bedrooms}</strong> habitaciones</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-600">
                <Bath size={18} className="text-amber-500" />
                <span className="text-sm"><strong>{property.bathrooms}</strong> baños</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Maximize size={18} className="text-amber-500" />
                <span className="text-sm"><strong>{property.area}</strong> m²</span>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-slate-800 mb-3">Descripción</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{property.description}</p>
          </div>
        </div>

        {/* Columna derecha — formulario visita */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <Calendar size={18} className="text-amber-500" />
              <h2 className="font-bold text-slate-800">Agendar Visita</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              {/* Nombre */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  placeholder="999 888 777"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Fecha */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  Fecha *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Hora */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  Hora *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500 transition"
                >
                  <option value="">Selecciona una hora</option>
                  {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"].map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  Mensaje (opcional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="¿Alguna pregunta o comentario?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500 transition resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition mt-1"
              >
                {submitting ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <>
                    <CheckCircle size={16} /> Confirmar Visita
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail