import { useState } from 'react';
import TopBar from '@/shared/layouts/top-bar';
import { cn } from '@/shared/libs/cn';
import Stepper from '@/pages/recommend/components/stepper';
import Button from '@/shared/components/button/button';
import { useAiMealboxForm } from '@/shared/hooks/use-ai-mealbox-form';
import Step1Categories from '@/pages/recommend/steps/step1-categories';
import Step2Budget from '@/pages/recommend/steps/step2-budget';
import Step3Method from '@/pages/recommend/steps/step3-method';
import RecommendLoading from '@/pages/recommend/steps/recommend-loading';
import ProductCard from '@/pages/main/components/product/product-card';
import type { Product } from '@/shared/types';
import { mockDeliveryProducts } from '@/shared/mocks';

type Props = {
  onClose?: () => void;
};

export default function AiMealboxPage({ onClose }: Props) {
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
  const [results, setResults] = useState<Product[] | null>(null);

  const onNext = () => {
    if (step === 1 && canNext1) setStep(2);
    else if (step === 2 && canNext2) setStep(3);
  };

  const onSubmit = () => {
    if (!canSubmit) return;
    setShowLoading(true);
    setTimeout(() => {
      const demo = [...mockDeliveryProducts].slice(0, 10);
      setResults(demo);
      setShowLoading(false);
    }, 900);
    console.log('submit payload:', payload);
  };

  const isResult = !!results;

  return (
    <div
      className={cn(
        'flex-col-between scrollbar-hide fixed z-[30] h-[100dvh] w-full max-w-[43rem] overflow-y-auto bg-white',
        !isResult && 'overflow-hidden',
      )}
    >
      <div className="mx-auto w-full">
        <TopBar
          title={isResult ? 'AI가 상품을 추천해줬어요' : 'AI 밀박스 추천'}
          showClose
          sticky
          onClose={onClose}
        />

        {!isResult ? (
          <div className="flex-col gap-[1.2rem]">
            <div className="px-[4rem] pt-[1rem]">
              <Stepper total={3} current={step} />
            </div>

            {step === 1 && (
              <Step1Categories selected={foods} onToggle={toggleFood} />
            )}
            {step === 2 && (
              <Step2Budget value={maxPrice} onChange={setMaxPrice} />
            )}
            {step === 3 && <Step3Method value={method} onChange={setMethod} />}
          </div>
        ) : (
          <section className="mx-auto w-full px-[2.0rem] py-[0.8rem]">
            <div className="flex-col gap-[2rem]">
              {results!.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onClose?.()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onClose?.();
                    }
                  }}
                  aria-label={`${p.name ?? '상품'} 선택`}
                  className="block w-full appearance-none rounded-lg border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                >
                  <ProductCard product={p} variant="wide" />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {!isResult && (
        <div className="mx-auto w-full max-w-[43rem] px-[2.0rem] pb-[2.4rem]">
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
      )}

      <RecommendLoading visible={showLoading} />
    </div>
  );
}
