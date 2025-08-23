import { useCallback, useEffect, useState } from 'react';
import { BUDGET } from '@/pages/recommend/constants/recommend';
import { formatKRW } from '@/shared/utils/format-krw';

type Props = {
  value: number | '';
  onChange: (v: number | '') => void;
};

const NO_LIMIT_PRICE = 20000; // 요청에만 사용할 내부 상수

export default function Step2Budget({ value, onChange }: Props) {
  // noLimit=true면 UI는 비우되 내부 값은 20000 유지
  const [noLimit, setNoLimit] = useState(false);

  // 외부에서 값이 바뀌면 플래그 동기화(20000이 아니면 noLimit 끔)
  useEffect(() => {
    if (value !== NO_LIMIT_PRICE) setNoLimit(false);
  }, [value]);

  const onInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyDigits = e.target.value.replace(/[^\d]/g, '');
      setNoLimit(false); // 사용자가 직접 입력하면 표시/값 동기화
      onChange(onlyDigits === '' ? '' : Number(onlyDigits));
    },
    [onChange],
  );

  const onBlur = useCallback(() => {
    if (value === '' || noLimit) return; // noLimit이면 클램프 불필요
    const n = Math.min(BUDGET.max, Math.max(BUDGET.min, value));
    if (n !== value) onChange(n);
  }, [value, noLimit, onChange]);

  const onNoLimitClick = useCallback(() => {
    setNoLimit(true); // UI는 비우고
    onChange(NO_LIMIT_PRICE); // 내부 값(요청용)만 20000으로
  }, [onChange]);

  const displayValue = noLimit ? '' : value === '' ? '' : formatKRW(value);

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
                value={displayValue}
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
          aria-pressed={noLimit}
          onClick={onNoLimitClick}
        >
          가격은 상관 없어요
        </button>
      </div>
    </div>
  );
}
