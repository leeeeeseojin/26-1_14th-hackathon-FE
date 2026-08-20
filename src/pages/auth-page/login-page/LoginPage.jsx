import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthPage from '../../../components/auth/AuthPage'
import { clearAccessToken } from '../../../apis/authToken'
import { login, saveAccessToken } from '../authApi'

const LoginPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    clearAccessToken()
  }, [])

  const handleLogin = async ({ loginId, password }) => {
    try {
      const data = await login({ loginId, password })
      saveAccessToken(data)
      navigate('/main')
    } catch (error) {
      console.error('로그인 실패:', error)

      if (error.status === 401) {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.')
        return
      }

      alert(error.message || '로그인 중 오류가 발생했습니다.')
    }
  }

  return (
    <AuthPage type='login' onSubmit={handleLogin} onMovePage={() => navigate('/signup')} />
  )
}

export default LoginPage
