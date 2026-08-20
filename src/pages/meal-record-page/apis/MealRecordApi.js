import AxiosInstance from '../../../apis/axios'

import breakfastImage from '../../../assets/dummy/meal-breakfast.png'
import lunchImage from '../../../assets/dummy/meal-lunch.png'
import dinnerImage from '../../../assets/dummy/meal-dinner.png'

import { MEAL_TYPE } from '../mocks/mealRecordMock'

const FALLBACK_MEAL_IMAGE = {
  [MEAL_TYPE.BREAKFAST]: breakfastImage,
  [MEAL_TYPE.LUNCH]: lunchImage,
  [MEAL_TYPE.DINNER]: dinnerImage,
}

const mapMealLog = (mealLog) => {
  return {
    id: mealLog.mealLogId,
    date: mealLog.eatenAt?.slice(0, 10) ?? null,
    mealType: mealLog.mealType,
    mealName: mealLog.menuName,
    imageUrl: mealLog.image?.url || FALLBACK_MEAL_IMAGE[mealLog.mealType] || breakfastImage,
    glucose: mealLog.postprandialGlucoseMgDl ?? null,
    carb: mealLog.carbsG,
    sugar: mealLog.sugarG,
    recipeId: mealLog.recipe?.recipeId ?? null,
  }
}

export const getMealLogsByDate = async (date) => {
  const response = await AxiosInstance.get('/api/meal-logs', {
    params: { date },
  })

  return {
    date: response.data?.date ?? date,
    meals: (response.data?.mealLogs ?? []).map(mapMealLog),
  }
}
