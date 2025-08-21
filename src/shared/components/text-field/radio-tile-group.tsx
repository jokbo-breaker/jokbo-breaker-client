import * as React from 'react';
import { cn } from '@/shared/libs/cn';

type Option<T extends string> = {
  value: T;
  label: React.ReactNode;
  right?: React.ReactNode;
  disabled?: boolean;
  below?: React.ReactNode;
};

type Props<T extends string> = {
  name?: string;
  value: '' | T;
  onChange: (v: T) => void;
  options: Option<T>[];
  className?: string;
  rounded?: string;
};

export default function RadioTileGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  className = 'flex-col',
  rounded = 'rounded-[0.4rem]',
}: Props<T>) {
  const uid = React.useId();
  const groupName = name ?? `rtg-${uid}`;

  return (
    <div className={cn('w-full gap-[1.2rem]', className)}>
      {options.map((opt) => {
        const id = `${groupName}-${opt.value}`;
        const checked = value === opt.value;
        return (
          <label key={opt.value} htmlFor={id} className="block cursor-pointer">
            <input
              id={id}
              type="radio"
              name={groupName}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              disabled={opt.disabled}
              className="peer sr-only"
            />

            <div
              className={cn(
                'flex items-center justify-between border p-[1.6rem] transition-colors',
                'border-gray-200 bg-white',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200',
                'peer-checked:bg-secondary peer-checked:border-primary peer-checked:[&>span:first-child]:text-primary',
                opt.disabled && 'pointer-events-none opacity-60',
                rounded,
              )}
            >
              <span
                className={cn('body3 text-black', 'peer-checked:text-primary')}
              >
                {opt.label}
              </span>

              {opt.right && (
                <span
                  className={cn(
                    'body4 text-black',
                    'peer-checked:text-primary',
                  )}
                >
                  {opt.right}
                </span>
              )}
            </div>

            {opt.below ? <div className="mt-[0.5rem]">{opt.below}</div> : null}
          </label>
        );
      })}
    </div>
  );
}
