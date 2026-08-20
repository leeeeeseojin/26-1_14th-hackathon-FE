const ACCESS_TOKEN_KEY = 'accessToken'

const PUBLIC_PATHS = [
  { method: 'POST', pattern: /^\/api\/auth\/signup$/ },
  { method: 'POST', pattern: /^\/api\/auth\/login$/ },
  { method: 'GET', pattern: /^\/api\/allergens(\?|$)/ },
]

const getRequestPath = (url = '') => {
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const parsed = new URL(url)
      return `${parsed.pathname}${parsed.search}`
    }
  } catch {
    // fall through and treat as a relative path
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? ''
  const relativeUrl = baseUrl && url.startsWith(baseUrl) ? url.slice(baseUrl.length) : url

  return relativeUrl.startsWith('/') ? relativeUrl : `/${relativeUrl}`
}

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

export const setAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export const isPublicRequest = (method, url) => {
  const normalizedMethod = (method ?? 'GET').toUpperCase()
  const path = getRequestPath(url)
  const pathname = path.split('?')[0]

  if (pathname === '/api/auth' || pathname.startsWith('/api/auth/')) {
    return true
  }

  return PUBLIC_PATHS.some((item) => item.method === normalizedMethod && item.pattern.test(path))
}
