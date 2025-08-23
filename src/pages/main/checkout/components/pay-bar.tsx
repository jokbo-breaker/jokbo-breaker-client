import Button from '@/shared/components/button/button';
import { formatKRW } from '@/shared/utils/format-krw';

type Props = {
  total: number;
  onPay: () => void;
  disabled?: boolean;
  canPay?: boolean;
};

export default function PayBar({ total, onPay, canPay }: Props) {
  return (
    <div className="sticky right-0 bottom-0 left-0 z-[var(--z-bottom-nav)] flex gap-[1.7rem] bg-white px-[2rem] py-[2rem]">
      <div className="body1 flex flex-1 items-center justify-between whitespace-nowrap text-black">
        총 {formatKRW(total)}원
      </div>
      <Button
        variant={canPay ? 'black' : 'white'}
        className="flex-3 rounded-[1.2rem] whitespace-nowrap"
        onClick={onPay}
        disabled={!canPay}
      >
        {formatKRW(total)}원 결제하기
      </Button>
    </div>
  );
}
