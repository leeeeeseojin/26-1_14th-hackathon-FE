import { useNavigate } from 'react-router-dom'

import AuthPage from '../../../components/auth/AuthPage'

const SignupPage = () => {
  const navigate = useNavigate()

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
