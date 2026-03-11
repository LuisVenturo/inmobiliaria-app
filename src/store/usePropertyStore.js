import { create } from "zustand"

const usePropertyStore = create((set) => ({
  // Estado inicial
  properties: [],
  filteredProperties: [],
  filters: {
    operation: "todos",  // "todos", "venta", "alquiler"
    type: "todos",       // "todos", "casa", "departamento", "oficina"
  },
  loading: false,

  // guardar propiedades traídas de la API
  setProperties: (properties) => set({
    properties,
    filteredProperties: properties  // al inicio muestra todas
  }),

  // actualizar filtros y filtrar la lista
  setFilter: (key, value) => set((state) => {
    const newFilters = { ...state.filters, [key]: value }

    const filtered = state.properties.filter((property) => {
      const matchOperation = newFilters.operation === "todos" || property.operation === newFilters.operation
      const matchType = newFilters.type === "todos" || property.type === newFilters.type
      return matchOperation && matchType
    })

    return {
      filters: newFilters,
      filteredProperties: filtered
    }
  }),

  // controlar el loading
  setLoading: (loading) => set({ loading }),
}))

export default usePropertyStore