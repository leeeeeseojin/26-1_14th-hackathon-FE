// 개인화 제안 페이지 더미 데이터
// 추후 API 연동 시 실제 응답 데이터로 교체 예정

export const DUMMY_SUGGESTION = {
  reason: '고단백질 위주 수정안',
  title: '닭가슴살 계란 볶음밥',
  description: '조리 약 20분 · 재료 10가지',
}

export const DUMMY_NUTRIENTS = [
  { id: 1, label: '칼로리', value: '380kcal', variant: 'calorie' },
  { id: 2, label: '탄수화물', value: '45g', variant: 'carb' },
  { id: 3, label: '단백질', value: '12g', variant: 'neutral' },
  { id: 4, label: '당류', value: '9g', variant: 'neutral' },
]

export const DUMMY_DETAIL_INGREDIENTS = [
  { id: 1, name: '쌀', amount: '180g' },
  { id: 2, name: '닭가슴살', amount: '100g' },
  { id: 3, name: '브로콜리', amount: '100g', previousAmount: '80g', badge: '수정됨' },
]

export const DUMMY_NUTRITION_CHANGE = [
  { id: 1, label: '열량', value: '420 kcal' },
  { id: 2, label: '탄수화물', oldValue: '45 g', newValue: '20 g', changeType: 'improved' },
  { id: 3, label: '당류', oldValue: '8 g', newValue: '5 g', changeType: 'improved' },
  { id: 4, label: '단백질', oldValue: '12 g', newValue: '50 g', changeType: 'improved' },
  { id: 5, label: '지방', oldValue: '9 g', newValue: '7 g', changeType: 'improved' },
  { id: 6, label: '나트륨', oldValue: '320 mg', newValue: '400 mg', changeType: 'caution' },
]

export const DUMMY_DETAIL_COOKING_STEPS = [
  { id: 1, description: '쌀을 깨끗이 씻어 30분간 불린다.' },
  { id: 2, description: '닭가슴살을 한입 크기로 썰어 밑간을 한다.' },
]
