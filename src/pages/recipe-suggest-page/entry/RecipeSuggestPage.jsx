import Header from '../../../components/header/Header'
import NutrientTag from '../../../components/recipe-edit/nutrient-tag/NutrientTag'

import dummyHeroImage from '../../../assets/dummy/recipe-review-hero.svg'
import { DUMMY_SUGGESTION, DUMMY_NUTRIENTS } from '../apis/dummyRecipeSuggest'

import './RecipeSuggestPage.css'

function SuggestionHeroImage({ src, alt }) {
  return (
    <div className='recipe-suggest-page__hero'>
      <img src={src} alt={alt} />
    </div>
  )
}

function SuggestionSummary({ reason, title, description }) {
  return (
    <div className='recipe-suggest-page__summary'>
      <p className='recipe-suggest-page__reason'>{reason}</p>
      <h2 className='recipe-suggest-page__title'>{title}</h2>
      <p className='recipe-suggest-page__description'>{description}</p>
    </div>
  )
}

export default function RecipeSuggestPage({ onBack }) {
  return (
    <main className='recipe-suggest-page'>
      <Header title='개인화 제안' onBack={onBack} />

      <div className='recipe-suggest-page__content'>
        <SuggestionHeroImage src={dummyHeroImage} alt={DUMMY_SUGGESTION.title} />

        <div className='recipe-suggest-page__body'>
          <SuggestionSummary
            reason={DUMMY_SUGGESTION.reason}
            title={DUMMY_SUGGESTION.title}
            description={DUMMY_SUGGESTION.description}
          />

          <div className='recipe-suggest-page__nutrient-list'>
            {DUMMY_NUTRIENTS.map((item) => (
              <NutrientTag
                key={item.id}
                label={item.label}
                value={item.value}
                variant={item.variant}
              />
            ))}
          </div>

          {/* Sub 54: 액션 버튼 영역 */}

          {/* Sub 55: 상세보기 확장 영역 */}
        </div>
      </div>
    </main>
  )
}
