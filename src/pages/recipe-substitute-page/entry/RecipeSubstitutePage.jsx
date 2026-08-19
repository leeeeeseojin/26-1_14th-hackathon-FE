import { useState } from 'react'

import Header from '../../../components/header/Header'
import NoticeBanner from '../../../components/recipe-edit/notice-banner/NoticeBanner'
import IngredientToggle from '../components/ingredient-toggle/IngredientToggle'

import { DUMMY_SUGGESTION, DUMMY_INGREDIENTS } from '../apis/dummyRecipeSubstitute'

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

        {/* Sub 73: 영양 정보 변화 영역 */}

        {/* Sub 74: 대체 제안 카드 영역 */}
      </div>
    </main>
  )
}
