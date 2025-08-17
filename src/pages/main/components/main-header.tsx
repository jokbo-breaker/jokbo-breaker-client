import React from 'react';
import Icon from '@/shared/components/icon';

export type Mode = 'delivery' | 'pickup';

type HeaderProps = {
  mode?: Mode;
  defaultMode?: Mode;
  onModeChange?: (next: Mode) => void;
  rightSlot?: React.ReactNode;
  className?: string;
};

export default function Header({
  mode,
  defaultMode = 'delivery',
  onModeChange,
  rightSlot,
  className = '',
}: HeaderProps) {
  const isControlled = mode !== undefined;
  const [internal, setInternal] = React.useState<Mode>(defaultMode);
  const current = isControlled ? (mode as Mode) : internal;

  const tabs: { key: Mode; label: string }[] = [
    { key: 'delivery', label: '배달' },
    { key: 'pickup', label: '픽업' },
  ];

  const handleChange = (next: Mode) => {
    if (!isControlled) setInternal(next);
    onModeChange?.(next);
  };

  return (
    <header
      className={'sticky top-0 z-[var(--z-header)] bg-white px-[2rem] py-[0.2rem] ' + className}
    >
      <div className="flex items-center justify-between">
        <nav className="text-body1 flex gap-[1.6rem]" role="tablist" aria-label="배송 방식 선택">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={current === key}
              aria-controls={`tab-panel-${key}`}
              onClick={() => handleChange(key)}
              className={`relative py-[0.6rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 ${
                current === key ? 'text-black' : 'text-gray-400'
              }`}
            >
              {label}
              {current === key && (
                <span className="absolute inset-x-0 -bottom-px mx-auto h-[2px] w-full rounded-full bg-black" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center">
          {rightSlot ?? (
            <button aria-label="검색" className="text-black">
              <Icon name="search" width={2.4} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
