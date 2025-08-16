import React from 'react';
import Icon from '@/shared/components/icon';

type TopBarProps = {
  title?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  showClose?: boolean;
  onClose?: () => void;
  className?: string;
  sticky?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export default function TopBar({
  title,
  showBack = false,
  onBack,
  showClose = false,
  onClose,
  className = '',
  sticky,
  leftSlot,
  rightSlot,
}: TopBarProps) {
  return (
    <header
      className={[
        'w-full bg-white',
        'px-[0.8rem]',
        'h-[4.4rem]',
        'grid items-center',
        'grid-cols-[4.4rem_1fr_4.4rem]',
        sticky ? 'sticky top-0 z-[var(--z-header)]' : '',
        className,
      ].join(' ')}
      role="banner"
    >
      <div className="justify-self-start">
        {leftSlot ??
          (showBack ? (
            <button
              type="button"
              aria-label="뒤로가기"
              onClick={onBack}
              className="text-black"
            >
              <Icon name="back" size={4.4} ariaHidden />
            </button>
          ) : (
            <span aria-hidden className="block w-[4.4rem]" />
          ))}
      </div>

      <h1 className="text-body3 truncate text-center text-gray-900">{title}</h1>

      <div className="justify-self-end">
        {rightSlot ??
          (showClose ? (
            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="text-gray-500"
            >
              <Icon name="x-icon" size={4.4} ariaHidden />
            </button>
          ) : (
            <span aria-hidden className="block w-[4.4rem]" />
          ))}
      </div>
    </header>
  );
}
