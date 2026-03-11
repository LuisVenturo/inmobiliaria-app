import { Link, useNavigate } from "react-router-dom"
import { Home, LayoutDashboard, Calendar, ShieldCheck, LogOut, LogIn, Menu, X } from "lucide-react"
import { useState } from "react"
import useAuthStore from "../store/useAuthStore"
import logoInmobiliaria from "../assets/logo-inmobiliaria-2-rv.png"

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuthStore((state) => state)
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <nav className="bg-slate-900 text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-amber-400 tracking-wide">
                    <img
                        src={logoInmobiliaria}
                        alt="Venturo Inmobiliaria"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-1 hover:text-amber-400 transition">
                        <Home size={16} /> Inicio
                    </Link>

                    {isAuthenticated && (
                        <Link to="/dashboard" className="flex items-center gap-1 hover:text-amber-400 transition">
                            <LayoutDashboard size={16} /> Propiedades
                        </Link>
                    )}

                    {isAuthenticated && user?.role === "client" && (
                        <Link to="/my-visits" className="flex items-center gap-1 hover:text-amber-400 transition">
                            <Calendar size={16} /> Mis Visitas
                        </Link>
                    )}

                    {isAuthenticated && user?.role === "admin" && (
                        <Link to="/panel-admin" className="flex items-center gap-1 hover:text-amber-400 transition">
                            <ShieldCheck size={16} /> Panel Admin
                        </Link>
                    )}
                </div>

                {/* Auth button desktop */}
                <div className="hidden md:flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-300">
                                Hola, <span className="text-amber-400 font-semibold">{user?.name}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-sm transition"
                            >
                                <LogOut size={15} /> Salir
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded-lg text-sm font-semibold transition"
                        >
                            <LogIn size={15} /> Ingresar
                        </Link>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-slate-800 px-4 py-3 flex flex-col gap-3 text-sm">
                    <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-amber-400">
                        <Home size={15} /> Inicio
                    </Link>
                    {isAuthenticated && (
                        <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-amber-400">
                            <LayoutDashboard size={15} /> Propiedades
                        </Link>
                    )}
                    {isAuthenticated && user?.role === "client" && (
                        <Link to="/my-visits" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-amber-400">
                            <Calendar size={15} /> Mis Visitas
                        </Link>
                    )}
                    {isAuthenticated && user?.role === "admin" && (
                        <Link to="/panel-admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-amber-400">
                            <ShieldCheck size={15} /> Panel Admin
                        </Link>
                    )}
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
                            <LogOut size={15} /> Cerrar sesión
                        </button>
                    ) : (
                        <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-amber-400">
                            <LogIn size={15} /> Ingresar
                        </Link>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar