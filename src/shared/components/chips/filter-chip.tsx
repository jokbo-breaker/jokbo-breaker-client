import * as React from 'react';
import { cn } from '@/shared/libs/cn';
import Icon from '@/shared/components/icon';

type FilterChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  label?: string;
};

export default function FilterChip({
  selected = false,
  label = '필터',
  className,
  ...props
}: FilterChipProps) {
  const base =
    'flex-items-center cursor-pointer gap-[0.8rem] rounded-full px-[1rem] py-[0.35rem] body4';
  const off = 'bg-white text-black ring-1 ring-gray-300';
  const on = 'bg-secondary text-primary ring-1 ring-primary';

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(base, selected ? on : off, className)}
      {...props}
    >
      <span className="body4">{label}</span>
      <Icon
        name="filter"
        size={2.4}
        ariaHidden
        className={selected ? 'text-primary' : 'text-gray-600'}
      />
    </button>
  );
}
