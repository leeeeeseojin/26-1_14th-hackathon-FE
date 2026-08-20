import AxiosInstance from '../../../apis/axiosInstance'

export const VISIBLE_INGREDIENT_COUNT = 3

const formatAmount = (value, suffix) => {
  if (value == null || value === '') {
    return '-'
  }

  return `${value}${suffix}`
}

export const mapNutrientTags = (nutrition = {}) => {
  return [
    {
      id: 'calories',
      label: '칼로리',
      value: formatAmount(nutrition.calories, 'kcal'),
      variant: 'calorie',
    },
    {
      id: 'carb',
      label: '탄수화물',
      value: formatAmount(nutrition.carb, 'g'),
      variant: 'carb',
    },
    {
      id: 'protein',
      label: '단백질',
      value: formatAmount(nutrition.protein, 'g'),
      variant: 'neutral',
    },
    {
      id: 'fat',
      label: '지방',
      value: formatAmount(nutrition.fat, 'g'),
      variant: 'neutral',
    },
  ]
}

export const mapNutritionTable = (nutrition = {}) => {
  return [
    { id: 'calories', name: '열량', amount: formatAmount(nutrition.calories, ' kcal') },
    { id: 'carb', name: '탄수화물', amount: formatAmount(nutrition.carb, ' g') },
    { id: 'protein', name: '단백질', amount: formatAmount(nutrition.protein, ' g') },
    { id: 'fat', name: '지방', amount: formatAmount(nutrition.fat, ' g') },
    { id: 'fiber', name: '식이섬유', amount: formatAmount(nutrition.fiber, ' g') },
  ]
}

const LOWER_IS_IMPROVED = new Set(['calories', 'carb', 'fat'])

const getChangeType = (key, oldValue, newValue) => {
  if (oldValue == null || newValue == null) {
    return 'improved'
  }

  if (LOWER_IS_IMPROVED.has(key)) {
    return newValue <= oldValue ? 'improved' : 'caution'
  }

  return newValue >= oldValue ? 'improved' : 'caution'
}

export const mapNutritionChanges = (originalNutrition = {}, nextNutrition = {}) => {
  return [
    { key: 'calories', label: '열량', suffix: ' kcal' },
    { key: 'carb', label: '탄수화물', suffix: ' g' },
    { key: 'protein', label: '단백질', suffix: ' g' },
    { key: 'fat', label: '지방', suffix: ' g' },
    { key: 'fiber', label: '식이섬유', suffix: ' g' },
  ].map((field) => {
    const oldValue = originalNutrition[field.key]
    const newValue = nextNutrition[field.key]

    return {
      id: field.key,
      label: field.label,
      oldValue: formatAmount(oldValue, field.suffix),
      newValue: formatAmount(newValue, field.suffix),
      changeType: getChangeType(field.key, oldValue, newValue),
    }
  })
}

export const mapIngredients = (ingredients = []) => {
  return ingredients.map((ingredient) => ({
    id: ingredient.ingredientId,
    name: ingredient.title,
    amount: ingredient.amount == null ? '' : String(ingredient.amount),
    badge: ingredient.changed ? '수정됨' : undefined,
    changeReason: ingredient.changeReason ?? null,
  }))
}

export const mapSteps = (steps = []) => {
  return steps.map((step) => ({
    id: step.stepOrder,
    description: step.description,
  }))
}

export const getRecipeDetail = async (recipeId) => {
  const response = await AxiosInstance.get(`/api/recipes/${recipeId}`)
  const data = response.data ?? {}

  return {
    recipeId: data.recipeId,
    title: data.title,
    description: data.description,
    cookingTime: data.cookingTime,
    nutrition: data.nutrition ?? {},
    ingredients: mapIngredients(data.ingredients ?? []),
    steps: mapSteps(data.steps ?? []),
    nutrientTags: mapNutrientTags(data.nutrition ?? {}),
    nutritionTable: mapNutritionTable(data.nutrition ?? {}),
  }
}
