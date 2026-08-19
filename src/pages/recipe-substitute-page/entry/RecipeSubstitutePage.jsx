import { useState } from 'react'

import Header from '../../../components/header/Header'
import NoticeBanner from '../../../components/recipe-edit/notice-banner/NoticeBanner'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'
import IngredientToggle from '../components/ingredient-toggle/IngredientToggle'

import {
  DUMMY_SUGGESTION,
  DUMMY_INGREDIENTS,
  DUMMY_NUTRITION_CHANGE,
} from '../apis/dummyRecipeSubstitute'

import './RecipeSubstitutePage.css'

function SubstituteSummary({ reason, title, description }) {
  return (
    <div className='recipe-substitute-page__summary'>
      <p className='recipe-substitute-page__reason'>{reason}</p>
      <h2 className='recipe-substitute-page__title'>{title}</h2>
      <p className='recipe-substitute-page__description'>{description}</p>
    </div>
  )
}

export default function RecipeSubstitutePage({ onBack }) {
  const [selectedIds, setSelectedIds] = useState([])

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <main className='recipe-substitute-page'>
      <Header title='재료 대체' onBack={onBack} />

      <div className='recipe-substitute-page__content'>
        <SubstituteSummary
          reason={DUMMY_SUGGESTION.reason}
          title={DUMMY_SUGGESTION.title}
          description={DUMMY_SUGGESTION.description}
        />

        <NoticeBanner level='medium' />

        <section className='recipe-substitute-page__section'>
          <div className='recipe-substitute-page__section-header'>
            <h3 className='recipe-substitute-page__section-title'>재료</h3>
            <p className='recipe-substitute-page__hint'>냉장고에 없는 재료를 체크해주세요</p>
          </div>

          <div className='recipe-substitute-page__ingredient-grid'>
            {DUMMY_INGREDIENTS.map((item) => (
              <IngredientToggle
                key={item.id}
                name={item.name}
                isSelected={selectedIds.includes(item.id)}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </section>

        <section className='recipe-substitute-page__section recipe-substitute-page__nutrition-section'>
          <h3 className='recipe-substitute-page__section-title'>
            영양 정보 변화 <span className='recipe-substitute-page__section-sub'>(1인분 기준)</span>
          </h3>
          <div className='recipe-substitute-page__card'>
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

        {/* Sub 74: 대체 제안 카드 영역 */}
      </div>
    </main>
  )
}
