import { apiRequest } from './client'

export const getRecipeDetail = (recipeId) => apiRequest(`/api/recipes/${recipeId}`)

export const generatePersonalizedRecipe = (recipeId, previousCandidateId = null) =>
  apiRequest(`/api/recipes/${recipeId}/personalized`, {
    method: 'POST',
    body: { previousCandidateId },
  })

export const getIngredientAlternatives = (recipeId, ingredientId) =>
  apiRequest(`/api/recipes/${recipeId}/ingredients/${ingredientId}/alternatives`)

export const previewSubstitutions = (recipeId, substitutions) =>
  apiRequest(`/api/recipes/${recipeId}/substitutions/preview`, {
    method: 'POST',
    body: { substitutions },
  })

export const saveSubstitutions = (recipeId, substitutions, title) =>
  apiRequest(`/api/recipes/${recipeId}/substitutions`, {
    method: 'POST',
    body: { substitutions, title },
  })

export const getCookingSteps = (recipeId) => apiRequest(`/api/recipes/${recipeId}/steps`)

export const importRecipeText = async (text) => {
  return apiRequest('/api/recipes/import/text', {
    method: 'POST',
    body: {
      text,
    },
  })
}

export const importRecipeYoutube = async (url) => {
  return apiRequest('/api/recipes/import/youtube', {
    method: 'POST',
    body: {
      url,
    },
  })
}
