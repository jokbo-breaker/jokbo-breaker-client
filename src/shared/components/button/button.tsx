import * as React from 'react';
import { cn } from '@/shared/libs/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'black' | 'white' | 'gray';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Button({
  variant = 'black',
  loading = false,
  leftIcon,
  rightIcon,
  className = 'w-full',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const base = 'flex-row-center select-none rounded-[10px] py-[1.6rem]';

  const variants = {
    black: 'bg-gray-900 text-white',
    white: 'bg-gray-100 text-gray-700',
    gray: 'bg-gray-900 text-white opacity-50',
  } as const;

  return (
    <button className={cn(base, variants[variant], className)} disabled={isDisabled} {...props}>
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span className="text-body3">{children}</span>
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </button>
  );
}
