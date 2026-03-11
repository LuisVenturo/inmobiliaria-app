import { create } from "zustand"

const useAuthStore = create((set) => ({
  // Estado inicial
  user: null,
  isAuthenticated: false,

  // Acción: guardar usuario cuando hace login
  login: (userData) => set({
    user: userData,
    isAuthenticated: true
  }),

  // Acción: limpiar usuario cuando hace logout
  logout: () => set({
    user: null,
    isAuthenticated: false
  }),
}))

export default useAuthStore