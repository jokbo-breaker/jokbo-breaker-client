import { useMemo } from 'react';
import type { StepState } from '@/shared/constants/stepper';

export function useStepper(total: number, currentIndex1Based: number) {
  const current = Math.max(0, Math.min(total - 1, currentIndex1Based - 1));

  const states: StepState[] = useMemo(() => {
    return Array.from({ length: total }, (_, i) => {
      if (i < current) return 'done';
      if (i === current) return 'current';
      return 'upcoming';
    });
  }, [total, current]);

  const isConnectorActive = (betweenIndex: number) => betweenIndex < current;

  return { states, isConnectorActive, current };
}
