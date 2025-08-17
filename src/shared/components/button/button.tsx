import * as React from 'react';
import { cn } from '@/shared/libs/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'md';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  className = 'w-full',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const base =
    'inline-flex items-center justify-center select-none rounded-[10px] text-body3 gap-[1rem] ';

  const sizes = {
    md: 'h-[5rem] px-4',
  } as const;

  const variants = {
    primary: 'bg-gray-900 text-white',
    secondary: 'bg-gray-100 text-gray-700',
  } as const;

  const disabledCls = 'opacity-50 pointer-events-none';

  return (
    <button
      className={cn(
        base,
        sizes[size],
        variants[variant],
        isDisabled && disabledCls,
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </button>
  );
}
