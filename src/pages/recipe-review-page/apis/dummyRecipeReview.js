// 레시피 검토 페이지 더미 데이터
// 추후 API 연동 시 실제 응답 데이터로 교체 예정

export const DUMMY_RECIPE = {
  title: '계란 볶음밥',
  description: '조리 약 20분 · 재료 10가지',
}

export const DUMMY_NUTRIENTS = [
  { id: 1, label: '칼로리', value: '380kcal', variant: 'calorie' },
  { id: 2, label: '탄수화물', value: '45g', variant: 'carb' },
  { id: 3, label: '단백질', value: '12g', variant: 'neutral' },
  { id: 4, label: '당류', value: '9g', variant: 'neutral' },
]

export const DUMMY_INGREDIENTS = [
  { id: 1, name: '쌀', amount: '180g' },
  { id: 2, name: '닭가슴살', amount: '100g' },
  { id: 3, name: '브로콜리', amount: '80g' },
  { id: 4, name: '당근', amount: '50g' },
  { id: 5, name: '올리브오일', amount: '1T' },
  { id: 6, name: '마늘', amount: '2쪽' },
  { id: 7, name: '소금', amount: '약간' },
]

export const VISIBLE_INGREDIENT_COUNT = 3

export const DUMMY_NUTRITION_TABLE = [
  { id: 1, name: '열량', amount: '380 kcal' },
  { id: 2, name: '탄수화물', amount: '45 g' },
  { id: 3, name: '당류', amount: '8 g' },
  { id: 4, name: '단백질', amount: '12 g' },
  { id: 5, name: '지방', amount: '9 g' },
  { id: 6, name: '나트륨', amount: '320 mg' },
]

export const DUMMY_COOKING_STEPS = [
  { id: 1, description: '쌀을 깨끗이 씻어 30분간 불린다.' },
  { id: 2, description: '닭가슴살을 한입 크기로 썰어 밑간을 한다.' },
]
