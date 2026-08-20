import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthPage from '../../../components/auth/AuthPage'
import { clearAccessToken } from '../../../apis/authToken'

const SignupPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    clearAccessToken()
  }, [])

  const handleSignup = ({ loginId, password, nickname }) => {
    navigate('/', {
      state: {
        loginId,
        password,
        nickname,
      },
    })
  }

  return <AuthPage type='signup' onSubmit={handleSignup} />
}

export default SignupPage
