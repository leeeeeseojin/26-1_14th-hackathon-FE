import { useState } from 'react'

import CommonButton from '../common-button/CommonButton'
import Logo from '../../assets/icon/logo.svg'
import Login from '../../assets/icon/login.svg'

import './AuthPage.css'

const LOGIN_ID_MIN_LENGTH = 4
const LOGIN_ID_MAX_LENGTH = 100
const NICKNAME_MAX_LENGTH = 50
const PASSWORD_PATTERN = /^\d{4}$/

const AuthPage = ({ type = 'login', onSubmit, onMovePage }) => {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  const isLogin = type === 'login'

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedLoginId = loginId.trim()
    const trimmedNickname = nickname.trim()

    if (!trimmedLoginId) {
      alert('아이디를 입력해주세요.')
      return
    }

    if (trimmedLoginId.length < LOGIN_ID_MIN_LENGTH || trimmedLoginId.length > LOGIN_ID_MAX_LENGTH) {
      alert('아이디는 4자 이상 100자 이하여야 합니다.')
      return
    }

    if (!PASSWORD_PATTERN.test(password)) {
      alert('비밀번호는 4자리 숫자여야 합니다.')
      return
    }

    if (!isLogin && !trimmedNickname) {
      alert('닉네임을 입력해주세요.')
      return
    }

    if (!isLogin && trimmedNickname.length > NICKNAME_MAX_LENGTH) {
      alert('닉네임은 50자 이하여야 합니다.')
      return
    }

    onSubmit?.({
      loginId: trimmedLoginId,
      password,
      nickname: isLogin ? undefined : trimmedNickname,
    })
  }

  return (
    <div className='auth-page'>
      <div className='auth-page__container'>
        <section className='auth-page__logo-section'>
          <div className='auth-page__logo-group'>
            <img src={Login} alt='' className='auth-page__open-logo' />
            <img src={Logo} alt='MODI' className='auth-page__logo' />
          </div>

          <p className='auth-page__description'>먹고 싶은 음식을, 나에게 맞게, Modify.</p>
        </section>

        <form className='auth-page__form' onSubmit={handleSubmit}>
          <div className='auth-page__input-group'>
            <label htmlFor='loginId' className='auth-page__label'>
              아이디
            </label>
            <input
              id='loginId'
              type='text'
              autoComplete='username'
              maxLength={LOGIN_ID_MAX_LENGTH}
              value={loginId}
              onChange={(event) => setLoginId(event.target.value)}
              placeholder='아이디를 입력해 주세요'
              className='auth-page__input'
            />
          </div>

          <div className='auth-page__input-group'>
            <label htmlFor='password' className='auth-page__label'>
              비밀번호
            </label>
            <input
              id='password'
              type='password'
              inputMode='numeric'
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              maxLength={4}
              value={password}
              onChange={(event) => setPassword(event.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder='4자리 숫자'
              className='auth-page__input'
            />
          </div>

          {isLogin ? null : (
            <div className='auth-page__input-group'>
              <label htmlFor='nickname' className='auth-page__label'>
                닉네임
              </label>
              <input
                id='nickname'
                type='text'
                autoComplete='nickname'
                maxLength={NICKNAME_MAX_LENGTH}
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder='닉네임을 입력해 주세요'
                className='auth-page__input'
              />
            </div>
          )}

          <div className='auth-page__buttons'>
            <CommonButton type='submit'>{isLogin ? '로그인' : '회원가입'}</CommonButton>

            {isLogin ? (
              <CommonButton type='button' variant='outline' onClick={onMovePage}>
                회원가입
              </CommonButton>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
