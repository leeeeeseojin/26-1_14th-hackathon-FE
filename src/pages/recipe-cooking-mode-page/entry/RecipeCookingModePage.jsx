import Header from '../../../components/header/Header'

import { DUMMY_RECIPE_NAME, DUMMY_COOKING_STEPS } from '../apis/dummyRecipeCookingMode'

import './RecipeCookingModePage.css'

export default function RecipeCookingModePage({ onBack }) {
  return (
    <main className='recipe-cooking-mode-page'>
      <Header title='모디와 조리 중' subtitle={DUMMY_RECIPE_NAME} titleSize={18} onBack={onBack} />

      <div className='recipe-cooking-mode-page__content'>
        {/* Sub 127: 진행 요약 및 현재 단계 영역 */}

        {/* Sub 128: TIP, 다음 단계 미리보기 및 하단 버튼 영역 */}
      </div>
    </main>
  )
}
