import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  saveRecipeSubstitution,
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

const DECIDED_STATUSES = ['accepted', 'rejected', 'custom-confirmed']

export default function RecipeSubstitutePage({ onBack }) {
  const navigate = useNavigate()
  const [cardStates, setCardStates] = useState({}) // { [id]: { toggleStatus, cardStatus, customValue } }

  const getToggleStatus = (id) => cardStates[id]?.toggleStatus ?? 'default'

  const handleToggle = (id) => {
    const current = getToggleStatus(id)

    if (current === 'default') {
      setCardStates((prev) => ({
        ...prev,
        [id]: { toggleStatus: 'selected', cardStatus: 'pending', customValue: '' },
      }))
      return
    }

    if (current === 'deleted') {
      setCardStates((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      return
    }

    // selected 상태에서 다시 누르면 선택 해제
    setCardStates((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const handleCardStatusChange = (id, cardStatus) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], cardStatus },
    }))
  }

  const handleCardCustomValueChange = (id, value) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], customValue: value },
    }))
  }

  const handleCardDelete = (id) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], toggleStatus: 'deleted' },
    }))
  }

  const selectedIds = Object.keys(cardStates)
    .filter((id) => cardStates[id].toggleStatus === 'selected')
    .map(Number)

  const selectedIngredients = selectedIds.map((id) => {
    const ingredient = DUMMY_INGREDIENTS.find((item) => item.id === id)
    return {
      id,
      name: ingredient.name,
      substitution: DUMMY_SUBSTITUTIONS[id],
      status: cardStates[id]?.cardStatus ?? 'pending',
      customValue: cardStates[id]?.customValue ?? '',
    }
  })

  const hasSelection = selectedIds.length > 0

  // 제안 있는 카드: 수락/거절/직접입력확정 다 결정으로 인정
  // 제안 없는 카드: 직접입력확정만 결정으로 인정
  const isAllDecided = selectedIngredients.every((item) => {
    if (item.substitution) {
      return DECIDED_STATUSES.includes(item.status)
    }
    return item.status === 'custom-confirmed'
  })

  const buildPayload = () => ({
    recipeId: 'dummy-recipe-id',
    substitutions: selectedIngredients.map((item) => ({
      ingredientId: item.id,
      action: item.substitution ? item.status : 'custom',
      customValue: item.customValue || undefined,
    })),
  })

  const handleSave = async () => {
    if (hasSelection && !isAllDecided) return
    await saveRecipeSubstitution(buildPayload())
    navigate('/main')
  }

  const handleStartCooking = async () => {
    if (!isAllDecided) return
    await saveRecipeSubstitution(buildPayload())
    navigate('/recipe/tool-check')
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
                status={getToggleStatus(item.id)}
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
              {selectedIngredients.map((item) =>
                item.substitution ? (
                  <SubstitutionCard
                    key={item.id}
                    originalPart={item.substitution.originalPart}
                    suggestedPart={item.substitution.suggestedPart}
                    reason={item.substitution.reason}
                    tags={item.substitution.tags}
                    status={item.status}
                    onStatusChange={(status) => handleCardStatusChange(item.id, status)}
                    customValue={item.customValue}
                    onCustomValueChange={(value) => handleCardCustomValueChange(item.id, value)}
                    onDelete={() => handleCardDelete(item.id)}
                  />
                ) : (
                  <SubstitutionCard
                    key={item.id}
                    originalPart={item.name}
                    suggestedPart=''
                    hasNoSuggestion
                    status={item.status}
                    onStatusChange={(status) => handleCardStatusChange(item.id, status)}
                    customValue={item.customValue}
                    onCustomValueChange={(value) => handleCardCustomValueChange(item.id, value)}
                    onDelete={() => handleCardDelete(item.id)}
                  />
                ),
              )}
            </div>

            {!isAllDecided && (
              <p className='recipe-substitute-page__warning'>아직 결정하지 않은 재료가 있어요</p>
            )}
          </section>
        )}
      </div>

      <div className='recipe-substitute-page__bottom'>
        {hasSelection ? (
          <div className='recipe-substitute-page__bottom-buttons'>
            <CommonButton weight='regular' onClick={handleSave} disabled={!isAllDecided}>
              저장하기
            </CommonButton>
            <CommonButton weight='regular' onClick={handleStartCooking} disabled={!isAllDecided}>
              요리 시작하기
            </CommonButton>
          </div>
        ) : (
          <CommonButton weight='regular' onClick={handleSave}>
            완료
          </CommonButton>
        )}
      </div>
    </main>
  )
}
