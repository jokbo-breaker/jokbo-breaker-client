import { useState } from 'react';
import Stepper from '@/pages/recommend/components/stepper';
import Button from '@/shared/components/button/button';
import { useAiMealboxForm } from '@/shared/hooks/use-ai-mealbox-form';
import Step1Categories from '@/pages/recommend/steps/Step1Categories';
import Step2Budget from '@/pages/recommend/steps/Step2Budget';
import Step3Method from '@/pages/recommend/steps/Step3Method';
import RecommendLoading from '@/pages/recommend/steps/RecommendLoading';

export default function AiMealboxPage() {
  const {
    foods,
    toggleFood,
    maxPrice,
    setMaxPrice,
    method,
    setMethod,
    canNext1,
    canNext2,
    canSubmit,
    showLoading,
    setShowLoading,
    payload,
  } = useAiMealboxForm();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const onNext = () => {
    if (step === 1 && canNext1) setStep(2);
    else if (step === 2 && canNext2) setStep(3);
  };

  const onSubmit = () => {
    if (!canSubmit) return;
    setShowLoading(true);
    console.log('submit payload:', payload);
  };

  return (
    <div className="mx-auto min-h-[100dvh] w-full max-w-[37.5rem] bg-white">
      <header className="flex items-center justify-between px-[2.0rem] pt-[1.2rem]">
        <div className="w-[2.4rem]" />
        <h1 className="text-[1.6rem] font-semibold">AI 밀박스 추천</h1>
        <button aria-label="닫기" className="p-[0.8rem]">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="var(--color-gray-700)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <div className="px-[2.0rem] pt-[1.6rem]">
        <Stepper total={3} current={step} />
      </div>

      {step === 1 && <Step1Categories selected={foods} onToggle={toggleFood} />}
      {step === 2 && <Step2Budget value={maxPrice} onChange={setMaxPrice} />}
      {step === 3 && <Step3Method value={method} onChange={setMethod} />}

      <div className="fixed bottom-[2.4rem] left-1/2 w-full max-w-[37.5rem] -translate-x-1/2 px-[2.0rem]">
        {step < 3 ? (
          <Button
            variant={
              step === 1
                ? canNext1
                  ? 'black'
                  : 'white'
                : canNext2
                  ? 'black'
                  : 'white'
            }
            className="w-full"
            disabled={step === 1 ? !canNext1 : !canNext2}
            onClick={onNext}
          >
            다음
          </Button>
        ) : (
          <Button
            variant={canSubmit ? 'black' : 'white'}
            className="w-full"
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            AI에게 추천 받기
          </Button>
        )}
      </div>

      <RecommendLoading visible={showLoading} />
    </div>
  );
}
