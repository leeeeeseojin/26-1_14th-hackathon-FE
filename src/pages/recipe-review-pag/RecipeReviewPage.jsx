import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'

import './RecipeReviewPage.css'

export default function RecipeReviewPage({ onBack, onStart }) {
  return (
    <main className='recipe-review-page'>
      <Header title='레시피 검토' onBack={onBack} />

      <div className='recipe-review-page__content'>
        {/* Sub 36: 이미지·제목·설명 영역 */}

        <div className='recipe-review-page__body'>
          {/* Sub 37: 영양정보 영역 */}

          {/* Sub 38: 재료 목록 영역 */}

          {/* Sub 39: 조리 단계 영역 (영양정보 표, NoticeBanner 포함) */}
        </div>
      </div>

      <div className='recipe-review-page__bottom'>
        <CommonButton onClick={onStart}>시작하기</CommonButton>
      </div>
    </main>
  )
}
