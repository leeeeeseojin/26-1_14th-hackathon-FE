import { useState } from 'react'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import NutrientTag from '../../../components/recipe-edit/nutrient-tag/NutrientTag'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'
import CookingStepItem from '../../../components/recipe-edit/cooking-step-item/CookingStepItem'

import dummyHeroImage from '../../../assets/dummy/recipe-review-hero.svg'
import chevronDownGreenIcon from '../../../assets/icon/chevron-down-green.svg'
import {
  DUMMY_SUGGESTION,
  DUMMY_NUTRIENTS,
  DUMMY_DETAIL_INGREDIENTS,
  DUMMY_NUTRITION_CHANGE,
  DUMMY_DETAIL_COOKING_STEPS,
} from '../apis/dummyRecipeSuggest'

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

export default function RecipeSuggestPage({ onBack, onSelect, onRetry }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)

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

          <CommonButton className='recipe-suggest-page__gap-lg' onClick={onSelect}>
            선택하기
          </CommonButton>

          <div className='recipe-suggest-page__notice'>
            <div className='recipe-suggest-page__notice-text'>
              <p className='recipe-suggest-page__notice-title'>맞지 않으시나요?</p>
              <p className='recipe-suggest-page__notice-description'>
                레시피를 다시 추천받을 수 있습니다.
              </p>
            </div>
            <button type='button' className='recipe-suggest-page__retry-button' onClick={onRetry}>
              다른 레시피 추천받기
            </button>
          </div>

          <button
            type='button'
            className='recipe-suggest-page__detail-toggle recipe-suggest-page__gap-xl'
            onClick={() => setIsDetailOpen((prev) => !prev)}
          >
            {isDetailOpen ? '레시피 닫기' : '레시피 상세보기'}
            <img
              src={chevronDownGreenIcon}
              alt=''
              className={`recipe-suggest-page__detail-toggle-icon ${
                isDetailOpen ? 'recipe-suggest-page__detail-toggle-icon--flipped' : ''
              }`}
            />
          </button>

          {isDetailOpen && (
            <>
              <section className='recipe-suggest-page__section'>
                <h3 className='recipe-suggest-page__section-title'>재료</h3>
                <div className='recipe-suggest-page__card'>
                  {DUMMY_DETAIL_INGREDIENTS.map((item, index) => (
                    <KeyValueRow
                      key={item.id}
                      variant='ingredient'
                      label={item.name}
                      value={item.amount}
                      badge={item.badge}
                      isLast={index === DUMMY_DETAIL_INGREDIENTS.length - 1}
                    />
                  ))}
                </div>
              </section>

              <section className='recipe-suggest-page__section recipe-suggest-page__gap-lg'>
                <h3 className='recipe-suggest-page__section-title'>
                  영양 정보 변화{' '}
                  <span className='recipe-suggest-page__section-sub'>(1인분 기준)</span>
                </h3>
                <div className='recipe-suggest-page__card'>
                  {DUMMY_NUTRITION_CHANGE.map((item, index) => (
                    <KeyValueRow
                      key={item.id}
                      variant='nutrition'
                      label={item.label}
                      value={item.value}
                      oldValue={item.oldValue}
                      newValue={item.newValue}
                      changeType={item.changeType}
                      isLast={index === DUMMY_NUTRITION_CHANGE.length - 1}
                    />
                  ))}
                </div>
              </section>

              <section className='recipe-suggest-page__section recipe-suggest-page__gap-lg'>
                <h3 className='recipe-suggest-page__section-title'>조리 단계</h3>
                <div className='recipe-suggest-page__step-card'>
                  {DUMMY_DETAIL_COOKING_STEPS.map((step, index) => (
                    <CookingStepItem key={step.id} number={index + 1}>
                      {step.description}
                    </CookingStepItem>
                  ))}
                </div>
              </section>

              <p className='recipe-suggest-page__disclaimer'>
                이 영양 정보는 참고용이며 실제 수치와 다를 수 있습니다. 건강 상태에 따른 식단 결정은
                의료진과 상담하세요.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
