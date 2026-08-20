import { apiRequest } from './client'

export const getRecipeDetail = (recipeId) => apiRequest(`/api/recipes/${recipeId}`)

export const getPersonalizedRecipe = (recipeId) =>
  apiRequest(`/api/recipes/${recipeId}/personalized`)

export const getIngredientAlternatives = (recipeId, ingredientId) =>
  apiRequest(`/api/recipes/${recipeId}/ingredients/${ingredientId}/alternatives`)

// TODO: 백엔드가 배열 지원하도록 수정 예정, 정확한 요청 스펙 확정되면 수정 필요
export const substituteIngredients = (recipeId, substitutions) =>
  apiRequest(`/api/recipes/${recipeId}/ingredients/substitute`, {
    method: 'POST',
    body: { substitutions },
  })

export const getCookingSteps = (recipeId) => apiRequest(`/api/recipes/${recipeId}/steps`)
