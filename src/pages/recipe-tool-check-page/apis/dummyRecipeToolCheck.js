// 레시피 도구재료 확인 페이지 더미 데이터
// 추후 API 연동 시 실제 응답 데이터로 교체 예정
// DUMMY_INGREDIENT_CHECKLIST의 hasSubstitute는 재료 대체 페이지(RecipeSubstitutePage)에서
// 수락/직접입력된 재료인지 여부를 서버가 내려주는 값으로 채워질 예정.
// saveRecipeSubstitution API에서 저장한 recipeId 기준으로 이 페이지 진입 시 함께 조회하는 구조

export const DUMMY_RECIPE_SUMMARY = {
  title: '두부 닭가슴살 덮밥',
  description: '20분 · 520 kcal · 단백질 38g',
  tags: ['저당 조정', '나트륨 낮춤'],
}

export const DUMMY_TOOLS = [
  { id: 1, name: '프라이팬' },
  { id: 2, name: '뒤집개' },
  { id: 3, name: '계량스푼' },
]

export const DUMMY_INGREDIENT_CHECKLIST = [
  { id: 1, name: '현미밥', amount: '150g', isChecked: true },
  { id: 2, name: '닭가슴살', amount: '120g', isChecked: true },
  { id: 3, name: '두부', amount: '100g', isChecked: true },
  { id: 4, name: '양배추', amount: '60g', isChecked: true },
  { id: 5, name: '진간장', amount: '진간장 ½T', isChecked: false, hasSubstitute: true },
]
