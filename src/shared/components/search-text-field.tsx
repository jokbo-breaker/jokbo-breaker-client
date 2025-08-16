import React, { useCallback, useRef, useState } from 'react';
import Icon from '@/shared/components/icon';

type Props = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onBack?: () => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  showBackButton?: boolean;
  showSearchIcon?: boolean;
  name?: string;
  id?: string;
};

export default function SearchTextField({
  value,
  defaultValue,
  onChange,
  onSubmit,
  onBack,
  onClear,
  placeholder = '검색어를 입력해주세요.',
  className = '',
  autoFocus,
  disabled,
  showBackButton = true,
  showSearchIcon = true,
  name,
  id,
}: Props) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue ?? '');
  const val = isControlled ? value! : inner;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInner(e.target.value);
      onChange?.(e.target.value);
    },
    [isControlled, onChange],
  );

  const handleClear = useCallback(() => {
    if (!isControlled) setInner('');
    onClear?.();
    inputRef.current?.focus();
  }, [isControlled, onClear]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit?.(val);
      }
      if (e.key === 'Escape' && val) {
        e.preventDefault();
        handleClear();
      }
    },
    [onSubmit, handleClear, val],
  );

  const onFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(val);
    },
    [onSubmit, val],
  );

  const inputClass =
    'flex-1 bg-transparent outline-none placeholder:text-gray-400 text-body2 text-gray-900';

  return (
    <form
      onSubmit={onFormSubmit}
      className={['w-full bg-white px-[1.6rem] py-[1rem]', className].join(' ')}
      role="search"
    >
      <div className="flex-row-center gap-[1.2rem]">
        {showBackButton && (
          <button
            type="button"
            onClick={onBack}
            aria-label="뒤로가기"
            className="place-items-center text-black"
            disabled={disabled}
          >
            <Icon name="arrow" size={2.4} ariaHidden className="text-black" />
          </button>
        )}

        <div
          className={[
            'flex-row-center w-full gap-[0.4rem]',
            'h-[4rem] rounded-[8px] bg-gray-50 px-[1.6rem]',
            'ring-1 ring-transparent',
            disabled ? 'opacity-60' : '',
          ].join(' ')}
        >
          {showSearchIcon && (
            <Icon
              name="search"
              size={2}
              ariaHidden
              className="shrink-0 text-gray-400"
            />
          )}

          <input
            ref={inputRef}
            id={id}
            name={name}
            type="text"
            inputMode="text"
            value={val}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            disabled={disabled}
            className={inputClass}
            aria-label="검색어"
          />

          {/* 클리어(X) — 값 있을 때만 */}
          {val?.length > 0 && (
            <button
              type="submit"
              onClick={handleClear}
              aria-label="입력 지우기"
              className="place-items-center"
            >
              <Icon
                className="text-gray-300"
                name="x-icon"
                size={2.4}
                ariaHidden
              />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
