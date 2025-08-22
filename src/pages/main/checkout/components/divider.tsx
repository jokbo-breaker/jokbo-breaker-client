import { DIVIDER_BASE } from '@/pages/main/constants/divider';
import { forwardRef, memo, HTMLAttributes } from 'react';
import { cn } from '@/shared/libs/cn';

type Props = HTMLAttributes<HTMLDivElement>;

const Divider = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(DIVIDER_BASE, className)}
        {...props}
      />
    );
  },
);
Divider.displayName = 'Divider';

export default memo(Divider);
