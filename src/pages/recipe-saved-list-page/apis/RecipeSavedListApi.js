import AxiosInstance from '../../../apis/axiosInstance'
import { RECIPE_STATUS, SOURCE_TYPE } from '../mocks/recipeSavedListMock'

export const RECIPE_LIST_STATUS = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
}

// 명세서 기반 매핑: YouTube/IMAGE/TEXT 타입
const IMPORT_TYPE_TO_SOURCE_TYPE = {
  URL: SOURCE_TYPE.LINK,
  IMAGE: SOURCE_TYPE.IMAGE,
  TEXT: SOURCE_TYPE.TEXT,
}

const mapRecipeListItem = (recipe) => {
  return {
    id: recipe.recipeId,
    title: recipe.title,
    thumbnailUrl: null, // 명세서에 이미지 URL 필드가 별도로 명시되지 않아 null 유지
    sourceType: IMPORT_TYPE_TO_SOURCE_TYPE[recipe.importType] ?? null,
    cookTime: recipe.cookingTime, // 필드명 수정
    calories: recipe.totalCalories, // 필드명 수정
    status: recipe.completed ? RECIPE_STATUS.COMPLETED : RECIPE_STATUS.ORIGINAL,
    completed: recipe.completed,
  }
}

// 레시피 목록 조회 (GET)
export const getRecipeSavedList = async ({ status = RECIPE_LIST_STATUS.ALL } = {}) => {
  const response = await AxiosInstance.get('/api/recipes', {
    params: {
      status,
      page: 0,
      size: 20,
    },
  })

  // 명세서 응답 구조(RecipePageResponse)의 content 필드 활용
  const content = response.data?.content ?? []

  return {
    recipes: content.map(mapRecipeListItem),
    page: response.data?.page ?? 0,
    totalPages: response.data?.totalPages ?? 0,
  }
}

// 개인화 레시피 최종 저장 (POST)
export const savePersonalizedRecipe = async (recipeId, payload) => {
  const response = await AxiosInstance.post(`/api/recipes/${recipeId}/substitutions`, payload)
  return response.data
}
