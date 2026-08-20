import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import FormField from '../../../components/form-field/FormField'
import FormCard from '../../../components/form-card/FormCard'
import Section from '../../../components/section/Section'
import NoticeBox from '../../../components/notice-box/NoticeBox'

import AllergySearch from '../components/AllergySearch'

import { VEGETARIAN_OPTIONS } from '../constants/ProfileOptions'

import {
  getAllergens,
  createOnboarding,
} from '../../../apis/profileApi'

import './ProfileHealthPage.css'

const ProfileHealthPage = ({
  profileForm,
  onChange,
  onBack,
  onSubmit,
}) => {
  const navigate = useNavigate()

  const [allergens, setAllergens] = useState([])
  const [isSubmitting, setIsSubmitting] =
    useState(false)

  /*
   * 인증이 필요한 상태에서 401이 발생했을 때
   * 토큰 삭제 후 로그인 페이지로 이동
   */
  const handleUnauthorized = () => {
    alert(
      '로그인이 필요합니다. 다시 로그인해주세요.',
    )

    localStorage.removeItem('accessToken')

    navigate('/login', {
      replace: true,
    })
  }

  /*
   * 알레르기 목록 조회
   */
  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const data = await getAllergens()

        setAllergens(data?.items ?? [])
      } catch (error) {
        console.error(
          '알레르기 목록 조회 실패:',
          error,
        )

        if (error.status === 401) {
          handleUnauthorized()
          return
        }

        alert(
          error.message ||
            '알레르기 목록을 불러오지 못했습니다.',
        )
      }
    }

    fetchAllergens()
  }, [])

  /*
   * 선택한 알레르기를 API에서 요구하는 id 배열로 변환
   */
  const getAllergenIds = () => {
    if (
      !Array.isArray(profileForm.allergies)
    ) {
      return []
    }

    return profileForm.allergies
      .map((allergy) => {
        if (
          typeof allergy === 'number'
        ) {
          return allergy
        }

        return (
          allergy.allergen_id ??
          allergy.id
        )
      })
      .filter(
        (allergenId) =>
          allergenId !== undefined &&
          allergenId !== null,
      )
  }

  /*
   * 프로필 저장
   */
  const handleSubmit = async () => {
    if (isSubmitting) {
      return
    }

    /*
     * 입력값 검사
     */
    if (!profileForm.birthDate) {
      alert(
        '생년월일을 입력해주세요.',
      )
      return
    }

    if (
      !profileForm.height ||
      !profileForm.weight
    ) {
      alert(
        '키와 체중을 입력해주세요.',
      )
      return
    }

    if (!profileForm.gender) {
      alert(
        '성별을 선택해주세요.',
      )
      return
    }

    if (
      !profileForm.dailyCarbohydrate
    ) {
      alert(
        '하루 목표 탄수화물을 입력해주세요.',
      )
      return
    }

    /*
     * API 요청 데이터
     */
    const requestData = {
      profile: {
        birth_date:
          profileForm.birthDate,

        height_cm: Number(
          profileForm.height,
        ),

        weight_kg: Number(
          profileForm.weight,
        ),

        gender:
          profileForm.gender,

        vegetarian_type:
          profileForm.vegetarianType ||
          'NONE',

        other_restrictions:
          profileForm.otherDietRestriction ||
          '',
      },

      goal: {
        goal_type:
          profileForm.healthGoal?.id ||
          'CARB',

        daily_carb_target_g: Number(
          profileForm.dailyCarbohydrate,
        ),
      },

      allergen_ids:
        getAllergenIds(),

      glucose_device: {
        is_linked: Boolean(
          profileForm.glucoseDevice,
        ),
      },
    }

    console.log(
      '온보딩 요청 데이터:',
      requestData,
    )

    try {
      setIsSubmitting(true)

      const data =
        await createOnboarding(
          requestData,
        )

      console.log(
        '프로필 저장 성공:',
        data,
      )

      /*
       * 부모 컴포넌트에 저장 성공 전달
       */
      if (onSubmit) {
        onSubmit(data)
      }
    } catch (error) {
      console.error(
        '프로필 저장 실패:',
        error,
      )

      /*
       * 네 client.js의 ApiError는
       * error.status / error.message 사용
       */
      const status = error.status
      const message =
        error.message

      if (status === 400) {
        alert(
          message ||
            '필수 입력값이 누락되었거나 올바르지 않은 요청입니다.',
        )
        return
      }

      if (status === 401) {
        handleUnauthorized()
        return
      }

      if (status === 409) {
        alert(
          message ||
            '이미 프로필 설정이 완료된 사용자입니다.',
        )
        return
      }

      alert(
        message ||
          '프로필 저장 중 오류가 발생했습니다.',
      )
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