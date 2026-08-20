import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import NutrientTag from '../../../components/recipe-edit/nutrient-tag/NutrientTag'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'
import NoticeBanner from '../../../components/recipe-edit/notice-banner/NoticeBanner'
import CookingStepItem from '../../../components/recipe-edit/cooking-step-item/CookingStepItem'

import dummyHeroImage from '../../../assets/dummy/recipe-review-hero.svg'
import chevronDownIcon from '../../../assets/icon/chevron-down.svg'

import { getRecipeDetail } from '../../../apis/recipe'

import './RecipeReviewPage.css'

const VISIBLE_INGREDIENT_COUNT = 3

export default function RecipeReviewPage({ onBack }) {
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isIngredientExpanded, setIsIngredientExpanded] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchRecipe = async () => {
      try {
        setIsLoading(true)
        const data = await getRecipeDetail(recipeId)
        if (isMounted) setRecipe(data)
      } catch (err) {
        if (isMounted) setError(err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchRecipe()
    return () => {
      isMounted = false
    }
  }, [recipeId])

  const handleStart = () => {
    navigate(`/recipe/suggest/${recipeId}`)
  }

  const handleToggleIngredients = () => {
    setIsIngredientExpanded((prev) => !prev)
  }

  if (isLoading) return <p className='recipe-review-page__status'>불러오는 중...</p>
  if (error || !recipe)
    return <p className='recipe-review-page__status'>레시피를 불러오지 못했어요.</p>

  const { title, description, cookingTime, nutrition, ingredients, steps } = recipe

  const visibleIngredients = isIngredientExpanded
    ? ingredients
    : ingredients.slice(0, VISIBLE_INGREDIENT_COUNT)
  const hasMoreIngredients = ingredients.length > VISIBLE_INGREDIENT_COUNT

  return (
    <main className='recipe-review-page'>
      <Header title='레시피 검토' onBack={onBack} />

      <div className='recipe-review-page__content'>
        <div className='recipe-review-page__hero'>
          <img src={dummyHeroImage} alt={title} />
        </div>

        <div className='recipe-review-page__body'>
          <div className='recipe-review-page__summary'>
            <h2 className='recipe-review-page__title'>{title}</h2>
            <p className='recipe-review-page__description'>
              조리 약 {cookingTime}분 · {description}
            </p>
          </div>

          <div className='recipe-review-page__nutrient-list'>
            <NutrientTag label='칼로리' value={`${nutrition.calories}kcal`} variant='calorie' />
            <NutrientTag label='탄수화물' value={`${nutrition.carb}g`} variant='carb' />
            <NutrientTag label='단백질' value={`${nutrition.protein}g`} variant='neutral' />
            <NutrientTag label='당류' value={`${nutrition.sugar}g`} variant='neutral' />
          </div>

          <section className='recipe-review-page__section'>
            <h3 className='recipe-review-page__section-title'>재료</h3>
            <div className='recipe-review-page__card'>
              {visibleIngredients.map((item, index) => (
                <KeyValueRow
                  key={item.ingredientId}
                  variant='ingredient'
                  label={item.title}
                  value={`${item.amount}g`}
                  isLast={index === visibleIngredients.length - 1}
                />
              ))}
              {hasMoreIngredients && (
                <button
                  type='button'
                  className='recipe-review-page__more-button'
                  onClick={handleToggleIngredients}
                >
                  {isIngredientExpanded ? '접기' : '더보기'}
                  <img
                    src={chevronDownIcon}
                    alt=''
                    className={`recipe-review-page__more-icon ${
                      isIngredientExpanded ? 'recipe-review-page__more-icon--flipped' : ''
                    }`}
                  />
                </button>
              )}
            </div>
          </section>

          <NoticeBanner level='medium' />

          <section className='recipe-review-page__section recipe-review-page__section--gap-lg'>
            <h3 className='recipe-review-page__section-title'>
              영양 정보 <span className='recipe-review-page__section-sub'>(1인분 기준)</span>
            </h3>
            <div className='recipe-review-page__card'>
              <KeyValueRow variant='nutrition' label='열량' value={`${nutrition.calories} kcal`} />
              <KeyValueRow variant='nutrition' label='탄수화물' value={`${nutrition.carb} g`} />
              <KeyValueRow variant='nutrition' label='당류' value={`${nutrition.sugar} g`} />
              <KeyValueRow variant='nutrition' label='단백질' value={`${nutrition.protein} g`} />
              <KeyValueRow variant='nutrition' label='지방' value={`${nutrition.fat} g`} />
              <KeyValueRow
                variant='nutrition'
                label='나트륨'
                value={`${nutrition.sodium} mg`}
                isLast
              />
            </div>
          </section>

          <section className='recipe-review-page__section recipe-review-page__section--gap-lg'>
            <h3 className='recipe-review-page__section-title'>조리 단계</h3>
            <div className='recipe-review-page__step-card'>
              {steps.map((step) => (
                <CookingStepItem key={step.stepOrder} number={step.stepOrder}>
                  {step.description}
                </CookingStepItem>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className='recipe-review-page__bottom'>
        <CommonButton onClick={handleStart}>시작하기</CommonButton>
      </div>
    </main>
  )
}
