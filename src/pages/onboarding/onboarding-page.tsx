import { useNavigate } from 'react-router-dom';
import Indicator from '@/pages/main/product-detail/components/indicator';
import Step1 from '@/pages/onboarding/components/step1';
import Step2 from '@/pages/onboarding/components/step2';
import Step3 from '@/pages/onboarding/components/step3';
import Button from '@/shared/components/button/button';
import { useOnboarding } from '@/pages/onboarding/hooks/use-onboarding';
import { ONBOARDING_TOTAL } from '@/pages/onboarding/constants/steps';
import OnboardingCarousel from '@/pages/onboarding/components/onboarding-carousel';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { index, isLast, select, next } = useOnboarding(ONBOARDING_TOTAL, {
    onFinish: () => navigate('/', { replace: true }),
  });

  return (
    <div className="flex-col-between h-dvh bg-white px-[2rem] pt-[3.2rem] pb-[max(2.4rem,env(safe-area-inset-bottom))]">
      <OnboardingCarousel index={index} onChange={select} className="flex-1">
        <div className="flex-col-center h-full w-full">
          <Step1 />
        </div>
        <div className="flex-col-center h-full w-full">
          <Step2 />
        </div>
        <div className="flex-col-center h-full w-full">
          <Step3 />
        </div>
      </OnboardingCarousel>

      {/* indicator + cta */}
      <div className="w-full">
        <Indicator
          total={ONBOARDING_TOTAL}
          index={index}
          onSelect={select}
          className="mb-[1.2rem]"
        />

        <Button
          variant="black"
          onClick={next}
          className="h-[5.2rem] w-full rounded-[1.2rem]"
          aria-label={isLast ? '온보딩 시작하기' : '다음 단계로'}
        >
          <span className="body2">{isLast ? '시작하기' : '다음'}</span>
        </Button>
      </div>
    </div>
  );
}
