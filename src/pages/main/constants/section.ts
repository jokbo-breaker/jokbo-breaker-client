import { SECTION_META, type SectionKey } from '@/shared/constants/sections';
import type { Mode } from '@/pages/main/components/main-header';

export const MAIN_SECTIONS_ORDER = [
  'nearBy',
  'brandNew',
  'lowInStock',
  'mealTime',
  'sweet',
  'pickUpRightNow',
] as const;
export function getSectionTitle(key: SectionKey, mode: Mode): string {
  const t = SECTION_META[key].title;
  return typeof t === 'string' ? t : t[mode];
}

export const DEFAULT_LOCATION_LABEL = '서울시 동작구';
