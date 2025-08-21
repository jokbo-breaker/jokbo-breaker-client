export type FoodType = 'meal' | 'dessert';
export type Receive = 'delivery' | 'pickup' | 'now' | 'later';

export type FilterState = {
  foodType: '' | FoodType;
  categories: string[];
  priceMax: '' | '4k' | '6k' | '8k' | '10k' | '12k' | '12kPlus';
  receive: Receive[];
};

export const FILTER_DEFAULT: FilterState = {
  foodType: '',
  categories: [],
  priceMax: '',
  receive: [],
};

export const FOOD_TYPE_OPTIONS = [
  { value: 'meal' as const, label: '식사' },
  { value: 'dessert' as const, label: '디저트' },
];

export const CATEGORY_OPTIONS = [
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
];

export const PRICE_OPTIONS: {
  value: FilterState['priceMax'];
  label: string;
}[] = [
  { value: '4k', label: '4,000원 이하' },
  { value: '6k', label: '6,000원 이하' },
  { value: '8k', label: '8,000원 이하' },
  { value: '10k', label: '10,000원 이하' },
  { value: '12k', label: '12,000원 이하' },
  { value: '12kPlus', label: '12,000원 이상' },
];

export const RECEIVE_OPTIONS: { value: Receive; label: string }[] = [
  { value: 'delivery', label: '배달' },
  { value: 'pickup', label: '픽업' },
  { value: 'now', label: '지금 바로' },
  { value: 'later', label: '나중에' },
];
