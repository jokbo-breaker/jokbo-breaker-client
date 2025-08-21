import * as React from 'react';
import { cn } from '@/shared/libs/cn';

type Props = {
  name: string;
  value: string;
  current: string;
  onChange: (v: string) => void;
  left: React.ReactNode; // 라벨
  right?: React.ReactNode; // 우측 설명
  warningBelow?: React.ReactNode; // 선택시 하단 경고문
};

export default function SelectRow({
  name,
  value,
  current,
  onChange,
  left,
  right,
  warningBelow,
}: Props) {
  const id = `${name}-${value}`;
  const selected = current === value;

  return (
    <div className="flex-col gap-[0.6rem]">
      <label htmlFor={id} className="relative block cursor-pointer">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={selected}
          onChange={() => onChange(value)}
          className="peer sr-only"
        />
        <div
          className={cn(
            'flex items-center justify-between rounded-[1.2rem] border px-[1.6rem] py-[1.6rem]',
            'border-gray-200 bg-white',
            selected && 'border-primary bg-secondary',
          )}
        >
          <span className={cn('body2 text-black', selected && 'text-primary')}>
            {left}
          </span>
          {right ? (
            <span
              className={cn('body4 text-black', selected && 'text-primary')}
            >
              {right}
            </span>
          ) : null}
        </div>
      </label>

      {selected && warningBelow ? (
        <p className="caption1 text-primary px-[0.4rem]">{warningBelow}</p>
      ) : null}
    </div>
  );
}
