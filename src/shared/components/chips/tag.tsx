import * as React from 'react';
import { cn } from '@/shared/libs/cn';

type TagProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Tag({
  selected = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: TagProps) {
  const base = 'flex-items-center rounded-full px-[1.2rem] py-[0.5rem] cursor-pointer body3';
  const off = 'bg-white text-black ring-1 ring-gray-300';
  const on = 'bg-secondary text-primary ring-1 ring-primary';

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(base, selected ? on : off, className)}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="body3">{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
