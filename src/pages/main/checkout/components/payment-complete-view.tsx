import TopBar from '@/shared/layouts/top-bar';
import Button from '@/shared/components/button/button';
import { cn } from '@/shared/libs/cn';

type Props = {
  savedG: number;
  remainingBadge?: string | number | null;
  onPrimary: () => void;
  onBack?: () => void;
};

const WEEK_BASELINE_G = 1148;

export default function PaymentCompleteView({
  savedG,
  remainingBadge,
  onPrimary,
  onBack,
}: Props) {
  const ratio = Math.min(100, (savedG / WEEK_BASELINE_G) * 100);

  return (
    <div className="h-dvh flex-col">
      <TopBar title="결제 완료" showBack onBack={onBack} sticky />

      <main className="scrollbar-hide flex-1 overflow-y-auto px-[2rem] pb-[10rem]">
        <section className="py-[2.4rem] text-center">
          <p className="body2 text-black">결제가 완료되었습니다</p>
          <p className="body3 mt-[1.6rem] text-black">언제 ~~ 하세요</p>
        </section>

        <section className="mt-[6rem] text-center">
          <p className="body2 text-black">오늘 (서비스명)에서</p>
          <p className="head3 mt-[1.2rem]">
            <span className="text-primary">{savedG}g</span>
            <span className="text-black">의 음식물류 폐기물을 절약했어요</span>
          </p>
        </section>

        <section className="mt-[6rem]">
          <h3 className="body1 text-primary">이번주 나의 따뜻한 발걸음</h3>

          <div className="body1 mt-[0.8rem] text-black">{savedG}g</div>

          <div className="mt-[0.8rem]">
            <div className="h-[1.2rem] w-full rounded-full bg-gray-400/50">
              <div
                className={cn('bg-primary h-full rounded-full')}
                style={{ width: `${ratio}%` }}
              />
            </div>
            <div className="mt-[0.6rem] flex items-center justify-end text-gray-700">
              <span className="caption1">
                {WEEK_BASELINE_G.toLocaleString()}g
              </span>
            </div>
          </div>

          <p className="caption2 mt-[1.2rem] text-center text-gray-500">
            일주일 간 가정 내 음식물류 폐기물 발생량
            <br />
            (환경부, 2021, 1가정 기준)
          </p>
        </section>
      </main>

      <div className="sticky right-0 bottom-0 left-0 bg-white px-[2rem] pt-[1.2rem] pb-[max(env(safe-area-inset-bottom),2rem)]">
        <Button variant="black" className="w-full" onClick={onPrimary}>
          주문하기 · {remainingBadge ?? '재고 확인'}
        </Button>
      </div>
    </div>
  );
}
