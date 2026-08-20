// 레시피 저장 리스트 더미 데이터
// 추후 API 연동 시 getRecipeSavedList 내부만 실제 응답으로 교체

export const RECIPE_STATUS = {
  ORIGINAL: 'ORIGINAL',
  COMPLETED: 'COMPLETED',
}

export const SOURCE_TYPE = {
  LINK: 'link',
  IMAGE: 'image',
  TEXT: 'text',
}

export const SOURCE_TYPE_LABEL = {
  link: '링크 공유',
  image: '이미지',
  text: '텍스트',
}

const DUMMY_RECIPE_SAVED_LIST = [
  {
    id: 'original-1',
    title: '계란 볶음밥',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 20,
    calories: 380,
    status: RECIPE_STATUS.ORIGINAL,
  },
  {
    id: 'original-2',
    title: '오트밀 볼',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 10,
    calories: 240,
    status: RECIPE_STATUS.ORIGINAL,
  },
  {
    id: 'original-3',
    title: '그릭요거트 샐러드',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 15,
    calories: 310,
    status: RECIPE_STATUS.ORIGINAL,
  },
  {
    id: 'original-4',
    title: '두부조림',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.IMAGE,
    cookTime: 25,
    calories: 280,
    status: RECIPE_STATUS.ORIGINAL,
  },
  {
    id: 'original-5',
    title: '통밀빵 샌드위치',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 12,
    calories: 350,
    status: RECIPE_STATUS.ORIGINAL,
  },
  {
    id: 'original-6',
    title: '잡곡밥 나물 한상',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.TEXT,
    cookTime: 30,
    calories: 420,
    status: RECIPE_STATUS.ORIGINAL,
  },
  {
    id: 'original-7',
    title: '닭가슴살 샐러드',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.IMAGE,
    cookTime: 18,
    calories: 290,
    status: RECIPE_STATUS.ORIGINAL,
  },
  {
    id: 'original-8',
    title: '계란 야채죽',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 22,
    calories: 260,
    status: RECIPE_STATUS.ORIGINAL,
  },
  {
    id: 'completed-1',
    title: '저당 계란 볶음밥',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 20,
    calories: 320,
    status: RECIPE_STATUS.COMPLETED,
  },
  {
    id: 'completed-2',
    title: '혈당케어 오트밀',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 10,
    calories: 210,
    status: RECIPE_STATUS.COMPLETED,
  },
  {
    id: 'completed-3',
    title: '저당 그릭요거트 샐러드',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 15,
    calories: 280,
    status: RECIPE_STATUS.COMPLETED,
  },
  {
    id: 'completed-4',
    title: '저염 두부조림',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.IMAGE,
    cookTime: 25,
    calories: 250,
    status: RECIPE_STATUS.COMPLETED,
  },
  {
    id: 'completed-5',
    title: '통밀빵 닭가슴살 샌드위치',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 12,
    calories: 330,
    status: RECIPE_STATUS.COMPLETED,
  },
  {
    id: 'completed-6',
    title: '잡곡밥 나물 한상',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.TEXT,
    cookTime: 30,
    calories: 380,
    status: RECIPE_STATUS.COMPLETED,
  },
  {
    id: 'completed-7',
    title: '닭가슴살 샐러드',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.IMAGE,
    cookTime: 18,
    calories: 270,
    status: RECIPE_STATUS.COMPLETED,
  },
  {
    id: 'completed-8',
    title: '계란 야채죽',
    thumbnailUrl: null,
    sourceType: SOURCE_TYPE.LINK,
    cookTime: 22,
    calories: 230,
    status: RECIPE_STATUS.COMPLETED,
  },
]

export const getRecipeSavedList = async () => {
  return {
    items: DUMMY_RECIPE_SAVED_LIST,
  }
}
