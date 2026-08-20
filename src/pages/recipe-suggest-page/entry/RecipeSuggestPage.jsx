import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import NutrientTag from '../../../components/recipe-edit/nutrient-tag/NutrientTag'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'
import CookingStepItem from '../../../components/recipe-edit/cooking-step-item/CookingStepItem'

import dummyHeroImage from '../../../assets/dummy/recipe-review-hero.svg'
import chevronDownGreenIcon from '../../../assets/icon/chevron-down-green.svg'
import getApiErrorMessage from '../../../apis/getApiErrorMessage'
import { getPersonalizedRecipe, getRecipeRecommendations } from '../apis/RecipeSuggestApi'
import { DUMMY_SUGGESTION } from '../apis/dummyRecipeSuggest'

import './RecipeSuggestPage.css'

function SuggestionHeroImage({ src, alt }) {
  return (
    <div className='recipe-suggest-page__hero'>
      <img src={src} alt={alt} />
    </div>
  )
}

function SuggestionSummary({ reason, title, description }) {
  return (
    <div className='recipe-suggest-page__summary'>
      <p className='recipe-suggest-page__reason'>{reason}</p>
      <h2 className='recipe-suggest-page__title'>{title}</h2>
      <p className='recipe-suggest-page__description'>{description}</p>
    </div>
  )
}

export default function RecipeSuggestPage({ onBack, onRetry }) {
  const { recipeId } = useParams()
  const navigate = useNavigate()
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [retryMessage, setRetryMessage] = useState('')

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) {
        setRecipe(null)
        setErrorMessage('레시피 정보가 없습니다.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')
      setRetryMessage('')

      try {
        const data = await getPersonalizedRecipe(recipeId)
        setRecipe(data)
      } catch (error) {
        console.error('개인화 레시피 상세 조회 실패:', error)
        setRecipe(null)
        setErrorMessage(getApiErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
  }, [recipeId])

  const handleSelect = () => {
    if (!recipeId) {
      return
    }

    navigate(`/recipe/substitute/${recipeId}`)
  }

  const handleRetry = async () => {
    if (onRetry) {
      onRetry()
      return
    }

    setRetryMessage('')

    try {
      const data = await getRecipeRecommendations()
      const nextRecipe = (data.recommendations ?? []).find(
        (item) => String(item.recipeId) !== String(recipeId),
      )

      if (!nextRecipe?.recipeId) {
        setRetryMessage('다른 추천 레시피가 없습니다.')
        return
      }

      navigate(`/recipe/suggest/${nextRecipe.recipeId}`)
    } catch (error) {
      console.error('개인화 레시피 추천 조회 실패:', error)
      setRetryMessage(getApiErrorMessage(error))
    }
  }

  const description =
    recipe?.description ||
    (recipe?.cookingTime != null ? `조리 약 ${recipe.cookingTime}분` : '')

  return (
    <main className='recipe-suggest-page'>
      <Header title='개인화 제안' onBack={onBack} />

      <div className='recipe-suggest-page__content'>
        <SuggestionHeroImage src={dummyHeroImage} alt={recipe?.title ?? ''} />

        {isLoading ? (
          <p className='recipe-suggest-page__status'>레시피를 불러오는 중입니다.</p>
        ) : null}

        {errorMessage ? <p className='recipe-suggest-page__status'>{errorMessage}</p> : null}

        {recipe && !isLoading ? (
          <div className='recipe-suggest-page__body'>
            <SuggestionSummary
              reason={DUMMY_SUGGESTION.reason}
              title={recipe.title}
              description={description}
            />

            <div className='recipe-suggest-page__nutrient-list'>
              {recipe.nutrientTags.map((item) => (
                <NutrientTag
                  key={item.id}
                  label={item.label}
                  value={item.value}
                  variant={item.variant}
                />
              ))}
            </div>

            <CommonButton className='recipe-suggest-page__gap-lg' onClick={handleSelect}>
              선택하기
            </CommonButton>

            <div className='recipe-suggest-page__notice'>
              <div className='recipe-suggest-page__notice-text'>
                <p className='recipe-suggest-page__notice-title'>맞지 않으시나요?</p>
                <p className='recipe-suggest-page__notice-description'>
                  레시피를 다시 추천받을 수 있습니다.
                </p>
              </div>
              <button type='button' className='recipe-suggest-page__retry-button' onClick={handleRetry}>
                다른 레시피 추천받기
              </button>
              {retryMessage ? (
                <p className='recipe-suggest-page__status'>{retryMessage}</p>
              ) : null}
            </div>

            <button
              type='button'
              className='recipe-suggest-page__detail-toggle recipe-suggest-page__gap-xl'
              onClick={() => setIsDetailOpen((prev) => !prev)}
            >
              {isDetailOpen ? '레시피 닫기' : '레시피 상세보기'}
              <img
                src={chevronDownGreenIcon}
                alt=''
                className={`recipe-suggest-page__detail-toggle-icon ${
                  isDetailOpen ? 'recipe-suggest-page__detail-toggle-icon--flipped' : ''
                }`}
              />
            </button>

            {isDetailOpen && (
              <>
                <section className='recipe-suggest-page__section'>
                  <h3 className='recipe-suggest-page__section-title'>재료</h3>
                  <div className='recipe-suggest-page__card'>
                    {recipe.ingredients.map((item, index) => (
                      <KeyValueRow
                        key={item.id}
                        variant='ingredient'
                        label={item.name}
                        value={item.amount}
                        badge={item.badge}
                        isLast={index === recipe.ingredients.length - 1}
                      />
                    ))}
                  </div>
                </section>

                <section className='recipe-suggest-page__section recipe-suggest-page__gap-lg'>
                  <h3 className='recipe-suggest-page__section-title'>
                    영양 정보 변화{' '}
                    <span className='recipe-suggest-page__section-sub'>(1인분 기준)</span>
                  </h3>
                  <div className='recipe-suggest-page__card'>
                    {recipe.nutritionChangeTable.map((item, index) => (
                      <KeyValueRow
                        key={item.id}
                        variant='nutrition'
                        label={item.label}
                        oldValue={item.oldValue}
                        newValue={item.newValue}
                        changeType={item.changeType}
                        isLast={index === recipe.nutritionChangeTable.length - 1}
                      />
                    ))}
                  </div>
                </section>

                <section className='recipe-suggest-page__section recipe-suggest-page__gap-lg'>
                  <h3 className='recipe-suggest-page__section-title'>조리 단계</h3>
                  <div className='recipe-suggest-page__step-card'>
                    {recipe.steps.map((step, index) => (
                      <CookingStepItem key={step.id} number={index + 1}>
                        {step.description}
                      </CookingStepItem>
                    ))}
                  </div>
                </section>

                <p className='recipe-suggest-page__disclaimer'>
                  이 영양 정보는 참고용이며 실제 수치와 다를 수 있습니다. 건강 상태에 따른 식단 결정은
                  의료진과 상담하세요.
                </p>
              </>
            )}
          </div>
        ) : null}
      </div>
    </main>
  )
}
