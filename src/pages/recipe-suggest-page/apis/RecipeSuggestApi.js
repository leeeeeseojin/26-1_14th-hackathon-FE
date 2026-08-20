import AxiosInstance from '../../../apis/axiosInstance'

import {
  mapIngredients,
  mapNutrientTags,
  mapNutritionChanges,
  mapSteps,
} from '../../recipe-review-page/apis/RecipeReviewApi'

export const getPersonalizedRecipe = async (recipeId) => {
  const response = await AxiosInstance.get(`/api/recipes/${recipeId}/personalized`)
  const data = response.data ?? {}
  const personalizedNutrition = data.personalizedNutrition ?? {}
  const originalNutrition = data.originalNutrition ?? {}

  return {
    originalRecipeId: data.originalRecipeId,
    title: data.title,
    description: data.description,
    cookingTime: data.cookingTime,
    originalNutrition,
    personalizedNutrition,
    nutritionChanges: data.nutritionChanges ?? {},
    ingredients: mapIngredients(data.ingredients ?? []),
    steps: mapSteps(data.steps ?? []),
    nutrientTags: mapNutrientTags(personalizedNutrition),
    nutritionChangeTable: mapNutritionChanges(originalNutrition, personalizedNutrition),
  }
}

export const getRecipeRecommendations = async () => {
  const response = await AxiosInstance.get('/api/recipes/recommendations')

  return {
    recommendations: response.data?.recommendations ?? [],
  }
}
