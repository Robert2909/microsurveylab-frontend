// URL base del backend.
// Se deja en un solo lugar para no estarlo repitiendo en cada fetch.
const BASE_URL = "https://microsurveylab-backend-production.up.railway.app/api";

// Obtiene todas las encuestas para mostrarlas en la lista principal.
export async function obtenerEncuestas() {
  try {
    const res = await fetch(`${BASE_URL}/encuestas`);

    if (!res.ok) {
      const text = await res.text();
      console.error('Error HTTP al obtener encuestas:', res.status, text);
      throw new Error(`Error al obtener encuestas (HTTP ${res.status})`);
    }

    return await res.json();
  } catch (err) {
    console.error('Fallo de red al obtener encuestas:', err);
    throw err;
  }
}

// Crea una encuesta nueva.
// payload: { pregunta, descripcion, opciones[] }
export async function crearEncuesta(payload) {
  const res = await fetch(`${BASE_URL}/encuestas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const texto = await res.text();
    throw new Error(texto || 'Error al crear encuesta');
  }

  return res.json();
}

// Registra un voto sobre una encuesta.
// Se manda el opcionId y el encuestaId va en la URL.
export async function registrarVoto(encuestaId, opcionId) {
  const res = await fetch(`${BASE_URL}/encuestas/${encuestaId}/votos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ opcionId })
  });

  if (!res.ok) {
    const texto = await res.text();
    throw new Error(texto || 'Error al registrar voto');
  }
}

// Obtiene el conteo/porcentaje por opción para pintar resultados.
export async function obtenerResultados(encuestaId) {
  const res = await fetch(`${BASE_URL}/encuestas/${encuestaId}/resultados`);
  if (!res.ok) throw new Error('Error al obtener resultados');
  return res.json();
}

// Actualiza datos básicos de una encuesta (pregunta/descripcion/activa).
export async function actualizarEncuesta(id, payload) {
  const res = await fetch(`${BASE_URL}/encuestas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error('Error al actualizar la encuesta.');
  }

  return await res.json();
}

// Elimina una encuesta por id.
export async function eliminarEncuesta(id) {
  const res = await fetch(`${BASE_URL}/encuestas/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error('Error al eliminar la encuesta.');
  }
}
