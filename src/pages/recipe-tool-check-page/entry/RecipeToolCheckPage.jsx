import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import RecipeSummaryCard from '../components/recipe-summary-card/RecipeSummaryCard'
import ToolChip from '../components/tool-chip/ToolChip'
import IngredientCheckItem from '../components/ingredient-check-item/IngredientCheckItem'

import heroIllustration from '../../../assets/cooking-flow/tool-check-hero.svg'
import recipeThumbnail from '../../../assets/cooking-flow/recipe-thumbnail.svg'
import fryingPan from '../../../assets/cooking-flow/tools/frying-pan.svg'
import spatula from '../../../assets/cooking-flow/tools/spatula.svg'
import measuringSpoon from '../../../assets/cooking-flow/tools/measuring-spoon.svg'

import {
  DUMMY_RECIPE_SUMMARY,
  DUMMY_TOOLS,
  DUMMY_INGREDIENT_CHECKLIST,
} from '../apis/dummyRecipeToolCheck'

import './RecipeToolCheckPage.css'

const TOOL_ICON_MAP = {
  프라이팬: fryingPan,
  뒤집개: spatula,
  계량스푼: measuringSpoon,
}

export default function RecipeToolCheckPage({ onBack }) {
  const navigate = useNavigate()
  const [ingredients, setIngredients] = useState(DUMMY_INGREDIENT_CHECKLIST)

  const handleToggle = (id) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item)),
    )
  }

  const handleStartCooking = () => {
    navigate('/recipe/cooking-mode')
  }

  return (
    <main className='recipe-tool-check-page'>
      <Header title='레시피 재료 및 도구' onBack={onBack} />

      <div className='recipe-tool-check-page__hero'>
        <img src={heroIllustration} alt='' className='recipe-tool-check-page__hero-illustration' />
      </div>

      <div className='recipe-tool-check-page__content'>
        <RecipeSummaryCard
          thumbnail={recipeThumbnail}
          title={DUMMY_RECIPE_SUMMARY.title}
          description={DUMMY_RECIPE_SUMMARY.description}
          tags={DUMMY_RECIPE_SUMMARY.tags}
        />

        <section className='recipe-tool-check-page__section'>
          <div className='recipe-tool-check-page__section-header'>
            <h3 className='recipe-tool-check-page__section-title'>도구</h3>
            <p className='recipe-tool-check-page__section-count'>총 {DUMMY_TOOLS.length}개</p>
          </div>

          <div className='recipe-tool-check-page__tool-list'>
            {DUMMY_TOOLS.map((tool) => (
              <ToolChip key={tool.id} icon={TOOL_ICON_MAP[tool.name]} name={tool.name} />
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
