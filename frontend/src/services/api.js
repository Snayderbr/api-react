const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const detail = body.errors?.join?.('\n') || body.message || 'Ocurrió un error'
    throw new Error(detail)
  }

  return body
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) => request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
}
