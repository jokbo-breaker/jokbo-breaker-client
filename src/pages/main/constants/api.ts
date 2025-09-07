import type { DiscoverResponse } from '@/shared/apis/discover/discover';
import { SectionKey } from '@/shared/constants/sections';

type ApiSectionKey = keyof Pick<
  DiscoverResponse,
  'nearBy' | 'brandNew' | 'lowInStock' | 'mealTime' | 'sweet' | 'pickUpRightNow'
>;

export const UI_TO_API: Record<SectionKey, ApiSectionKey> = {
  nearby: 'nearBy',
  new: 'brandNew',
  lastcall: 'lowInStock',
  breakfast: 'mealTime',
  dessert: 'sweet',
  now: 'pickUpRightNow',
};
