import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import NutrientTag from '../../../components/recipe-edit/nutrient-tag/NutrientTag'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'
import NoticeBanner from '../../../components/recipe-edit/notice-banner/NoticeBanner'
import CookingStepItem from '../../../components/recipe-edit/cooking-step-item/CookingStepItem'

import dummyHeroImage from '../../../assets/dummy/recipe-review-hero.svg'
import {
  DUMMY_RECIPE,
  DUMMY_NUTRIENTS,
  DUMMY_INGREDIENTS,
  VISIBLE_INGREDIENT_COUNT,
  DUMMY_NUTRITION_TABLE,
  DUMMY_COOKING_STEPS,
} from '../apis/dummyRecipeReview'

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
  const visibleIngredients = DUMMY_INGREDIENTS.slice(0, VISIBLE_INGREDIENT_COUNT)

  return (
    <main className='recipe-review-page'>
      <Header title='레시피 검토' onBack={onBack} />

      <div className='recipe-review-page__content'>
        <RecipeHeroImage src={dummyHeroImage} alt={DUMMY_RECIPE.title} />

        <div className='recipe-review-page__body'>
          <RecipeSummary title={DUMMY_RECIPE.title} description={DUMMY_RECIPE.description} />

          <div className='recipe-review-page__nutrient-list'>
            {DUMMY_NUTRIENTS.map((item) => (
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
              <button type='button' className='recipe-review-page__more-button'>
                더보기
              </button>
            </div>
          </section>

          <NoticeBanner level='medium' />

          <hr className='recipe-review-page__divider' />

          <section className='recipe-review-page__section'>
            <h3 className='recipe-review-page__section-title'>
              영양 정보 <span className='recipe-review-page__section-sub'>(1인분 기준)</span>
            </h3>
            <div className='recipe-review-page__card'>
              {DUMMY_NUTRITION_TABLE.map((item, index) => (
                <KeyValueRow
                  key={item.id}
                  variant='nutrition'
                  label={item.name}
                  value={item.amount}
                  isLast={index === DUMMY_NUTRITION_TABLE.length - 1}
                />
              ))}
            </div>
          </section>

          <hr className='recipe-review-page__divider' />

          <section className='recipe-review-page__section'>
            <h3 className='recipe-review-page__section-title'>조리 단계</h3>
            <div className='recipe-review-page__step-card'>
              {DUMMY_COOKING_STEPS.map((step, index) => (
                <CookingStepItem key={step.id} number={index + 1}>
                  {step.description}
                </CookingStepItem>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className='recipe-review-page__bottom'>
        <CommonButton onClick={onStart}>시작하기</CommonButton>
      </div>
    </main>
  )
}
