import * as React from 'react';
import Icon from '@/shared/components/icon';
import { cn } from '@/shared/libs/cn';
import { clamp } from '@/pages/main/checkout/utils/checkout';

type Props = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export default function QtyStepper({ value, onChange, min = 1, max = 99, className }: Props) {
  const canDec = value > min;
  const canInc = value < max;

  return (
    <div
      className={cn(
        'flex-items-center h-[4rem] w-[10rem] justify-between',
        'gap-[1rem] rounded-[0.4rem] bg-gray-100 px-[1rem]',
        className,
      )}
    >
      <button
        type="button"
        aria-label="수량 감소"
        onClick={() => canDec && onChange(clamp(value - 1, min, max))}
        disabled={!canDec}
        className={cn(
          'grid h-[1.6rem] w-[1.6rem] place-items-center',
          canDec ? 'cursor-pointer text-gray-600' : 'cursor-not-allowed text-gray-300',
        )}
      >
        <Icon name="minus" size={1.6} ariaHidden />
      </button>

      <span
        className={cn(
          'body2 grid h-[2.8rem] min-w-[2.8rem] place-items-center',
          'rounded-[0.4rem] bg-white text-black',
        )}
      >
        {value}
      </span>

      <button
        type="button"
        aria-label="수량 증가"
        onClick={() => canInc && onChange(clamp(value + 1, min, max))}
        disabled={!canInc}
        className={cn(
          'grid h-[1.6rem] w-[1.6rem] place-items-center',
          canInc ? 'cursor-pointer text-gray-600' : 'cursor-not-allowed text-gray-300',
        )}
      >
        <Icon name="plus" size={1.6} ariaHidden />
      </button>
    </div>
  );
}
