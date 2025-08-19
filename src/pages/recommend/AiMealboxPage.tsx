import { useState } from 'react';
import TopBar from '@/shared/layouts/top-bar';
import Stepper from '@/pages/recommend/components/stepper';
import Button from '@/shared/components/button/button';
import { useAiMealboxForm } from '@/shared/hooks/use-ai-mealbox-form';
import Step1Categories from '@/pages/recommend/steps/Step1Categories';
import Step2Budget from '@/pages/recommend/steps/Step2Budget';
import Step3Method from '@/pages/recommend/steps/Step3Method';
import RecommendLoading from '@/pages/recommend/steps/RecommendLoading';

import ProductCard from '@/pages/main/components/product/product-card';
import type { Product } from '@/shared/types';

import { mockDeliveryProducts } from '@/shared/mocks';

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
    <div className="flex-col-between min-h-[100dvh] bg-white">
      <div className="mx-auto w-full">
        <TopBar
          title={isResult ? 'AI가 상품을 추천해줬어요' : 'AI 밀박스 추천'}
          showClose
          sticky
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
                <ProductCard key={p.id} product={p} variant="wide" />
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
