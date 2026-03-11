const BASE_URL = "https://f2e08b4eef4730c8.mokky.dev"

// POST simulado - mokky no tiene auth real, buscamos por email y password
export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`)
  const data = await response.json()

  // Si encontró un usuario que coincide, devuelve el primero
  if (data.length > 0) {
    return { success: true, user: data[0] }
  }

  return { success: false, user: null }
}

// GET - Traer todos los usuarios (para el admin)
export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`)
  const data = await response.json()
  return data
}