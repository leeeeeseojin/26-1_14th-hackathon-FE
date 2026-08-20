import {
  clearAccessToken,
  getAccessToken,
  isPublicRequest,
} from './authToken'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message)
    this.status = status
    this.code = code
  }
}

export async function apiRequest(path, { method = 'GET', body, params } = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value)
      }
    })
  }

  const headers = {
    'Content-Type': 'application/json',
  }

  if (!isPublicRequest(method, path)) {
    const token = getAccessToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    if (response.status === 401 && !isPublicRequest(method, path)) {
      clearAccessToken()
    }

    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      response.status,
      errorData.code,
      errorData.message || '요청 처리 중 오류가 발생했습니다.',
    )
  }

  if (response.status === 204) return null

  return response.json()
}
