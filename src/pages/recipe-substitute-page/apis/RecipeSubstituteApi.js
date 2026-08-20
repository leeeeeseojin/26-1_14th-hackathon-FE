import AxiosInstance from '../../../apis/axios'

import { mapNutritionChanges } from '../../recipe-review-page/apis/RecipeReviewApi'

export const getIngredientAlternatives = async (recipeId, ingredientId) => {
  const response = await AxiosInstance.get(
    `/api/recipes/${recipeId}/ingredients/${ingredientId}/alternatives`,
  )
  const data = response.data ?? {}
  const alternatives = data.alternatives ?? []

  return {
    recipeId: data.recipeId,
    originalIngredient: data.originalIngredient ?? null,
    alternatives,
    alternative: alternatives[0] ?? null,
  }
}

export const applyIngredientSubstitute = async (recipeId, body) => {
  const response = await AxiosInstance.post(
    `/api/recipes/${recipeId}/ingredients/substitute`,
    {
      originalIngredientId: body.originalIngredientId,
      substituteIngredientId: body.substituteIngredientId,
      amount: body.amount,
    },
  )
  const data = response.data ?? {}
  const nutrition = data.nutrition ?? {}
  const originalNutrition = {
    calories:
      nutrition.calories == null || data.nutritionChanges?.calories == null
        ? null
        : nutrition.calories - data.nutritionChanges.calories,
    carb:
      nutrition.carb == null || data.nutritionChanges?.carb == null
        ? null
        : nutrition.carb - data.nutritionChanges.carb,
    protein:
      nutrition.protein == null || data.nutritionChanges?.protein == null
        ? null
        : nutrition.protein - data.nutritionChanges.protein,
    fat:
      nutrition.fat == null || data.nutritionChanges?.fat == null
        ? null
        : nutrition.fat - data.nutritionChanges.fat,
    fiber:
      nutrition.fiber == null || data.nutritionChanges?.fiber == null
        ? null
        : nutrition.fiber - data.nutritionChanges.fiber,
  }

  return {
    recipeId: data.recipeId,
    message: data.message,
    changedIngredient: data.changedIngredient ?? null,
    nutrition,
    nutritionChanges: data.nutritionChanges ?? {},
    nutritionChangeTable: mapNutritionChanges(originalNutrition, nutrition),
  }
}
