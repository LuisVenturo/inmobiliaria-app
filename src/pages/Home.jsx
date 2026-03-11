import { Link } from "react-router-dom"
import { Search, Shield, Calendar, MapPin } from "lucide-react"
import useAuthStore from "../store/useAuthStore"

const features = [
  {
    icon: <Search size={24} className="text-amber-500" />,
    title: "Explora propiedades",
    desc: "Encuentra casas, departamentos y oficinas en venta o alquiler"
  },
  {
    icon: <Calendar size={24} className="text-amber-500" />,
    title: "Agenda visitas",
    desc: "Programa visitas directamente desde la plataforma en minutos"
  },
  {
    icon: <Shield size={24} className="text-amber-500" />,
    title: "100% seguro",
    desc: "Tus datos y transacciones protegidos en todo momento"
  },
  {
    icon: <MapPin size={24} className="text-amber-500" />,
    title: "Mejores ubicaciones",
    desc: "Propiedades en los distritos más exclusivos de Lima"
  },
]

const Home = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Portal Inmobiliario
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4 leading-tight">
            Encuentra tu propiedad <span className="text-amber-400">ideal</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Explora cientos de propiedades en venta y alquiler. Agenda visitas fácilmente y encuentra el hogar de tus sueños.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                Ver propiedades
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition"
                >
                  Comenzar ahora
                </Link>
                <Link
                  to="/login"
                  className="border border-white hover:bg-white hover:text-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition"
                >
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">
            ¿Por qué elegir <span className="text-amber-500">InmoApp</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-slate-50 hover:shadow-md transition">
                <div className="bg-amber-50 p-3 rounded-xl">{f.icon}</div>
                <h3 className="font-bold text-slate-800">{f.title}</h3>
                <p className="text-slate-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-amber-500">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            ¿Listo para encontrar tu propiedad?
          </h2>
          <p className="text-amber-100 mb-6">
            Regístrate gratis y accede a todas las propiedades disponibles
          </p>
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="bg-white text-amber-600 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition"
          >
            {isAuthenticated ? "Ver propiedades" : "Empezar gratis"}
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home