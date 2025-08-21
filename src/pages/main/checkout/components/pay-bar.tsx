import Button from '@/shared/components/button/button';
import { formatKRW } from '@/shared/utils/format-krw';

type Props = {
  total: number;
  onPay: () => void;
  disabled?: boolean;
};

export default function PayBar({ total, onPay, disabled }: Props) {
  return (
    <div className="sticky right-0 bottom-0 left-0 bg-white px-[2rem] pt-[1.2rem] pb-[max(env(safe-area-inset-bottom),2rem)]">
      <div className="flex items-center justify-between pb-[1.2rem]">
        <span className="body1 text-black">총 {formatKRW(total)}원</span>
      </div>
      <Button
        variant="black"
        className="w-full"
        onClick={onPay}
        disabled={disabled}
      >
        {formatKRW(total)}원 결제하기
      </Button>
    </div>
  );
}
