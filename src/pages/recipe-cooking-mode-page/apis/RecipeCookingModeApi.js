import AxiosInstance from '../../../apis/axiosInstance'

import { DUMMY_COOKING_STEPS } from './dummyRecipeCookingMode'

const mergeCookingStep = (step, index) => {
  const extra = DUMMY_COOKING_STEPS[index] ?? {}

  return {
    id: step.stepOrder,
    name: extra.name ?? `${step.stepOrder}단계`,
    title: extra.title ?? `조리 단계 ${step.stepOrder}`,
    description: step.description,
    actions: extra.actions ?? [],
    tip: extra.tip ?? '',
    durationMinutes: extra.durationMinutes ?? 0,
  }
}

export const getRecipeCookingSteps = async (recipeId) => {
  const response = await AxiosInstance.get(`/api/recipes/${recipeId}/steps`)
  const data = response.data ?? {}

  return {
    recipeId: data.recipeId,
    title: data.title,
    totalSteps: data.totalSteps,
    steps: (data.steps ?? []).map(mergeCookingStep),
  }
}
