import { useCallback } from 'react';
import { BUDGET } from '@/pages/recommend/constants/recommend';
import { formatKRW } from '@/shared/utils/format-krw';

type Props = {
  value: number | '';
  onChange: (v: number | '') => void;
};

export default function Step2Budget({ value, onChange }: Props) {
  const onInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyDigits = e.target.value.replace(/[^\d]/g, '');
      if (onlyDigits === '') return onChange('');
      const n = Math.min(BUDGET.max, Math.max(BUDGET.min, Number(onlyDigits)));
      onChange(n);
    },
    [onChange],
  );

  return (
    <>
      <h2 className="px-[2.0rem] pt-[2.4rem] text-[2.2rem] leading-[1.4] font-bold">
        원하시는 가격대를 입력해주세요
      </h2>

      <div className="px-[2.0rem] pt-[2.4rem]">
        <div className="flex items-end gap-[1.2rem]">
          <span className="text-[1.8rem] font-semibold text-gray-800">
            최대
          </span>

          <div className="relative flex-1">
            <input
              aria-label="최대 가격"
              inputMode="numeric"
              pattern="[0-9]*"
              className="peer w-full border-0 border-b-[0.2rem] border-gray-400 bg-transparent pb-[0.6rem] text-[2.0rem] font-semibold tracking-[-0.02em] outline-none focus:border-gray-900"
              value={value === '' ? '' : formatKRW(value)}
              onChange={onInput}
            />
          </div>

          <span className="text-[1.8rem] font-semibold text-gray-800">원</span>
        </div>

        <button
          type="button"
          className="mx-auto mt-[1.6rem] block text-[1.5rem] text-gray-500 underline underline-offset-[0.2rem]"
        >
          가격은 상관 없어요
        </button>
      </div>
    </>
  );
}
