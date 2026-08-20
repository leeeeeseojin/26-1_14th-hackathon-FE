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

export default function RecipeSubstitutePage({ onBack }) {
  const navigate = useNavigate()
  const [cardStates, setCardStates] = useState({}) // { [id]: { status, customValue } }

  const selectedIds = Object.keys(cardStates).map(Number)

  const handleToggle = (id) => {
    setCardStates((prev) => {
      if (prev[id]) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: { status: 'pending', customValue: '' } }
    })
  }

  const handleCardStatusChange = (id, status) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], status },
    }))
  }

  const handleCardCustomValueChange = (id, value) => {
    setCardStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], customValue: value },
    }))
  }

  const handleCardDelete = (id) => {
    handleToggle(id)
  }

  const selectedIngredients = selectedIds.map((id) => {
    const ingredient = DUMMY_INGREDIENTS.find((item) => item.id === id)
    return {
      id,
      name: ingredient.name,
      substitution: DUMMY_SUBSTITUTIONS[id],
      status: cardStates[id]?.status ?? 'pending',
      customValue: cardStates[id]?.customValue ?? '',
    }
  })

  const hasSelection = selectedIds.length > 0

  const isAllDecided = selectedIngredients.every((item) => {
    if (item.substitution) {
      return item.status === 'accepted' || item.status === 'rejected'
    }
    return item.customValue.trim().length > 0
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
    navigate('/recipe/saved-list')
  }

  const handleStartCooking = async () => {
    if (!isAllDecided) return
    const result = await saveRecipeSubstitution(buildPayload())
    navigate(`/recipe/tool-check?recipeId=${result.recipeId}`)
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
                    title={item.substitution.title}
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
                    title={`${item.name} 대체 재료`}
                    hasNoSuggestion
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
