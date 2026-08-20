import { apiRequest } from '../../apis/client'

export const login = async ({ loginId, password }) => {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: {
      loginId,
      password,
    },
  })
}

export const signup = async ({ loginId, password, nickname, profile }) => {
  return apiRequest('/api/auth/signup', {
    method: 'POST',
    body: {
      loginId,
      password,
      nickname,
      profile,
    },
  })
}

export const saveAccessToken = (data) => {
  const accessToken = data?.accessToken

  if (!accessToken) {
    throw new Error('Access Token이 응답에 없습니다.')
  }

  localStorage.setItem('accessToken', accessToken)
}
