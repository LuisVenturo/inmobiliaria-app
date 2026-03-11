import { create } from "zustand"

const useVisitStore = create((set) => ({
  // Estado inicial
  visits: [],           // todas las visitas (admin)
  myVisits: [],         // visitas del cliente logueado

  // guardar todas las visitas (admin)
  setVisits: (visits) => set({ visits }),

  // guardar visitas del cliente
  setMyVisits: (visits) => set({ myVisits: visits }),

  // agregar una visita nueva al estado local
  // (para no tener que volver a llamar la API después del POST)
  addVisit: (visit) => set((state) => ({
    myVisits: [...state.myVisits, visit]
  })),
}))

export default useVisitStore