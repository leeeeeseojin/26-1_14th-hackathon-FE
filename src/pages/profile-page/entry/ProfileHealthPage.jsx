import { useEffect, useState } from 'react'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import FormField from '../../../components/form-field/FormField'
import FormCard from '../../../components/form-card/FormCard'
import Section from '../../../components/section/Section'
import NoticeBox from '../../../components/notice-box/NoticeBox'

import AllergySearch from '../components/AllergySearch'

import { VEGETARIAN_OPTIONS } from '../constants/ProfileOptions'
import { getAllergens } from '../../../apis/profileApi'
import { mapSignupProfile } from '../apis/mapSignupProfile'

import './ProfileHealthPage.css'

const ProfileHealthPage = ({
  profileForm,
  onChange,
  onBack,
  onSubmit,
}) => {
  const [allergens, setAllergens] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const data = await getAllergens()
        setAllergens(data?.items ?? [])
      } catch (error) {
        console.error('알레르기 목록 조회 실패:', error)
        alert(error.message || '알레르기 목록을 불러오지 못했습니다.')
      }
    }

    fetchAllergens()
  }, [])

  const handleSubmit = async () => {
    if (isSubmitting) {
      return
    }

    if (!profileForm.birthDate) {
      alert('생년월일을 입력해주세요.')
      return
    }

    if (!profileForm.height || !profileForm.weight) {
      alert('키와 체중을 입력해주세요.')
      return
    }

    if (!profileForm.gender) {
      alert('성별을 선택해주세요.')
      return
    }

    if (!profileForm.healthGoal?.id) {
      alert('건강 목표를 선택해주세요.')
      return
    }

    if (!profileForm.dailyCarbohydrate) {
      alert('하루 목표 탄수화물을 입력해주세요.')
      return
    }

    if (!profileForm.vegetarianType) {
      alert('채식 유형을 선택해주세요.')
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(mapSignupProfile(profileForm))
    } catch (error) {
      console.error('회원가입 실패:', error)

      if (error.status === 400) {
        alert(error.message || '필수 입력값이 누락되었거나 올바르지 않은 요청입니다.')
        return
      }

      if (error.status === 409) {
        alert(error.message || '이미 사용 중인 아이디입니다.')
        return
      }

      alert(error.message || '회원가입 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='profile-health-page'>
      <Header
        title='프로필 입력'
        onBack={onBack}
      />

      <div className='profile-health-page__content'>
        <Section title='알레르기'>
          <FormCard>
            <AllergySearch
              allergens={allergens}
              selectedAllergies={
                profileForm.allergies
              }
              onChange={(allergies) =>
                onChange(
                  'allergies',
                  allergies,
                )
              }
            />
          </FormCard>
        </Section>

        <Section title='혈당 측정기 등록'>
          <FormCard>
            <button
              type='button'
              className='profile-health-page__device-button'
              onClick={() =>
                onChange(
                  'glucoseDevice',
                  !profileForm.glucoseDevice,
                )
              }
            >
              {profileForm.glucoseDevice
                ? '기기 등록 완료'
                : '기기 등록하기'}
            </button>

            <p className='profile-health-page__description'>
              아래 정보는 혈당 영향
              분석의 참고용으로만
              사용됩니다.
            </p>
          </FormCard>
        </Section>

        <Section title='식이 제한'>
          <FormCard>
            <FormField
              label='채식 유형'
              htmlFor='vegetarian-type'
            >
              <select
                id='vegetarian-type'
                className='profile-health-page__input'
                value={
                  profileForm.vegetarianType
                }
                onChange={(event) =>
                  onChange(
                    'vegetarianType',
                    event.target.value,
                  )
                }
              >
                {VEGETARIAN_OPTIONS.map(
                  (option) => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.label}
                    </option>
                  ),
                )}
              </select>
            </FormField>

            <FormField
              label='기타 식이 제한 사항'
              htmlFor='other-diet'
            >
              <input
                id='other-diet'
                type='text'
                className='profile-health-page__input'
                placeholder='예: 저염식 유지 중'
                maxLength={500}
                value={
                  profileForm.otherDietRestriction
                }
                onChange={(event) =>
                  onChange(
                    'otherDietRestriction',
                    event.target.value,
                  )
                }
              />
            </FormField>
          </FormCard>
        </Section>

        <NoticeBox>
          모든 혈당 영향 분석 및 식사
          제안은 참고용이며 의료진 상담을
          대체하지 않습니다.
        </NoticeBox>
      </div>

      <div className='profile-health-page__bottom'>
        <CommonButton
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? '저장 중...'
            : '시작하기'}
        </CommonButton>
      </div>
    </main>
  )
}

export default ProfileHealthPage