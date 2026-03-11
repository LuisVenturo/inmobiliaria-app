const BASE_URL = "https://f2e08b4eef4730c8.mokky.dev"

// GET - Traer todas las propiedades
export async function getProperties() {
  const response = await fetch(`${BASE_URL}/properties`)
  const data = await response.json()
  return data
}

// GET - Traer una propiedad por ID
export async function getPropertyById(id) {
  const response = await fetch(`${BASE_URL}/properties/${id}`)
  const data = await response.json()
  return data
}

// GET - Traer propiedades por operación (venta o alquiler)
export async function getPropertiesByOperation(operation) {
  const response = await fetch(`${BASE_URL}/properties?operation=${operation}`)
  const data = await response.json()
  return data
}