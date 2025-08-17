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
                'flex items-center justify-between rounded-[4px] border px-4 py-4 transition-colors',
                'border-neutral-200 bg-white',
                'peer-hover:border-neutral-300',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-orange-200',
                'peer-checked:border-orange-500 peer-checked:bg-orange-50',
                opt.disabled && 'pointer-events-none opacity-60',
              )}
            >
              <span
                className={cn(
                  'text-body3 text-neutral-800',
                  'peer-checked:text-orange-600',
                )}
              >
                {opt.label}
              </span>

              {opt.right && (
                <span
                  className={cn(
                    'text-body4 text-neutral-500',
                    'peer-checked:text-orange-600',
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
