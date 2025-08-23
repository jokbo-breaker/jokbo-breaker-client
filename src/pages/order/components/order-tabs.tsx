import type { OrderTabKey } from '@/pages/order/constants/order';

type Tab = { key: OrderTabKey; label: string };

type Props = {
  tabs: readonly Tab[];
  active: OrderTabKey;
  onChange: (key: OrderTabKey) => void;
  topOffsetRem?: number;
  className?: string;
};

export default function OrderTabs({
  tabs,
  active,
  onChange,
  topOffsetRem = 4.8,
  className = '',
}: Props) {
  const topStyle = { top: `${topOffsetRem}rem` };

  return (
    <aside
      className={`sticky z-[var(--z-header)] bg-white ${className}`}
      style={topStyle}
    >
      <nav role="tablist" aria-label="주문 내역 탭">
        <div className="flex h-[4.8rem] items-center">
          {tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className="relative flex-1 cursor-pointer pb-[1.2rem] text-center"
                onClick={() => onChange(t.key)}
              >
                <span
                  className={`body2 ${isActive ? 'text-black' : 'text-gray-400'}`}
                >
                  {t.label}
                </span>
                {isActive && (
                  <span className="absolute right-0 bottom-0 left-0 h-[0.2rem] rounded-[999px] bg-black" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
