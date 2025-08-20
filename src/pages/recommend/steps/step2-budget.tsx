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
      onChange(onlyDigits === '' ? '' : Number(onlyDigits));
    },
    [onChange],
  );

  const onBlur = useCallback(() => {
    if (value === '') return;
    const n = Math.min(BUDGET.max, Math.max(BUDGET.min, value));
    if (n !== value) onChange(n);
  }, [value, onChange]);

  return (
    <div className="flex-col gap-[4rem] px-[2rem]">
      <h2 className="head3">원하시는 가격대를 입력해주세요</h2>

      <div className="flex-col-center gap-[1.1rem] px-[2.0rem]">
        <div className="flex h-[2.8rem] items-center gap-[1.5rem]">
          <span className="body1 text-gray-600">최대</span>
          <div className="flex-row gap-[1.4rem]">
            <div className="relative max-w-[16rem] flex-1">
              <input
                aria-label="최대 가격"
                inputMode="numeric"
                pattern="[0-9]*"
                className="peer body1 h-[2.8rem] w-full border-0 border-b-[0.2rem] border-black bg-transparent pb-[0.6rem] tracking-[-0.03em] outline-none focus:border-gray-900"
                value={value === '' ? '' : formatKRW(value)}
                onChange={onInput}
                onBlur={onBlur}
              />
            </div>

            <span className="head3 text-black">원</span>
          </div>
        </div>

        <button
          type="button"
          className="caption2 mx-auto cursor-pointer text-gray-600 underline underline-offset-[0.2rem]"
        >
          가격은 상관 없어요
        </button>
      </div>
    </div>
  );
}
