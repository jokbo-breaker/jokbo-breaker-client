// src/pages/recommend/AiMealboxPage.tsx
import { useState, useMemo, useEffect } from 'react';
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
import EmptyRecommend from '@/pages/recommend/components/empty-recommend';
import { useGeolocation } from '@/shared/hooks/use-geolocation';
import { SOONGSIL_BASE } from '@/pages/menu/constants/menu';
import { useAiRecommendMutation } from '@/shared/apis/discover/discover-mutations';
import { toProductCardModel } from '@/pages/main/checkout/utils/map-discover-to-product';

type Props = {
  onClose?: () => void;
};

const toApiDeliveryMethod = (m?: string): 'all' | 'delivery' | 'pickup' => {
  if (m === 'pickup') return 'pickup';
  if (m === 'team' || m === 'delivery') return 'delivery';
  return 'all';
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

  const { loc } = useGeolocation({
    immediate: true,
    watch: false,
    options: { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
  });
  const center = loc ?? SOONGSIL_BASE;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [results, setResults] = useState<Product[] | null>(null);
  const isResult = results !== null;

  const aiRecommend = useAiRecommendMutation();

  useEffect(() => {
    setShowLoading(aiRecommend.isPending);
  }, [aiRecommend.isPending, setShowLoading]);

  const onNext = () => {
    if (step === 1 && canNext1) setStep(2);
    else if (step === 2 && canNext2) setStep(3);
  };

  const onSubmit = () => {
    if (!canSubmit) return;

    aiRecommend.mutate(
      {
        categories: foods,
        maxPrice: maxPrice || null,
        deliveryMethod: toApiDeliveryMethod(method),
        lat: center.lat,
        lng: center.lng,
        limit: 10,
      },
      {
        onSuccess: (res) => {
          const mapped = (res.recommendations ?? []).map(toProductCardModel);
          setResults(mapped);
        },
        onError: () => {
          setResults([]);
        },
      },
    );

    console.log('submit payload:', payload);
  };

  const list = useMemo(() => results ?? [], [results]);

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
            {aiRecommend.isError && (
              <div className="mb-[1rem] rounded bg-red-50 p-[1rem] text-red-600">
                추천을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
              </div>
            )}

            {list.length === 0 ? (
              <div className="flex min-h-[calc(100dvh-10rem)] items-center justify-center">
                <EmptyRecommend />
              </div>
            ) : (
              <div className="flex-col gap-[2rem]">
                {list.map((p) => (
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
            )}
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
              disabled={!canSubmit || aiRecommend.isPending}
              onClick={onSubmit}
            >
              {aiRecommend.isPending ? '추천 불러오는 중…' : 'AI에게 추천 받기'}
            </Button>
          )}
        </div>
      )}

      <RecommendLoading
        visible={showLoading}
        minLoops={2}
        forceOnceInSession={true}
        minOnceMs={1200}
      />
    </div>
  );
}
