import { useState } from 'react';
import { cn } from '@/shared/libs/cn';
import Icon from '@/shared/components/icon';

type SplashProps = {
  onFinish?: () => void;
  fadeMs?: number;
  dismissible?: boolean;
};

export default function Splash({
  onFinish,
  fadeMs = 400,
  dismissible = true,
}: SplashProps) {
  const [leaving, setLeaving] = useState(false);

  const close = () => {
    if (leaving) return;
    setLeaving(true);
    const t = setTimeout(() => onFinish?.(), fadeMs);
    return () => clearTimeout(t);
  };

  return (
    <div className="fixed inset-0 z-[50]">
      <div
        role="status"
        aria-live="polite"
        onClick={dismissible ? close : undefined}
        className={cn(
          'bg-primary mx-auto grid h-full w-full max-w-[43rem] place-items-center select-none',
          leaving ? 'opacity-0' : 'opacity-100',
          'transition-opacity',
        )}
        style={{ transitionDuration: `${fadeMs}ms` }}
      >
        <Icon
          name="logo-title"
          width={18}
          height={3.6}
          className="text-white"
        />
      </div>
    </div>
  );
}
