import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import NutrientTag from '../../../components/recipe-edit/nutrient-tag/NutrientTag'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'
import CookingStepItem from '../../../components/recipe-edit/cooking-step-item/CookingStepItem'

import dummyHeroImage from '../../../assets/dummy/recipe-review-hero.svg'
import chevronDownGreenIcon from '../../../assets/icon/chevron-down-green.svg'

import { generatePersonalizedRecipe } from '../../../apis/recipe'

import './RecipeSuggestPage.css'

export default function RecipeSuggestPage({ onBack }) {
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // 재시도(다른 레시피 추천받기)  — 값이 바뀌면 effect 재실행
  const [retryKey, setRetryKey] = useState(0)
  const previousCandidateIdRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        const data = await generatePersonalizedRecipe(recipeId, previousCandidateIdRef.current)
        if (!isMounted) return
        setRecipe(data)
        setError(null)
      } catch (err) {
        console.error('개인화 레시피 조회 실패:', err)
        if (isMounted) setError(err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [recipeId, retryKey])

  const handleSelect = () => {
    navigate(`/recipe/substitute/${recipe.candidateRecipeId}`)
  }

  const handleRetry = () => {
    previousCandidateIdRef.current = recipe?.candidateRecipeId ?? null
    setIsLoading(true)
    setRetryKey((prev) => prev + 1)
  }

  if (isLoading) return <p className='recipe-suggest-page__status'>불러오는 중...</p>
  if (error || !recipe)
    return <p className='recipe-suggest-page__status'>레시피를 불러오지 못했어요.</p>

  const { label, title, description, personalizedNutrition, ingredients, steps } = recipe

  return (
    <main className='recipe-suggest-page'>
      <Header title='개인화 제안' onBack={onBack} />

      <div className='recipe-suggest-page__content'>
        <div className='recipe-suggest-page__hero'>
          <img src={dummyHeroImage} alt={title} />
        </div>

        <div className='recipe-suggest-page__body'>
          <div className='recipe-suggest-page__summary'>
            <p className='recipe-suggest-page__reason'>{label}</p>
            <h2 className='recipe-suggest-page__title'>{title}</h2>
            <p className='recipe-suggest-page__description'>{description}</p>
          </div>

          <div className='recipe-suggest-page__nutrient-list'>
            <NutrientTag
              label='칼로리'
              value={`${personalizedNutrition.calories}kcal`}
              variant='calorie'
            />
            <NutrientTag label='탄수화물' value={`${personalizedNutrition.carb}g`} variant='carb' />
            <NutrientTag
              label='단백질'
              value={`${personalizedNutrition.protein}g`}
              variant='neutral'
            />
            <NutrientTag label='당류' value={`${personalizedNutrition.sugar}g`} variant='neutral' />
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
            <button
              type='button'
              className='recipe-suggest-page__retry-button'
              onClick={handleRetry}
            >
              다른 레시피 추천받기
            </button>
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
                  {ingredients.map((item, index) => (
                    <KeyValueRow
                      key={item.ingredientId}
                      variant='ingredient'
                      label={item.title}
                      value={`${item.amount}g`}
                      badge={item.changed ? '수정됨' : undefined}
                      isLast={index === ingredients.length - 1}
                    />
                  ))}
                </div>
              </section>

              <section className='recipe-suggest-page__section recipe-suggest-page__gap-lg'>
                <h3 className='recipe-suggest-page__section-title'>조리 단계</h3>
                <div className='recipe-suggest-page__step-card'>
                  {steps.map((step) => (
                    <CookingStepItem key={step.stepOrder} number={step.stepOrder}>
                      {step.description}
                    </CookingStepItem>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
