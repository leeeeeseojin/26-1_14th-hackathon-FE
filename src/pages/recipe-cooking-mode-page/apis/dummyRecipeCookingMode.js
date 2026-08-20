// 조리 모드 화면 더미 데이터
// 추후 API 연동 시 실제 응답 데이터로 교체 예정

export const DUMMY_RECIPE_NAME = '두부 닭가슴살 덮밥'

export const DUMMY_COOKING_STEPS = [
  {
    id: 1,
    name: '재료 손질',
    title: '재료 손질하기',
    description: '두부와 닭가슴살을 한입 크기로 썰어주세요.',
    actions: ['두부 3cm 크기로 썰기', '닭가슴살 한입 크기로 썰기'],
    tip: '재료는 비슷한 크기로 썰어야 골고루 익어요.',
    durationMinutes: 5,
  },
  {
    id: 2,
    name: '양념',
    title: '양념장 만들기',
    description: '작은 볼에 간장, 참기름, 다진 마늘을 넣고\n재료가 고르게 섞이도록 저어주세요.',
    actions: ['간장 ½T 넣기', '참기름 ½T + 다진 마늘 ½T 넣기', '숟가락으로 10초 정도 섞기'],
    tip: '간장은 먼저 많이 넣지 말고, 부족하면 마지막에 조금 더 넣어요.',
    durationMinutes: 3,
  },
  {
    id: 3,
    name: '굽기',
    title: '닭가슴살 굽기',
    description: '팬을 예열한 뒤 앞뒤로 익혀요.',
    actions: ['팬에 기름 두르기', '중불에서 앞뒤로 3분씩 굽기'],
    tip: '팬이 충분히 달궈진 후 재료를 올려야 눌어붙지 않아요.',
    durationMinutes: 6,
  },
  {
    id: 4,
    name: '볶기',
    title: '재료 함께 볶기',
    description: '구운 닭가슴살과 두부, 채소를 넣고 볶아요.',
    actions: ['채소 먼저 볶기', '양념장 넣고 골고루 섞기'],
    tip: '센 불에서 짧게 볶아야 채소가 아삭해요.',
    durationMinutes: 4,
  },
  {
    id: 5,
    name: '완성',
    title: '그릇에 담아 완성하기',
    description: '현미밥 위에 올려 완성해요.',
    actions: ['현미밥 담기', '볶은 재료 올리기'],
    tip: '기호에 따라 깨를 뿌리면 풍미가 좋아져요.',
    durationMinutes: 1,
  },
]
