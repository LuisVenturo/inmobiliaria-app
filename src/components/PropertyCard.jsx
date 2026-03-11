import { Link } from "react-router-dom"
import { MapPin, Bed, Bath, Maximize, Tag } from "lucide-react"

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">

      {/* Imagen */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.src = "https://placehold.co/400x200?text=Sin+imagen" }}
        />
        {/* Badge operación */}
        <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white ${
          property.operation === "venta" ? "bg-blue-600" : "bg-green-600"
        }`}>
          {property.operation === "venta" ? "En Venta" : "En Alquiler"}
        </span>
        {/* Badge tipo */}
        <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-white capitalize">
          {property.type}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-slate-800 text-base leading-tight mb-1 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-slate-600 text-xs mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed size={13} />
              <span>{property.bedrooms} hab.</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Bath size={13} />
            <span>{property.bathrooms} baños</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={13} />
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Precio</p>
            <p className="text-lg font-bold text-amber-600">
              ${property.price.toLocaleString()}
              {property.operation === "alquiler" && <span className="text-xs font-normal text-slate-400">/mes</span>}
            </p>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1 transition"
          >
            <Tag size={13} /> Ver más
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard