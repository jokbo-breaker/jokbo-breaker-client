export type StepState = 'done' | 'current' | 'upcoming';

export const STEPPER_SIZE = {
  dot: '3.6rem',
  line: '0.2rem',
  gap: '2.4rem',
} as const;

export const STEPPER_COLOR = {
  dot: {
    current: 'bg-gray-900 text-white',
    upcoming: 'bg-gray-200 text-gray-900',
    done: 'bg-gray-900 text-white',
  },
  line: {
    active: 'bg-gray-200',
    inactive: 'bg-gray-800/30',
  },
  label: {
    default: 'text-gray-400',
    dim: 'text-gray-600',
  },
} as const;
