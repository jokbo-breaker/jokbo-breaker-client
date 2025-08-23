import type { OnboardingIllustration } from './icons';

export const ONBOARDING_STEPS = [
  {
    id: 1,
    lines: [
      '기존 가격의 최대 80% 할인!',
      '매일 준비되는 시크릿 밀박스를 만나보세요',
    ],
    icon: 'onboarding1' as const,
    alt: '선물 상자 아이콘',
  },
  {
    id: 2,
    lines: ['환경을 지키는 잔반없는날과 함께', '환경 보호에 앞장 서세요'],
    icon: 'onboarding2' as const,
    alt: '새싹 아이콘',
  },
  {
    id: 3,
    lines: [
      '생활비 절약과 환경 보호를 동시에,',
      '잔반없는날의 여정에 동참하세요',
    ],
    icon: 'onboarding3' as const,
    alt: '지구 위의 소년과 음식 아이콘',
  },
] as const;

export const ONBOARDING_TOTAL = ONBOARDING_STEPS.length;
export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
