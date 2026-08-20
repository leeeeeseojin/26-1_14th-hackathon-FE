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
import getApiErrorMessage from '../../../apis/getApiErrorMessage'
import { getRecipeDetail, VISIBLE_INGREDIENT_COUNT } from '../apis/RecipeReviewApi'

import './RecipeReviewPage.css'

function RecipeHeroImage({ src, alt }) {
  return (
    <div className='recipe-review-page__hero'>
      <img src={src} alt={alt} />
    </div>
  )
}

function RecipeSummary({ title, description }) {
  return (
    <div className='recipe-review-page__summary'>
      <h2 className='recipe-review-page__title'>{title}</h2>
      <p className='recipe-review-page__description'>{description}</p>
    </div>
  )
}

export default function RecipeReviewPage({ onBack }) {
  const { recipeId } = useParams()
  const navigate = useNavigate()
  const [isIngredientExpanded, setIsIngredientExpanded] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

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

      try {
        const data = await getRecipeDetail(recipeId)
        setRecipe(data)
      } catch (error) {
        console.error('레시피 상세 조회 실패:', error)
        setRecipe(null)
        setErrorMessage(getApiErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
  }, [recipeId])

  const ingredients = recipe?.ingredients ?? []
  const visibleIngredients = isIngredientExpanded
    ? ingredients
    : ingredients.slice(0, VISIBLE_INGREDIENT_COUNT)
  const hasMoreIngredients = ingredients.length > VISIBLE_INGREDIENT_COUNT

  const handleStart = () => {
    if (!recipeId) {
      return
    }

    navigate(`/recipe/suggest/${recipeId}`)
  }

  const handleToggleIngredients = () => {
    setIsIngredientExpanded((prev) => !prev)
  }

  const description =
    recipe?.description ||
    (recipe?.cookingTime != null ? `조리 약 ${recipe.cookingTime}분` : '')

  return (
    <main className='recipe-review-page' key={recipeId ?? 'recipe-review'}>
      <Header title='레시피 검토' onBack={onBack} />

      <div className='recipe-review-page__content'>
        <RecipeHeroImage src={dummyHeroImage} alt={recipe?.title ?? ''} />

        {isLoading ? (
          <p className='recipe-review-page__status'>레시피를 불러오는 중입니다.</p>
        ) : null}

        {errorMessage ? <p className='recipe-review-page__status'>{errorMessage}</p> : null}

        {recipe && !isLoading ? (
          <div className='recipe-review-page__body'>
            <RecipeSummary title={recipe.title} description={description} />

            <div className='recipe-review-page__nutrient-list'>
              {recipe.nutrientTags.map((item) => (
                <NutrientTag
                  key={item.id}
                  label={item.label}
                  value={item.value}
                  variant={item.variant}
                />
              ))}
            </div>

            <section className='recipe-review-page__section'>
              <h3 className='recipe-review-page__section-title'>재료</h3>
              <div className='recipe-review-page__card'>
                {visibleIngredients.map((item, index) => (
                  <KeyValueRow
                    key={item.id}
                    variant='ingredient'
                    label={item.name}
                    value={item.amount}
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
                {recipe.nutritionTable.map((item, index) => (
                  <KeyValueRow
                    key={item.id}
                    variant='nutrition'
                    label={item.name}
                    value={item.amount}
                    isLast={index === recipe.nutritionTable.length - 1}
                  />
                ))}
              </div>
            </section>

            <section className='recipe-review-page__section recipe-review-page__section--gap-lg'>
              <h3 className='recipe-review-page__section-title'>조리 단계</h3>
              <div className='recipe-review-page__step-card'>
                {recipe.steps.map((step, index) => (
                  <CookingStepItem key={step.id} number={index + 1}>
                    {step.description}
                  </CookingStepItem>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </div>

      <div className='recipe-review-page__bottom'>
        <CommonButton onClick={handleStart} disabled={!recipe}>
          시작하기
        </CommonButton>
      </div>
    </main>
  )
}
