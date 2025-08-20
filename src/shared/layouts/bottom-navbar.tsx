import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '@/shared/components/icon';
import { cn } from '@/shared/libs/cn';
import * as React from 'react';

type NavItem = {
  label: string;
  path: string;
  icon: { filled: string; lined: string };
};

type Props = {
  items?: NavItem[];
  activeMatch?: 'exact' | 'segment';
  isDisabled?: (path: string) => boolean;
  onTabClick?: (path: string, ev: React.MouseEvent<HTMLButtonElement>) => void;
};

const DEFAULT_ITEMS: NavItem[] = [
  { label: '홈', path: '/', icon: { filled: 'home-filled', lined: 'home' } },
  {
    label: '메뉴',
    path: '/menu',
    icon: { filled: 'bag-filled', lined: 'bag' },
  },
  {
    label: '주문내역',
    path: '/orders',
    icon: { filled: 'order-filled', lined: 'order' },
  },
  {
    label: '마이페이지',
    path: '/mypage',
    icon: { filled: 'profile-filled', lined: 'profile' },
  },
];

function normalizePath(p: string) {
  if (!p) return '/';
  if (p === '/') return '/';
  return p.replace(/\/+$/g, '');
}

export default function BottomNavigation({
  items = DEFAULT_ITEMS,
  activeMatch = 'segment',
  isDisabled,
  onTabClick,
}: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const current = normalizePath(pathname);

  const isActive = React.useCallback(
    (path: string) => {
      const target = normalizePath(path);
      if (activeMatch === 'exact') return current === target;
      if (target === '/') return current === '/';
      return current === target || current.startsWith(`${target}/`);
    },
    [current, activeMatch],
  );

  const handleClick =
    (path: string) => (ev: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled?.(path)) return;
      if (onTabClick) onTabClick(path, ev);
      else navigate(path);
    };

  return (
    <div
      className="shadow-2 sticky bottom-0 z-[var(--z-bottom-nav)] grid w-full border-t border-gray-200 bg-white px-[1.6rem] py-[0.8rem]"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map(({ label, path, icon }) => {
        const active = isActive(path);
        const disabled = !!isDisabled?.(path);
        return (
          <button
            key={`${label}-${path}`}
            type="button"
            aria-current={active ? 'page' : undefined}
            aria-disabled={disabled || undefined}
            disabled={disabled}
            className={cn(
              'w-full flex-col items-center justify-center gap-[0.2rem] py-[0.8rem]',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            onClick={handleClick(path)}
          >
            <Icon
              name={active ? icon.filled : icon.lined}
              width={2.4}
              height={2.4}
              className={cn('text-gray-400', active && 'text-primary')}
            />
            <p
              className={cn('caption4 text-gray-400', active && 'text-primary')}
            >
              {label}
            </p>
          </button>
        );
      })}
    </div>
  );
}
