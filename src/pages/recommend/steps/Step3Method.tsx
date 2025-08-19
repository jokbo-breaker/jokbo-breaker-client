import { useState } from 'react';
import {
  METHOD_OPTIONS,
  MethodId,
} from '@/pages/recommend/constants/recommend';
import RadioTileGroup from '@/shared/components/text-field/radio-tile-group';
import { cn } from '@/shared/libs/cn';

type Props = {
  value: MethodId | '';
  onChange: (v: MethodId) => void;
};

export default function Step3Method({ value, onChange }: Props) {
  const [showError, setShowError] = useState(false);

  const options: { value: MethodId; label: React.ReactNode }[] =
    METHOD_OPTIONS.map((opt) => ({
      value: opt.id,
      label: opt.label,
    }));

  const handleChange = (v: MethodId) => {
    setShowError(false);
    onChange(v);
  };
  return (
    <div className="flex-col gap-[1.2rem] px-[2.0rem]">
      <h2 className="text-head3 text-black">
        원하시는 상품 수령 방법을 선택해주세요
      </h2>

      <RadioTileGroup
        name="receive-method"
        value={value}
        onChange={handleChange}
        options={options}
        className="text-body3"
      />

      {showError && (
        <p className={cn('px-[0.4rem] text-[1.4rem] text-red-500')}>
          하나 이상 선택해 주세요.
        </p>
      )}
    </div>
  );
}
