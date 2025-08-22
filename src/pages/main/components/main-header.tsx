import React from 'react';
import Icon from '@/shared/components/icon';

export type Mode = 'delivery' | 'pickup';

type HeaderProps = {
  mode?: Mode;
  defaultMode?: Mode;
  onModeChange?: (next: Mode) => void;
  rightSlot?: React.ReactNode;
  className?: string;
  scrollRoot?: HTMLElement | null;
};

function findScrollParent(el: HTMLElement | null): HTMLElement | null {
  let node: HTMLElement | null = el?.parentElement ?? null;
  while (node) {
    const s = getComputedStyle(node);
    const canScrollY = /(auto|scroll)/.test(s.overflowY);
    if (canScrollY && node.scrollHeight > node.clientHeight) return node;
    node = node.parentElement;
  }
  return null;
}

export default function Header({
  mode,
  defaultMode = 'delivery',
  onModeChange,
  rightSlot,
  className = '',
  scrollRoot,
}: HeaderProps) {
  const isControlled = mode !== undefined;
  const [internal, setInternal] = React.useState<Mode>(defaultMode);
  const current = isControlled ? (mode as Mode) : internal;

  const headerRef = React.useRef<HTMLElement | null>(null);

  const tabs: { key: Mode; label: string }[] = [
    { key: 'delivery', label: '배달' },
    { key: 'pickup', label: '픽업' },
  ];

  const getScrollRoot = () =>
    scrollRoot ??
    findScrollParent(headerRef.current) ??
    (document.scrollingElement as HTMLElement | null) ??
    document.documentElement;

  const scrollToTop = () => {
    const root = getScrollRoot() as any;
    if (typeof root?.scrollTo === 'function') {
      root.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (root as HTMLElement).scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleChange = (next: Mode) => {
    if (next !== current) scrollToTop();
    if (!isControlled) setInternal(next);
    onModeChange?.(next);
  };

  const handleLogoClick = () => {
    scrollToTop();
    if (current !== defaultMode) handleChange(defaultMode);
  };

  return (
    <header
      ref={headerRef}
      className={
        'sticky top-0 z-[var(--z-header)] bg-white px-[2rem] py-[0.2rem] ' +
        className
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1.6rem]">
          <button
            type="button"
            aria-label="홈으로"
            onClick={handleLogoClick}
            className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
          >
            <Icon className="text-primary" name="logo-title" width={7.8} />
          </button>

          <nav
            className="body1 flex items-center gap-[1.6rem]"
            role="tablist"
            aria-label="배송 방식 선택"
          >
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                role="tab"
                aria-selected={current === key}
                aria-controls={`tab-panel-${key}`}
                onClick={() => handleChange(key)}
                className={`relative cursor-pointer py-[0.55rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 ${
                  current === key ? 'text-black' : 'text-gray-400'
                }`}
              >
                {label}
                {current === key && (
                  <span className="pointer-events-none absolute inset-x-0 -bottom-[0.3rem] mx-auto h-[0.2rem] w-full rounded-full bg-black" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex h-[2.4rem] items-center gap-[1rem]">
          {rightSlot ?? (
            <button aria-label="검색" className="cursor-pointer text-black">
              <Icon name="search" width={2.4} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
