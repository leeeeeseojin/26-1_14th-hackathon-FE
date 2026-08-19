import { useState } from 'react'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import NoticeBanner from '../../../components/recipe-edit/notice-banner/NoticeBanner'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'
import IngredientToggle from '../components/ingredient-toggle/IngredientToggle'
import SubstitutionCard from '../components/substitution-card/SubstitutionCard'

import {
  DUMMY_SUGGESTION,
  DUMMY_INGREDIENTS,
  DUMMY_NUTRITION_CHANGE,
  DUMMY_SUBSTITUTIONS,
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

export default function RecipeSubstitutePage({ onBack, onSave, onStartCooking }) {
  const [selectedIds, setSelectedIds] = useState([])

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const selectedSubstitutions = selectedIds
    .filter((id) => DUMMY_SUBSTITUTIONS[id])
    .map((id) => ({ id, ...DUMMY_SUBSTITUTIONS[id] }))

  const hasSelection = selectedIds.length > 0

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

        <section className='recipe-substitute-page__section recipe-substitute-page__gap-lg'>
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

        {hasSelection && (
          <section className='recipe-substitute-page__section recipe-substitute-page__gap-lg'>
            <h3 className='recipe-substitute-page__section-title'>대체 재료 선택</h3>
            <div className='recipe-substitute-page__substitution-list'>
              {selectedSubstitutions.map((item) => (
                <SubstitutionCard
                  key={item.id}
                  title={item.title}
                  reason={item.reason}
                  tags={item.tags}
                  isActionVisible={false}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className='recipe-substitute-page__bottom'>
        {hasSelection ? (
          <div className='recipe-substitute-page__bottom-buttons'>
            <CommonButton weight='regular' onClick={onSave}>
              저장하기
            </CommonButton>
            <CommonButton weight='regular' onClick={onStartCooking}>
              요리 시작하기
            </CommonButton>
          </div>
        ) : (
          <CommonButton weight='regular' onClick={onSave}>
            완료
          </CommonButton>
        )}
      </div>
    </main>
  )
}
