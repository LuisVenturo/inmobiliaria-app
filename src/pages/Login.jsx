import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Swal from "sweetalert2"
import { login } from "../api/auth"
import useAuthStore from "../store/useAuthStore"
import logoInmobiliaria from "../assets/logo-inmobiliaria-2-rv.png"

const Login = () => {
    const navigate = useNavigate()
    const setUser = useAuthStore((state) => state.login)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    // Maneja cambios en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,           // copia los valores actuales
            [e.target.name]: e.target.value  // actualiza solo el campo que cambió
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()  // evita que el form recargue la página

        // Validación básica
        if (!formData.email || !formData.password) {
            Swal.fire({
                icon: "warning",
                title: "Campos vacíos",
                text: "Por favor completa todos los campos",
                confirmButtonColor: "#f59e0b"
            })
            return
        }

        try {
            setLoading(true)
            const result = await login(formData.email, formData.password)

            if (result.success) {
                // Guardar usuario en Zustand
                setUser(result.user)

                // Alerta de bienvenida
                await Swal.fire({
                    icon: "success",
                    title: `¡Bienvenido, ${result.user.name}!`,
                    text: result.user.role === "admin" ? "Accediendo al panel admin..." : "Explorando propiedades...",
                    timer: 1500,
                    showConfirmButton: false,
                    confirmButtonColor: "#f59e0b"
                })

                // Redirigir según rol
                if (result.user.role === "admin") {
                    navigate("/panel-admin")
                } else {
                    navigate("/dashboard")
                }

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Credenciales incorrectas",
                    text: "Email o contraseña incorrectos",
                    confirmButtonColor: "#f59e0b"
                })
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar con el servidor",
                confirmButtonColor: "#f59e0b"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex justify-center w-full mb-4">
                        <img
                            src={logoInmobiliaria}
                            alt="Venturo Inmobiliaria"
                            className="h-16 w-auto object-contain" 
                        />
                    </div>
                    <p className="text-slate-500 text-sm mt-1">Inicia sesión para continuar</p>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">
                            Correo electrónico
                        </label>
                        <div className="flex items-center border border-slate-300 rounded-lg px-3 gap-2 focus-within:border-amber-500 transition">
                            <Mail size={16} className="text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full py-2.5 text-sm outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">
                            Contraseña
                        </label>
                        <div className="flex items-center border border-slate-300 rounded-lg px-3 gap-2 focus-within:border-amber-500 transition">
                            <Lock size={16} className="text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full py-2.5 text-sm outline-none bg-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition mt-2"
                    >
                        {loading ? (
                            <span className="animate-spin">⏳</span>
                        ) : (
                            <>
                                <LogIn size={18} /> Ingresar
                            </>
                        )}
                    </button>
                </form>

                {/* Credenciales de prueba */}
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                    <p className="font-semibold text-slate-600 mb-2">🔑 Credenciales de prueba:</p>
                    <p><span className="font-medium">Admin:</span> admin@inmobiliaria.com / admin123</p>
                    <p><span className="font-medium">Cliente:</span> juan@email.com / juan123</p>
                </div>

            </div>
        </div>
    )
}

export default Login