export const SECTION_KEYS = [
  'nearby',
  'new',
  'lastcall',
  'breakfast',
  'dessert',
  'now',
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

type SectionMeta = {
  title: string | { delivery: string; pickup: string };
};

export const SECTION_META: Record<SectionKey, SectionMeta> = {
  nearby: { title: '내 주변 상점을 둘러보세요' },
  new: { title: '새로 입점했어요' },
  lastcall: { title: '곧 품절이에요' },
  breakfast: { title: '아침 드실 시간이에요' },
  dessert: { title: '달달한 게 땡길 때' },
  now: {
    title: {
      delivery: '지금 바로 배달 받아보세요',
      pickup: '지금 바로 픽업할 수 있어요',
    },
  },
};
