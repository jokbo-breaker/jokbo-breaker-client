import React from 'react';
import Icon from '@/shared/components/icon';

function Header() {
  const [tab, setTab] = React.useState<'delivery' | 'pickup'>('delivery');

  return (
    <header className="sticky top-0 z-[var(--z-header)] bg-white px-[2rem] py-[0.2rem]">
      <div className="flex items-center justify-between">
        <nav className="text-body1 flex gap-[1.6rem]">
          {[
            { key: 'delivery' as const, label: '배달' },
            { key: 'pickup' as const, label: '픽업' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative py-[0.6rem] ${
                tab === key ? 'text-black' : 'text-gray-400'
              }`}
            >
              {label}
              {tab === key && (
                <span className="absolute inset-x-0 -bottom-px mx-auto h-[2px] w-full rounded-full bg-black" />
              )}
            </button>
          ))}
        </nav>
        <button aria-label="검색" className="text-black">
          <Icon name="search" width={2.4} />
        </button>
      </div>
    </header>
  );
}

export default Header;
