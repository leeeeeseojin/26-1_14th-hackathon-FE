import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import ProfileBasicPage from './ProfileBasicPage'
import ProfileHealthPage from './ProfileHealthPage'
import { login, saveAccessToken, signup } from '../../auth-page/authApi'
import useProfileForm from '../hooks/useProfileForm'

const ProfilePage = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const signupAccount = location.state

  const { profileForm, handleChange } = useProfileForm()

  useEffect(() => {
    if (!signupAccount?.loginId || !signupAccount?.password || !signupAccount?.nickname) {
      navigate('/signup', { replace: true })
    }
  }, [navigate, signupAccount])

  const handleNext = () => {
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
      window.scrollTo(0, 0)
      return
    }

    navigate('/signup')
  }

  const handleSubmit = async (profile) => {
    const data = await signup({
      loginId: signupAccount.loginId,
      password: signupAccount.password,
      nickname: signupAccount.nickname,
      profile,
    })

    if (data?.accessToken) {
      saveAccessToken(data)
    } else {
      const tokenData = await login({
        loginId: signupAccount.loginId,
        password: signupAccount.password,
      })
      saveAccessToken(tokenData)
    }

    navigate('/main')
  }

  if (!signupAccount?.loginId || !signupAccount?.password || !signupAccount?.nickname) {
    return null
  }

  if (step === 1) {
    return (
      <ProfileBasicPage
        profileForm={profileForm}
        onChange={handleChange}
        onNext={handleNext}
        onBack={handleBack}
      />
    )
  }

  return (
    <ProfileHealthPage
      profileForm={profileForm}
      onChange={handleChange}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  )
}

export default ProfilePage
