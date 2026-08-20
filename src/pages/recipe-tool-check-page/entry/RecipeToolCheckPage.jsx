import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import RecipeSummaryCard from '../components/recipe-summary-card/RecipeSummaryCard'
import ToolChip from '../components/tool-chip/ToolChip'
import IngredientCheckItem from '../components/ingredient-check-item/IngredientCheckItem'

import heroIllustration from '../../../assets/cooking-flow/tool-check-hero.svg'
import recipeThumbnail from '../../../assets/cooking-flow/recipe-thumbnail.svg'

import getApiErrorMessage from '../../../apis/getApiErrorMessage'
import { getToolCheckRecipe } from '../apis/RecipeToolCheckApi'
import { DUMMY_RECIPE_SUMMARY, DUMMY_TOOLS } from '../apis/dummyRecipeToolCheck'

import './RecipeToolCheckPage.css'

export default function RecipeToolCheckPage({ onBack }) {
  const { recipeId } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) {
        setRecipe(null)
        setIngredients([])
        setErrorMessage('레시피 정보가 없습니다.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await getToolCheckRecipe(recipeId)
        setRecipe(data)
        setIngredients(data.checklist)
      } catch (error) {
        console.error('레시피 상세 조회 실패:', error)
        setRecipe(null)
        setIngredients([])
        setErrorMessage(getApiErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
  }, [recipeId])

  const handleToggle = (id) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item)),
    )
  }

  const handleStartCooking = () => {
    if (!recipeId) {
      return
    }

    navigate(`/recipe/cooking-mode/${recipeId}`)
  }

  return (
    <main className='recipe-tool-check-page'>
      <Header title='레시피 재료 및 도구' onBack={onBack} />

      <div className='recipe-tool-check-page__hero'>
        <img src={heroIllustration} alt='' className='recipe-tool-check-page__hero-illustration' />
      </div>

      <div className='recipe-tool-check-page__content'>
        {isLoading ? (
          <p className='recipe-tool-check-page__status'>레시피를 불러오는 중입니다.</p>
        ) : null}

        {errorMessage ? <p className='recipe-tool-check-page__status'>{errorMessage}</p> : null}

        {recipe && !isLoading ? (
          <>
            <RecipeSummaryCard
              thumbnail={recipeThumbnail}
              title={recipe.title}
              description={recipe.summaryDescription}
              tags={DUMMY_RECIPE_SUMMARY.tags}
            />

            <section className='recipe-tool-check-page__section'>
              <div className='recipe-tool-check-page__section-header'>
                <h3 className='recipe-tool-check-page__section-title'>도구</h3>
                <p className='recipe-tool-check-page__section-count'>총 {DUMMY_TOOLS.length}개</p>
              </div>

              <div className='recipe-tool-check-page__tool-list'>
                {DUMMY_TOOLS.map((tool) => (
                  <ToolChip key={tool.id} name={tool.name} />
                ))}
              </div>
            </section>

            <section className='recipe-tool-check-page__section recipe-tool-check-page__section--ingredients'>
              <div className='recipe-tool-check-page__section-header'>
                <h3 className='recipe-tool-check-page__section-title'>재료</h3>
                <p className='recipe-tool-check-page__section-count'>총 {ingredients.length}개</p>
              </div>

              <div className='recipe-tool-check-page__ingredient-list'>
                {ingredients.map((item) => (
                  <IngredientCheckItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    isChecked={item.isChecked}
                    hasSubstitute={item.hasSubstitute}
                    onToggle={() => handleToggle(item.id)}
                  />
                ))}
              </div>
            </section>
          </>
        ) : null}
      </div>

      <div className='recipe-tool-check-page__bottom'>
        <p className='recipe-tool-check-page__cta-caption'>
          조리 시작 후 단계별 안내로 이어집니다.
        </p>
        <CommonButton
          weight='bold'
          className='recipe-tool-check-page__cta-button'
          onClick={handleStartCooking}
          disabled={!recipe}
        >
          준비 완료 · 요리 시작
        </CommonButton>
      </div>
    </main>
  )
}
