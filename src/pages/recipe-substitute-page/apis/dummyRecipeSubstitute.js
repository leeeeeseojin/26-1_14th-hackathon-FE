// 재료 대체 페이지 더미 데이터
// 추후 API 연동 시 실제 응답 데이터로 교체 예정

export const DUMMY_SUGGESTION = {
  reason: '고단백질 위주 수정안',
  title: '닭가슴살 계란 볶음밥',
  description: '조리 약 20분 · 재료 10가지',
}

export const DUMMY_INGREDIENTS = [
  { id: 1, name: '쌀' },
  { id: 2, name: '닭가슴살' },
  { id: 3, name: '계란' },
  { id: 4, name: '설탕' },
  { id: 5, name: '당근' },
  { id: 6, name: '쪽파' },
  { id: 7, name: '간장' },
  { id: 8, name: '브로콜리' },
  { id: 9, name: '올리브오일' },
  { id: 10, name: '깨' },
]

export const DUMMY_NUTRITION_CHANGE = [
  { id: 1, label: '열량', value: '420 kcal' },
  { id: 2, label: '탄수화물', oldValue: '45 g', newValue: '20 g', changeType: 'improved' },
  { id: 3, label: '당류', oldValue: '8 g', newValue: '5 g', changeType: 'improved' },
  { id: 4, label: '단백질', oldValue: '12 g', newValue: '50 g', changeType: 'improved' },
  { id: 5, label: '지방', oldValue: '9 g', newValue: '7 g', changeType: 'improved' },
  { id: 6, label: '나트륨', oldValue: '320 mg', newValue: '400 mg', changeType: 'caution' },
]

export const DUMMY_SUBSTITUTIONS = {
  4: {
    title: '설탕 1T → 올리고당 1T',
    reason: '추천 이유: 단맛 유사, 혈당 영향 낮음',
    tags: [
      { label: '탄수화물 2g', variant: 'carb' },
      { label: '당류 0g', variant: 'sugar' },
      { label: '혈당 영향 낮음 (참고용)', variant: 'neutral' },
    ],
  },
  8: {
    title: '브로콜리 100g → 파프리카 100g',
    reason: '추천 이유: 영양 유사, 혈당 영향 낮음',
    tags: [
      { label: '탄수화물 2g', variant: 'carb' },
      { label: '당류 0g', variant: 'sugar' },
      { label: '혈당 영향 낮음 (참고용)', variant: 'neutral' },
    ],
  },
  10: {
    title: '깨 1T → 들깨 1T',
    reason: '추천 이유: 풍미 유사, 혈당 영향 낮음',
    tags: [
      { label: '탄수화물 2g', variant: 'carb' },
      { label: '당류 0g', variant: 'sugar' },
      { label: '혈당 영향 낮음 (참고용)', variant: 'neutral' },
    ],
  },
}

// 재료 대체 결과 저장
// 추후 실제 API 연동 시 fetch/axios로 교체
// { recipeId, substitutions: [{ ingredientId, action: 'accept'|'reject'|'custom', customValue? }] }
export const saveRecipeSubstitution = async (payload) => {
  console.log('저장 요청(더미):', payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, recipeId: 'dummy-recipe-id' })
    }, 300)
  })
}
