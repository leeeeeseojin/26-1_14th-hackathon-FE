import AxiosInstance from '../../../apis/axiosInstance'

import { RECIPE_STATUS, SOURCE_TYPE } from '../mocks/recipeSavedListMock'

export const RECIPE_LIST_STATUS = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
}

const RECIPE_LIST_PAGE = 0
const RECIPE_LIST_SIZE = 20

const IMPORT_METHOD_TO_SOURCE_TYPE = {
  LINK: SOURCE_TYPE.LINK,
  IMAGE: SOURCE_TYPE.IMAGE,
  TEXT: SOURCE_TYPE.TEXT,
}

const mapRecipeListItem = (recipe) => {
  return {
    id: recipe.recipeId,
    title: recipe.title,
    thumbnailUrl: null,
    sourceType: IMPORT_METHOD_TO_SOURCE_TYPE[recipe.importMethod] ?? null,
    cookTime: recipe.cookingTimeMinutes,
    calories: recipe.caloriesKcal,
    status: recipe.completed ? RECIPE_STATUS.COMPLETED : RECIPE_STATUS.ORIGINAL,
    completed: recipe.completed,
  }
}

export const getRecipeSavedList = async ({ status = RECIPE_LIST_STATUS.ALL } = {}) => {
  const response = await AxiosInstance.get('/api/recipes', {
    params: {
      status,
      page: RECIPE_LIST_PAGE,
      size: RECIPE_LIST_SIZE,
    },
  })

  return {
    recipes: (response.data?.recipes ?? []).map(mapRecipeListItem),
    page: response.data?.page ?? null,
  }
}
