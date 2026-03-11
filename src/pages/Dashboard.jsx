import { useEffect } from "react"
import { getProperties } from "../api/properties"
import usePropertyStore from "../store/usePropertyStore"
import useAuthStore from "../store/useAuthStore"
import PropertyCard from "../components/PropertyCard"
import { Search, SlidersHorizontal } from "lucide-react"

const Dashboard = () => {
  const user = useAuthStore((state) => state.user)
  const { filteredProperties, filters, loading, setProperties, setFilter, setLoading } = usePropertyStore((state) => state)

  // Al montar el componente, carga las propiedades
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const data = await getProperties()
        setProperties(data)
      } catch (error) {
        console.error("Error cargando propiedades:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, []) // [] significa: ejecuta esto solo una vez al montar

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Bienvenido, <span className="text-amber-500">{user?.name}</span> 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Encuentra la propiedad ideal para ti
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm">
          <SlidersHorizontal size={16} />
          <span>Filtrar por:</span>
        </div>

        {/* Filtro operación */}
        <div className="flex gap-2">
          {["todos", "venta", "alquiler"].map((op) => (
            <button
              key={op}
              onClick={() => setFilter("operation", op)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                filters.operation === op
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        {/* Separador */}
        <div className="h-5 w-px bg-slate-200 hidden md:block" />

        {/* Filtro tipo */}
        <div className="flex gap-2 flex-wrap">
          {["todos", "casa", "departamento", "oficina"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter("type", type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                filters.type === type
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Contador resultados */}
      <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
        <Search size={14} />
        <span>
          {loading ? "Cargando..." : `${filteredProperties.length} propiedades encontradas`}
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md h-72 animate-pulse">
              <div className="bg-slate-200 h-48 rounded-t-2xl" />
              <div className="p-4 flex flex-col gap-2">
                <div className="bg-slate-200 h-4 rounded w-3/4" />
                <div className="bg-slate-200 h-3 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid de propiedades */}
      {!loading && filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {!loading && filteredProperties.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-slate-500 font-semibold">No hay propiedades con esos filtros</p>
          <p className="text-slate-400 text-sm mt-1">Intenta cambiando los filtros</p>
        </div>
      )}

    </div>
  )
}

export default Dashboard