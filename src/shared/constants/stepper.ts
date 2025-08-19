export type StepState = 'done' | 'current' | 'upcoming';

export const STEPPER_SIZE = {
  dot: '3.6rem',
  line: '0.2rem',
  gap: '2.4rem',
} as const;

export const STEPPER_COLOR = {
  dot: {
    current: 'bg-color-gray-900 text-color-white',
    upcoming: 'bg-color-gray-200 text-color-gray-900',
    done: 'bg-color-gray-900 text-color-white',
  },
  line: {
    active: 'bg-gray-200',
    inactive: 'bg-color-gray-800/30',
  },
  label: {
    default: 'text-color-gray-400',
    dim: 'text-color-gray-600',
  },
} as const;
