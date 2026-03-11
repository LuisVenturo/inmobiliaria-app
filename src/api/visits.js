const BASE_URL = "https://f2e08b4eef4730c8.mokky.dev"

// GET - Traer todas las visitas (para el admin)
export async function getVisits() {
  const response = await fetch(`${BASE_URL}/visits`)
  const data = await response.json()
  return data
}

// GET - Traer visitas de un cliente específico por email
export async function getVisitsByEmail(email) {
  const response = await fetch(`${BASE_URL}/visits?clientEmail=${email}`)
  const data = await response.json()
  return data
}

// POST - Agendar una nueva visita
export async function createVisit(visitData) {
  const response = await fetch(`${BASE_URL}/visits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(visitData)
  })
  const data = await response.json()
  return data
}
