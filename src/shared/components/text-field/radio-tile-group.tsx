import React from 'react';
import { cn } from '@/shared/libs/cn';

type Option = {
  value: string;
  label: React.ReactNode;
  right?: React.ReactNode;
  disabled?: boolean;
};

type Props = {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  className?: string;
};

export default function RadioTileGroup({
  name,
  value,
  onChange,
  options,
  className,
}: Props) {
  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className="relative block cursor-pointer"
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              disabled={opt.disabled}
              className="peer sr-only"
            />

            <div
              className={cn(
                'flex items-center justify-between rounded-[4px] border p-[1.6rem] transition-colors',
                'border-gray-200 bg-white',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200',
                'peer-checked:bg-secondary peer-checked:border-primary peer-checked:[&>span:first-child]:text-primary',
                opt.disabled && 'pointer-events-none opacity-60',
              )}
            >
              <span
                className={cn(
                  'text-body3 text-black',
                  'text-body3 peer-checked:text-primary',
                )}
              >
                {opt.label}
              </span>

              {opt.right && (
                <span
                  className={cn(
                    'text-body4 text-black',
                    'text-body4 peer-checked:text-primary',
                  )}
                >
                  {opt.right}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
