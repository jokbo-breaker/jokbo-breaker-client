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

export default function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex-items-center gap-[1.2rem] rounded-[1.2rem] bg-gray-50 px-[1.2rem] py-[0.8rem]',
        className,
      )}
    >
      <button
        type="button"
        aria-label="수량 감소"
        className="cursor-pointer rounded-[0.8rem] bg-white p-[0.6rem] ring-1 ring-gray-200"
        onClick={() => onChange(clamp(value - 1, min, max))}
      >
        <Icon name="minus" size={2.4} ariaHidden />
      </button>
      <span className="body2 min-w-[3.2rem] text-center text-black">
        {value}
      </span>
      <button
        type="button"
        aria-label="수량 증가"
        className="cursor-pointer rounded-[0.8rem] bg-white p-[0.6rem] ring-1 ring-gray-200"
        onClick={() => onChange(clamp(value + 1, min, max))}
      >
        <Icon name="plus" size={2.4} ariaHidden />
      </button>
    </div>
  );
}
