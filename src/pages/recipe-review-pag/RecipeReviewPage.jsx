import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'

import dummyHeroImage from '../../../assets/dummy/recipe-review-hero.svg'

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

export default function RecipeReviewPage({ onBack, onStart }) {
  return (
    <main className='recipe-review-page'>
      <Header title='레시피 검토' onBack={onBack} />

      <div className='recipe-review-page__content'>
        <RecipeHeroImage src={dummyHeroImage} alt='계란 볶음밥' />

        <div className='recipe-review-page__body'>
          <RecipeSummary title='계란 볶음밥' description='조리 약 20분 · 재료 10가지' />

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
