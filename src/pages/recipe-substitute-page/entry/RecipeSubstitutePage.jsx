import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import NoticeBanner from '../../../components/recipe-edit/notice-banner/NoticeBanner'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'
import IngredientToggle from '../components/ingredient-toggle/IngredientToggle'
import SubstitutionCard from '../components/substitution-card/SubstitutionCard'

import {
  getRecipeDetail,
  getIngredientAlternatives,
  substituteIngredients,
} from '../../../apis/recipe'

import './RecipeSubstitutePage.css'

const DECIDED_STATUSES = ['accepted', 'rejected', 'custom-confirmed']

export default function RecipeSubstitutePage({ onBack }) {
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cardStates, setCardStates] = useState({}) // { [ingredientId]: { toggleStatus, cardStatus, customValue, alternative } }

  useEffect(() => {
    let isMounted = true

    const fetchRecipe = async () => {
      try {
        setIsLoading(true)
        const data = await getRecipeDetail(recipeId)
        if (isMounted) setRecipe(data)
      } catch (err) {
        if (isMounted) setError(err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchRecipe()
    return () => {
      isMounted = false
    }
  }, [recipeId])

  const getToggleStatus = (id) => cardStates[id]?.toggleStatus ?? 'default'

  const handleToggle = async (ingredientId) => {
    const current = getToggleStatus(ingredientId)

    if (current === 'default') {
      // 선택 시 대체 후보 조회
      setCardStates((prev) => ({
        ...prev,
        [ingredientId]: {
          toggleStatus: 'selected',
          cardStatus: 'pending',
          customValue: '',
          alternative: null,
          isLoadingAlternative: true,
        },
      }))

      try {
        const data = await getIngredientAlternatives(recipeId, ingredientId)
        const firstAlternative = data.alternatives?.[0] ?? null
        setCardStates((prev) => ({
          ...prev,
          [ingredientId]: {
            ...prev[ingredientId],
            alternative: firstAlternative,
            isLoadingAlternative: false,
          },
        }))
      } catch {
        setCardStates((prev) => ({
          ...prev,
          [ingredientId]: { ...prev[ingredientId], alternative: null, isLoadingAlternative: false },
        }))
      }
      return
    }

    if (current === 'deleted') {
      setCardStates((prev) => {
        const next = { ...prev }
        delete next[ingredientId]
        return next
      })
      return
    }

    setCardStates((prev) => {
      const next = { ...prev }
      delete next[ingredientId]
      return next
    })
  }

  const handleCardStatusChange = (id, cardStatus) => {
    setCardStates((prev) => ({ ...prev, [id]: { ...prev[id], cardStatus } }))
  }

  const handleCardCustomValueChange = (id, value) => {
    setCardStates((prev) => ({ ...prev, [id]: { ...prev[id], customValue: value } }))
  }

  const handleCardDelete = (id) => {
    setCardStates((prev) => ({ ...prev, [id]: { ...prev[id], toggleStatus: 'deleted' } }))
  }

  if (isLoading) return <p className='recipe-substitute-page__status'>불러오는 중...</p>
  if (error || !recipe)
    return <p className='recipe-substitute-page__status'>레시피를 불러오지 못했어요.</p>

  const { ingredients, nutrition } = recipe

  const selectedIds = Object.keys(cardStates)
    .filter((id) => cardStates[id].toggleStatus === 'selected')
    .map(Number)

  const selectedIngredients = selectedIds.map((id) => {
    const ingredient = ingredients.find((item) => item.ingredientId === id)
    const state = cardStates[id]
    return {
      id,
      name: ingredient.title,
      amount: ingredient.amount,
      alternative: state?.alternative,
      isLoadingAlternative: state?.isLoadingAlternative,
      status: state?.cardStatus ?? 'pending',
      customValue: state?.customValue ?? '',
    }
  })

  const hasSelection = selectedIds.length > 0

  const isAllDecided = selectedIngredients.every((item) => {
    if (item.alternative) {
      return DECIDED_STATUSES.includes(item.status)
    }
    return item.status === 'custom-confirmed'
  })

  const buildSubstitutions = () =>
    selectedIngredients
      .filter((item) => item.status === 'accepted' || item.status === 'custom-confirmed')
      .map((item) => ({
        originalIngredientId: item.id,
        substituteIngredientId: item.alternative?.ingredientId ?? null,
        amount: item.alternative?.recommendedAmount ?? null,
        // 직접입력인 경우 substituteIngredientId가 없을 수 있음 - 백엔드 확정 필요
        customName: item.status === 'custom-confirmed' ? item.customValue : undefined,
      }))

  const handleSave = async () => {
    if (hasSelection && !isAllDecided) return
    if (hasSelection) {
      await substituteIngredients(recipeId, buildSubstitutions())
    }
    navigate('/main')
  }

  const handleStartCooking = async () => {
    if (!isAllDecided) return
    await substituteIngredients(recipeId, buildSubstitutions())
    navigate(`/recipe/tool-check/${recipeId}`)
  }

  return (
    <main className='recipe-substitute-page'>
      <Header title='재료 대체' onBack={onBack} />

      <div className='recipe-substitute-page__content'>
        <NoticeBanner level='medium' />

        <section className='recipe-substitute-page__section'>
          <div className='recipe-substitute-page__section-header'>
            <h3 className='recipe-substitute-page__section-title'>재료</h3>
            <p className='recipe-substitute-page__hint'>냉장고에 없는 재료를 체크해주세요</p>
          </div>

          <div className='recipe-substitute-page__ingredient-grid'>
            {ingredients.map((item) => (
              <IngredientToggle
                key={item.ingredientId}
                name={item.title}
                status={getToggleStatus(item.ingredientId)}
                onToggle={() => handleToggle(item.ingredientId)}
              />
            ))}
          </div>
        </section>

        <section className='recipe-substitute-page__section recipe-substitute-page__gap-lg'>
          <h3 className='recipe-substitute-page__section-title'>
            영양 정보 <span className='recipe-substitute-page__section-sub'>(1인분 기준)</span>
          </h3>
          <div className='recipe-substitute-page__card'>
            <KeyValueRow variant='nutrition' label='열량' value={`${nutrition.calories} kcal`} />
            <KeyValueRow variant='nutrition' label='탄수화물' value={`${nutrition.carb} g`} />
            <KeyValueRow variant='nutrition' label='단백질' value={`${nutrition.protein} g`} />
            <KeyValueRow variant='nutrition' label='지방' value={`${nutrition.fat} g`} isLast />
          </div>
        </section>

        {hasSelection && (
          <section className='recipe-substitute-page__section recipe-substitute-page__gap-lg'>
            <h3 className='recipe-substitute-page__section-title'>대체 재료 선택</h3>
            <div className='recipe-substitute-page__substitution-list'>
              {selectedIngredients.map((item) => {
                if (item.isLoadingAlternative) {
                  return (
                    <p key={item.id} className='recipe-substitute-page__loading'>
                      대체 재료 확인 중...
                    </p>
                  )
                }
                return item.alternative ? (
                  <SubstitutionCard
                    key={item.id}
                    originalPart={`${item.name} ${item.amount}g`}
                    suggestedPart={`${item.alternative.title} ${item.alternative.recommendedAmount}g`}
                    reason={`추천 이유: ${item.alternative.recommendationReason}`}
                    tags={[]}
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
                )
              })}
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
