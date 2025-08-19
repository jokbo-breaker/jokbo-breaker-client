export const FOOD_OPTIONS = [
  '일식',
  '한식',
  '중식',
  '양식',
  '빵',
  '디저트',
  '스페인 요리',
  '멕시코 요리',
  '패스트 푸드',
  '건강식',
  '비건',
  '할랄',
  '인도 음식',
  '직접 입력',
] as const;
export type FoodOption = (typeof FOOD_OPTIONS)[number];

export const METHOD_OPTIONS = [
  { id: 'none', label: '배달 / 매장 직접 수령 없어요' },
  { id: 'delivery', label: '배달만' },
  { id: 'pickup', label: '픽업만' },
] as const;
export type MethodId = (typeof METHOD_OPTIONS)[number]['id'];

export const BUDGET = {
  min: 0,
  max: 100000,
  step: 500, // 0.5만 원
} as const;
