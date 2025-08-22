import TopBar from '@/shared/layouts/top-bar';
import Button from '@/shared/components/button/button';
import Icon from '@/shared/components/icon';
import { useNavigate } from 'react-router-dom';
// === 데이터 (샘플) ===
const current = 642;
const reference = 1148;
const percent = Math.min(100, (current / reference) * 100);
const formatGram = (n: number) => `${n.toLocaleString()}g`;
type PaymentCompleteViewProps = {
  savedG: number;
  remainingBadge?: string | number | null;
  onPrimary: () => void;
  onBack?: () => void;
};

export default function PaymentCompleteView({
  savedG,
  remainingBadge,
  onPrimary,
  onBack,
}: PaymentCompleteViewProps) {
  const navigate = useNavigate();
  return (
    <div className="scrollbar-hide h-dvh flex-col overflow-y-auto">
      <TopBar title="결제 완료" showClose onClose={onBack} sticky />

      <main className="flex-col-center gap-[3.2rem] px-[2rem] py-[4rem]">
        <section className="flex-col-center gap-[1.6rem]">
          <div className="flex-col gap-[0.2rem] px-[2rem] text-center">
            <p className="head3 text-black">결제가 완료되었습니다</p>
            <p className="body2 text-black">
              예쁘게 포장해서 기다리고 있을게요
            </p>
          </div>
          <Icon name="complete-order" size={20} className="animate-float" />
        </section>
        <section className="w-full rounded-[8px] bg-gray-100 py-[1.6rem] text-center">
          <div className="flex-row-center gap-[0.6rem]">
            <p className="body2 text-black">오늘</p>
            <div className="flex-row-center gap-[0.2rem]">
              <Icon
                name="logo-title"
                width={7.8}
                height={1.6}
                className="text-primary"
              />
              <p className="body2 text-black">에서</p>
            </div>
          </div>
          <p className="flex-row-center gap-[0.2rem]">
            <span className="text-primary head1">{savedG}</span>
            <p className="body4 flex-row-center">
              <span className="text-primary">g</span>
              <span className="text-black">
                의 음식물류 폐기물을 절약했어요!
              </span>
            </p>
          </p>
        </section>
        <section className="flex w-full flex-col items-center justify-center gap-[1.6rem] text-center">
          <div className="flex items-center gap-[0.3rem]">
            <span className="body1 text-black">이번주 나의 따뜻한 발걸음</span>
            <span aria-hidden>👣</span>
          </div>
          <div className="w-full flex-col gap-[1.2rem]">
            <div className="w-full flex-col gap-[0.6rem]">
              <div className="flex w-full items-center justify-between">
                <span className="caption2">{formatGram(current)}</span>
                <span className="body3 text-primary">
                  {formatGram(reference)}
                </span>
              </div>
            </div>
            <div
              aria-label="이번주 절약량 진행도"
              className="relative h-[1.6rem] w-full rounded-[40px] bg-gray-200"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-[40px] bg-gradient-to-r from-[#ff6a3d] to-[#ff8a64]"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="w-full flex-col text-end">
              <div className="caption1 text-gray-300">
                일주일 간 가정 내 음식물류 폐기물 발생량
              </div>
              <div className="caption4 text-gray-500">
                (환경부, 2021, 1가정 기준)
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="sticky right-0 bottom-0 left-0 bg-white px-[2rem] pt-[1.2rem] pb-[max(env(safe-area-inset-bottom),2rem)]">
        <Button
          variant="black"
          className="w-full"
          onClick={() => navigate('/')}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
