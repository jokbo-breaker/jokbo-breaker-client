import {
  METHOD_OPTIONS,
  MethodId,
} from '@/pages/recommend/constants/recommend';
import { cn } from '@/shared/libs/cn';
import { useState } from 'react';

type Props = {
  value: MethodId | '';
  onChange: (v: MethodId) => void;
};

export default function Step3Method({ value, onChange }: Props) {
  const [showError, setShowError] = useState(false);

  const onPick = (v: MethodId) => {
    setShowError(false);
    onChange(v);
  };

  return (
    <>
      <h2 className="px-[2.0rem] pt-[2.4rem] text-[2.2rem] leading-[1.4] font-bold">
        원하시는 상품 수령 방법을 선택해주세요
      </h2>

      <div className="flex flex-col gap-[1.2rem] px-[2.0rem] pt-[2.0rem] pb-[12rem]">
        {METHOD_OPTIONS.map((opt) => {
          const selected = value === opt.id;
          const isWarning = selected && opt.id === 'none';
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onPick(opt.id)}
              className={cn(
                'w-full rounded-[1.2rem] px-[1.6rem] py-[1.6rem] text-left',
                'ring-1 transition-colors',
                selected
                  ? 'ring-primary bg-secondary text-primary'
                  : 'bg-white ring-gray-300',
                isWarning && 'bg-orange-50 text-orange-600 ring-orange-400',
              )}
            >
              <span className="text-[1.6rem]">{opt.label}</span>
            </button>
          );
        })}
        {showError && (
          <p className="px-[0.4rem] text-[1.4rem] text-red-500">
            하나 이상 선택해 주세요.
          </p>
        )}
      </div>
    </>
  );
}
