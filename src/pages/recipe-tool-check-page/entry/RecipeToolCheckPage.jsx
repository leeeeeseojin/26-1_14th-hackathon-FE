import Header from '../../../components/header/Header'

import heroIllustration from '../../../assets/cooking-flow/tool-check-hero.svg'

import './RecipeToolCheckPage.css'

export default function RecipeToolCheckPagenStartCooking({ onBack }) {
  return (
    <main className='recipe-tool-check-page'>
      <Header title='레시피 재료 및 도구' onBack={onBack} />

      <div className='recipe-tool-check-page__hero'>
        <img src={heroIllustration} alt='' className='recipe-tool-check-page__hero-illustration' />
        <p className='recipe-tool-check-page__hero-text'>요리를 시작해볼까요?</p>
      </div>

      <div className='recipe-tool-check-page__content'>
        {/* Sub 109: 레시피 요약 및 도구 영역 */}

        {/* Sub 110: 재료 체크리스트 및 하단 버튼 영역 */}
      </div>
    </main>
  )
}
