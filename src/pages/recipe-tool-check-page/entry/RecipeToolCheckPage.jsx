import Header from '../../../components/header/Header'
import RecipeSummaryCard from '../components/recipe-summary-card/RecipeSummaryCard'
import ToolChip from '../components/tool-chip/ToolChip'

import heroIllustration from '../../../assets/cooking-flow/tool-check-hero.svg'
import recipeThumbnail from '../../../assets/cooking-flow/recipe-thumbnail.svg'
import fryingPan from '../../../assets/cooking-flow/tools/frying-pan.svg'
import spatula from '../../../assets/cooking-flow/tools/spatula.svg'
import measuringSpoon from '../../../assets/cooking-flow/tools/measuring-spoon.svg'

import { DUMMY_RECIPE_SUMMARY, DUMMY_TOOLS } from '../apis/dummyRecipeToolCheck'

import './RecipeToolCheckPage.css'

const TOOL_ICON_MAP = {
  프라이팬: fryingPan,
  뒤집개: spatula,
  계량스푼: measuringSpoon,
}

export default function RecipeToolCheckPage({ onBack }) {
  return (
    <main className='recipe-tool-check-page'>
      <Header title='레시피 재료 및 도구' onBack={onBack} />

      <div className='recipe-tool-check-page__hero'>
        <img src={heroIllustration} alt='' className='recipe-tool-check-page__hero-illustration' />
        <p className='recipe-tool-check-page__hero-text'>요리를 시작해볼까요?</p>
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

        {/* Sub 110: 재료 체크리스트 및 하단 버튼 영역 */}
      </div>
    </main>
  )
}
