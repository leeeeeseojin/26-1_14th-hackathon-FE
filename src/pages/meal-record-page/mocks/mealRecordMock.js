import breakfastImage from '../../../assets/dummy/meal-breakfast.png'
import lunchImage from '../../../assets/dummy/meal-lunch.png'
import dinnerImage from '../../../assets/dummy/meal-dinner.png'

export const MEAL_TYPE = {
  BREAKFAST: 'BREAKFAST',
  LUNCH: 'LUNCH',
  DINNER: 'DINNER',
}

export const MEAL_TYPE_LABEL = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
}

export const MEAL_TYPE_ORDER = {
  BREAKFAST: 0,
  LUNCH: 1,
  DINNER: 2,
}

const DUMMY_MEAL_RECORD = {
  currentMonth: '2026-07',
  selectedDate: '2026-07-15',
  completedDates: [
    '2026-07-01',
    '2026-07-02',
    '2026-07-04',
    '2026-07-05',
    '2026-07-07',
    '2026-07-08',
    '2026-07-10',
    '2026-07-11',
    '2026-07-12',
    '2026-07-13',
    '2026-07-14',
    '2026-07-15',
  ],
  recordRate: 86,
  changeFromLastWeek: 12,
  coachTitle: '차곡차곡 기록되고 있어요.',
  coachSubtitle: '15일은 저녁 기록만 채우면 돼요.',
  meals: [
    {
      id: 'meal-2026-07-15-breakfast',
      date: '2026-07-15',
      mealType: MEAL_TYPE.BREAKFAST,
      mealName: '오트밀·삶은달걀·과일',
      imageUrl: breakfastImage,
      glucose: 109,
      carb: 48,
      sugar: 12,
      recipeId: 'original-1',
    },
    {
      id: 'meal-2026-07-15-lunch',
      date: '2026-07-15',
      mealType: MEAL_TYPE.LUNCH,
      mealName: '샐러드·통밀빵·그릭요거트',
      imageUrl: lunchImage,
      glucose: 104,
      carb: 42,
      sugar: 9,
      recipeId: 'original-2',
    },
    {
      id: 'meal-2026-07-15-dinner',
      date: '2026-07-15',
      mealType: MEAL_TYPE.DINNER,
      mealName: '잡곡밥·두부조림·나물',
      imageUrl: dinnerImage,
      glucose: 118,
      carb: 55,
      sugar: 5,
      recipeId: 'original-3',
    },
    {
      id: 'meal-2026-07-14-breakfast',
      date: '2026-07-14',
      mealType: MEAL_TYPE.BREAKFAST,
      mealName: '오트밀·삶은달걀·과일',
      imageUrl: breakfastImage,
      glucose: 112,
      carb: 46,
      sugar: 10,
      recipeId: 'original-1',
    },
    {
      id: 'meal-2026-07-14-lunch',
      date: '2026-07-14',
      mealType: MEAL_TYPE.LUNCH,
      mealName: '샐러드·통밀빵·그릭요거트',
      imageUrl: lunchImage,
      glucose: 108,
      carb: 40,
      sugar: 8,
      recipeId: null,
    },
  ],
}

export const getMealRecord = async () => {
  return DUMMY_MEAL_RECORD
}
