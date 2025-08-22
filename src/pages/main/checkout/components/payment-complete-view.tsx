import TopBar from '@/shared/layouts/top-bar';
import Button from '@/shared/components/button/button';
import Icon from '@/shared/components/icon';
import Divider from '@/pages/main/checkout/components/divider';
import { useNavigate } from 'react-router-dom';

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
    <div className="h-dvh flex-col">
      <TopBar title="결제 완료" showBack onBack={onBack} sticky />

      <main className="scrollbar-hide flex-1 overflow-y-auto pt-[2.8rem]">
        <section className="flex-col-center gap-[1.6rem]">
          <div className="flex-col gap-[0.8rem] px-[2rem] text-center">
            <p className="head3 text-black">결제가 완료되었습니다</p>
            <p className="body2 text-black">
              예쁘게 포장해서 기다리고 있을게요
            </p>
          </div>
          <Icon name="complete-order" size={20} />
          <Divider />
        </section>
        <section className="pt-[2.8rem] text-center">
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
