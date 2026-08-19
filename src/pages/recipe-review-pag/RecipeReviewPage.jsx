import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import NutrientTag from '../../../components/recipe-edit/nutrient-tag/NutrientTag'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'

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

const DUMMY_INGREDIENTS = [
  { id: 1, name: '쌀', amount: '180g' },
  { id: 2, name: '닭가슴살', amount: '100g' },
  { id: 3, name: '브로콜리', amount: '80g' },
  { id: 4, name: '당근', amount: '50g' },
  { id: 5, name: '올리브오일', amount: '1T' },
]

const VISIBLE_INGREDIENT_COUNT = 3

export default function RecipeReviewPage({ onBack, onStart }) {
  const visibleIngredients = DUMMY_INGREDIENTS.slice(0, VISIBLE_INGREDIENT_COUNT)

  return (
    <main className='recipe-review-page'>
      <Header title='레시피 검토' onBack={onBack} />

      <div className='recipe-review-page__content'>
        <RecipeHeroImage src={dummyHeroImage} alt='계란 볶음밥' />

        <div className='recipe-review-page__body'>
          <RecipeSummary title='계란 볶음밥' description='조리 약 20분 · 재료 10가지' />

          <div className='recipe-review-page__nutrient-list'>
            <NutrientTag label='칼로리' value='380kcal' variant='calorie' />
            <NutrientTag label='탄수화물' value='45g' variant='carb' />
            <NutrientTag label='단백질' value='12g' variant='neutral' />
            <NutrientTag label='당류' value='9g' variant='neutral' />
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
              <button type='button' className='recipe-review-page__more-button'>
                더보기
              </button>
            </div>
          </section>

          {/* Sub 39: 조리 단계 영역 (영양정보 표, NoticeBanner 포함) */}
        </div>
      </div>

      <div className='recipe-review-page__bottom'>
        <CommonButton onClick={onStart}>시작하기</CommonButton>
      </div>
    </main>
  )
}
