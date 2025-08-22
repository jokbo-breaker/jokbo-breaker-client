import { useEffect, useState } from 'react';
import { cn } from '@/shared/libs/cn';
import Icon from '@/shared/components/icon';

type Props = {
  onFinish?: () => void;
  fadeMs?: number;
  dismissible?: boolean;
};

export default function Splash({
  onFinish,
  fadeMs = 400,
  dismissible = true,
}: Props) {
  const [leaving, setLeaving] = useState(false);

  const close = () => {
    if (leaving) return;
    setLeaving(true);
    const t = setTimeout(() => onFinish?.(), fadeMs);
    return () => clearTimeout(t);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={dismissible ? close : undefined}
      className={cn(
        'flex-col-center fixed inset-0 z-[999] gap-[1.2rem]',
        'bg-primary text-black select-none',
        leaving
          ? 'opacity-0 transition-opacity duration-[400ms]'
          : 'opacity-100',
      )}
      style={{ transitionDuration: `${fadeMs}ms` }}
    >
      <Icon name="logo-title" width={12} height={2.6} className="text-white" />
    </div>
  );
}
