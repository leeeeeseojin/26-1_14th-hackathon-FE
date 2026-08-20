import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import NoticeBanner from '../../../components/recipe-edit/notice-banner/NoticeBanner'
import KeyValueRow from '../../../components/recipe-edit/key-value-row/KeyValueRow'
import IngredientToggle from '../components/ingredient-toggle/IngredientToggle'
import SubstitutionCard from '../components/substitution-card/SubstitutionCard'

import getApiErrorMessage from '../../../apis/getApiErrorMessage'
import { getPersonalizedRecipe } from '../../recipe-suggest-page/apis/RecipeSuggestApi'
import {
  applyIngredientSubstitute,
  getIngredientAlternatives,
} from '../apis/RecipeSubstituteApi'
import { DUMMY_SUGGESTION } from '../apis/dummyRecipeSubstitute'

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

const mapAlternativeCard = (ingredient, alternativeData) => {
  const original = alternativeData?.originalIngredient
  const alternative = alternativeData?.alternative

  if (!alternative) {
    return null
  }

  const originalAmount = original?.amount ?? ingredient.amount
  const suggestedAmount = alternative.recommendedAmount

  return {
    originalPart: `${original?.title ?? ingredient.name} ${originalAmount}`,
    suggestedPart: `${alternative.title} ${suggestedAmount}`,
    reason: alternative.recommendationReason
      ? `추천 이유: ${alternative.recommendationReason}`
      : '',
    tags: [
      alternative.nutritionChanges?.carb != null
        ? { label: `탄수화물 ${alternative.nutritionChanges.carb}g`, variant: 'carb' }
        : null,
      alternative.nutritionChanges?.calories != null
        ? { label: `열량 ${alternative.nutritionChanges.calories}kcal`, variant: 'neutral' }
        : null,
    ].filter(Boolean),
    alternative,
  }
}

export default function RecipeSubstitutePage({ onBack }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const recipeId = searchParams.get('recipeId')
  const [cardStates, setCardStates] = useState({})
  const [recipe, setRecipe] = useState(null)
  const [nutritionChangeTable, setNutritionChangeTable] = useState([])
  const [alternativesById, setAlternativesById] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [actionError, setActionError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const requestedAlternativeIds = useRef(new Set())

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) {
        setRecipe(null)
        setErrorMessage('레시피 정보가 없습니다.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await getPersonalizedRecipe(recipeId)
        setRecipe(data)
        setNutritionChangeTable(data.nutritionChangeTable)
      } catch (error) {
        console.error('개인화 레시피 상세 조회 실패:', error)
        setRecipe(null)
        setErrorMessage(getApiErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
  }, [recipeId])

  const ingredients = recipe?.ingredients ?? []

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

    setCardStates((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const selectedIds = Object.keys(cardStates)
    .filter((id) => cardStates[id].toggleStatus === 'selected')
    .map(Number)
  const selectedIdKey = selectedIds.join(',')

  useEffect(() => {
    if (!recipeId || !selectedIdKey) {
      return
    }

    selectedIdKey.split(',').forEach((id) => {
      const ingredientId = Number(id)

      if (requestedAlternativeIds.current.has(ingredientId)) {
        return
      }

      requestedAlternativeIds.current.add(ingredientId)

      setAlternativesById((prev) => ({
        ...prev,
        [ingredientId]: { loading: true, alternative: null, originalIngredient: null },
      }))

      getIngredientAlternatives(recipeId, ingredientId)
        .then((data) => {
          setAlternativesById((prev) => ({
            ...prev,
            [ingredientId]: {
              loading: false,
              originalIngredient: data.originalIngredient,
              alternative: data.alternative,
            },
          }))
        })
        .catch((error) => {
          console.error('대체 재료 후보 조회 실패:', error)
          setAlternativesById((prev) => ({
            ...prev,
            [ingredientId]: {
              loading: false,
              errorMessage: getApiErrorMessage(error),
              alternative: null,
              originalIngredient: null,
            },
          }))
        })
    })
  }, [recipeId, selectedIdKey])

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

  const selectedIngredients = selectedIds.map((id) => {
    const ingredient = ingredients.find((item) => item.id === id)

    return {
      id,
      name: ingredient?.name ?? '',
      substitution: mapAlternativeCard(ingredient, alternativesById[id]),
      status: cardStates[id]?.cardStatus ?? 'pending',
      customValue: cardStates[id]?.customValue ?? '',
      alternative: alternativesById[id]?.alternative ?? null,
    }
  })

  const hasSelection = selectedIds.length > 0

  const isAllDecided = selectedIngredients.every((item) => {
    if (alternativesById[item.id]?.loading) {
      return false
    }

    if (item.substitution) {
      return DECIDED_STATUSES.includes(item.status)
    }

    return item.status === 'custom-confirmed'
  })

  const applyAcceptedSubstitutes = async () => {
    const acceptedItems = selectedIngredients.filter(
      (item) => item.status === 'accepted' && item.alternative,
    )

    let latestTable = nutritionChangeTable

    for (const item of acceptedItems) {
      const result = await applyIngredientSubstitute(recipeId, {
        originalIngredientId: item.id,
        substituteIngredientId: item.alternative.ingredientId,
        amount: item.alternative.recommendedAmount,
      })
      latestTable = result.nutritionChangeTable
    }

    if (acceptedItems.length > 0) {
      setNutritionChangeTable(latestTable)
    }
  }

  const handleSave = async () => {
    if (hasSelection && !isAllDecided) return
    if (!recipeId || isSaving) return

    setIsSaving(true)
    setActionError('')

    try {
      await applyAcceptedSubstitutes()
      navigate('/main')
    } catch (error) {
      console.error('대체 재료 적용 실패:', error)
      setActionError(getApiErrorMessage(error))
    } finally {
      setIsSaving(false)
    }
  }

  const handleStartCooking = async () => {
    if (!isAllDecided) return
    if (!recipeId || isSaving) return

    setIsSaving(true)
    setActionError('')

    try {
      await applyAcceptedSubstitutes()
      navigate(`/recipe/tool-check?recipeId=${recipeId}`)
    } catch (error) {
      console.error('대체 재료 적용 실패:', error)
      setActionError(getApiErrorMessage(error))
    } finally {
      setIsSaving(false)
    }
  }

  const description =
    recipe?.description ||
    (recipe?.cookingTime != null ? `조리 약 ${recipe.cookingTime}분` : '')

  return (
    <main className='recipe-substitute-page'>
      <Header title='재료 대체' onBack={onBack} />

      <div className='recipe-substitute-page__content'>
        {isLoading ? (
          <p className='recipe-substitute-page__status'>레시피를 불러오는 중입니다.</p>
        ) : null}

        {errorMessage ? <p className='recipe-substitute-page__status'>{errorMessage}</p> : null}

        {recipe && !isLoading ? (
          <>
            <SubstituteSummary
              reason={DUMMY_SUGGESTION.reason}
              title={recipe.title}
              description={description}
            />

            <NoticeBanner level='medium' />

            <section className='recipe-substitute-page__section'>
              <div className='recipe-substitute-page__section-header'>
                <h3 className='recipe-substitute-page__section-title'>재료</h3>
                <p className='recipe-substitute-page__hint'>냉장고에 없는 재료를 체크해주세요</p>
              </div>

              <div className='recipe-substitute-page__ingredient-grid'>
                {ingredients.map((item) => (
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
                영양 정보 변화{' '}
                <span className='recipe-substitute-page__section-sub'>(1인분 기준)</span>
              </h3>
              <div className='recipe-substitute-page__card'>
                {nutritionChangeTable.map((item, index) => (
                  <KeyValueRow
                    key={item.id}
                    variant='nutrition'
                    label={item.label}
                    oldValue={item.oldValue}
                    newValue={item.newValue}
                    changeType={item.changeType}
                    isLast={index === nutritionChangeTable.length - 1}
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

            {actionError ? <p className='recipe-substitute-page__status'>{actionError}</p> : null}
          </>
        ) : null}
      </div>

      <div className='recipe-substitute-page__bottom'>
        {hasSelection ? (
          <div className='recipe-substitute-page__bottom-buttons'>
            <CommonButton
              weight='regular'
              onClick={handleSave}
              disabled={!isAllDecided || isSaving}
            >
              저장하기
            </CommonButton>
            <CommonButton
              weight='regular'
              onClick={handleStartCooking}
              disabled={!isAllDecided || isSaving}
            >
              요리 시작하기
            </CommonButton>
          </div>
        ) : (
          <CommonButton weight='regular' onClick={handleSave} disabled={isSaving || !recipe}>
            완료
          </CommonButton>
        )}
      </div>
    </main>
  )
}
