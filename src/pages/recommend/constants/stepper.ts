export type StepState = 'done' | 'current' | 'upcoming';

export const STEPPER_SIZE = {
  dot: '2rem',
  line: '0.2rem',
  gap: '2.4rem',
} as const;

export const STEPPER_COLOR = {
  dot: {
    current: 'bg-gray-900 text-white',
    upcoming: 'bg-gray-200 text-white',
    done: 'bg-gray-900 text-white',
  },
  line: {
    active: 'bg-black',
    inactive: 'bg-gray-800/30',
  },
  label: {
    default: 'text-gray-400',
    dim: 'text-gray-600',
  },
} as const;
