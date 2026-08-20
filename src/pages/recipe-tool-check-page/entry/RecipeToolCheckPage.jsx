import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import RecipeSummaryCard from '../components/recipe-summary-card/RecipeSummaryCard'
import IngredientCheckItem from '../components/ingredient-check-item/IngredientCheckItem'

import heroIllustration from '../../../assets/cooking-flow/tool-check-hero.svg'
import recipeThumbnail from '../../../assets/cooking-flow/recipe-thumbnail.svg'

import { getRecipeDetail } from '../../../apis/recipe'

import './RecipeToolCheckPage.css'

export default function RecipeToolCheckPage({ onBack }) {
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [checkedIds, setCheckedIds] = useState([])

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        const data = await getRecipeDetail(recipeId)
        if (!isMounted) return
        setRecipe(data)
        setCheckedIds(data.ingredients.map((item) => item.ingredientId))
      } catch (err) {
        console.error('레시피 조회 실패:', err)
        if (isMounted) setError(err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [recipeId])

  const handleToggle = (ingredientId) => {
    setCheckedIds((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId],
    )
  }

  const handleStartCooking = () => {
    navigate(`/recipe/cooking-mode/${recipeId}`)
  }

  if (isLoading) return <p className='recipe-tool-check-page__status'>불러오는 중...</p>
  if (error || !recipe)
    return <p className='recipe-tool-check-page__status'>레시피를 불러오지 못했어요.</p>

  const { title, cookingTime, nutrition, ingredients } = recipe

  return (
    <main className='recipe-tool-check-page'>
      <Header title='레시피 재료 및 도구' onBack={onBack} />

      <div className='recipe-tool-check-page__hero'>
        <img src={heroIllustration} alt='' className='recipe-tool-check-page__hero-illustration' />
      </div>

      <div className='recipe-tool-check-page__content'>
        <RecipeSummaryCard
          thumbnail={recipeThumbnail}
          title={title}
          description={`${cookingTime}분 · ${nutrition.calories} kcal · 단백질 ${nutrition.protein}g`}
        />

        <section className='recipe-tool-check-page__section recipe-tool-check-page__section--ingredients'>
          <div className='recipe-tool-check-page__section-header'>
            <h3 className='recipe-tool-check-page__section-title'>재료</h3>
            <p className='recipe-tool-check-page__section-count'>총 {ingredients.length}개</p>
          </div>

          <div className='recipe-tool-check-page__ingredient-list'>
            {ingredients.map((item) => (
              <IngredientCheckItem
                key={item.ingredientId}
                name={item.title}
                amount={`${item.amount}g`}
                isChecked={checkedIds.includes(item.ingredientId)}
                onToggle={() => handleToggle(item.ingredientId)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className='recipe-tool-check-page__bottom'>
        <p className='recipe-tool-check-page__cta-caption'>
          조리 시작 후 단계별 안내로 이어집니다.
        </p>
        <CommonButton
          weight='bold'
          className='recipe-tool-check-page__cta-button'
          onClick={handleStartCooking}
        >
          준비 완료 · 요리 시작
        </CommonButton>
      </div>
    </main>
  )
}
