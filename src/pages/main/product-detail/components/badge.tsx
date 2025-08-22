import * as React from 'react';
import { cn } from '@/shared/libs/cn';

type BadgeProps = {
  as?: 'span' | 'div' | 'button';
  className?: string;
  children: React.ReactNode;
  tone?: 'primary' | 'neutral';
};

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ as = 'span', className, children, tone = 'primary', ...rest }, ref) => {
    const Comp = as as any;
    return (
      <Comp
        ref={ref}
        {...rest}
        className={cn(
          'caption2 flex items-center rounded-[4px] px-[0.6rem] py-[0.3rem] whitespace-nowrap select-none',
          tone === 'primary' && 'text-primary bg-gray-100',
          tone === 'neutral' && 'bg-gray-100 text-gray-700',
          className,
        )}
      >
        <span className="caption3">{children}</span>
      </Comp>
    );
  },
);

Badge.displayName = 'Badge';
export default Badge;
