import { getRecipeDetail } from '../../recipe-review-page/apis/RecipeReviewApi'

const formatSummaryDescription = (recipe) => {
  const parts = []

  if (recipe.cookingTime != null) {
    parts.push(`${recipe.cookingTime}분`)
  }

  if (recipe.nutrition?.calories != null) {
    parts.push(`${recipe.nutrition.calories} kcal`)
  }

  if (recipe.nutrition?.protein != null) {
    parts.push(`단백질 ${recipe.nutrition.protein}g`)
  }

  return parts.join(' · ')
}

export const getToolCheckRecipe = async (recipeId) => {
  const recipe = await getRecipeDetail(recipeId)

  return {
    ...recipe,
    summaryDescription: formatSummaryDescription(recipe),
    checklist: recipe.ingredients.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      amount: ingredient.amount,
      isChecked: false,
      hasSubstitute: false,
    })),
  }
}
