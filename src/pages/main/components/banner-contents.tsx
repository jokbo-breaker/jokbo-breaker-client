import React from 'react';
import PromoModal from '@/pages/main/components/banner';
import Indicator from '@/pages/main/product-detail/components/indicator';
import Icon from '@/shared/components/icon';

export default function BannerContents() {
  const [open, setOpen] = React.useState(false);

  const openModal = React.useCallback(() => setOpen(true), []);
  const onKeyOpen = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  }, []);

  return (
    <>
      {/* 바깥 컨테이너: div + role="button" (버튼 중첩 이슈 방지) */}
      <div
        role="button"
        tabIndex={0}
        onClick={openModal}
        onKeyDown={onKeyOpen}
        aria-label="오늘 절약 성과 안내 배너"
        className="relative h-[20rem] w-full overflow-hidden rounded-[12px] bg-gray-900 text-gray-50 select-none"
      >
        {/* 장식 이모지 */}
        <img
          src="https://placehold.co/36x36"
          alt=""
          className="absolute top-4 left-12 h-9 w-9 -rotate-12 opacity-90"
        />
        <img
          src="https://placehold.co/28x28"
          alt=""
          className="absolute bottom-6 left-4 h-7 w-7 opacity-90"
        />
        <img
          src="https://placehold.co/28x28"
          alt=""
          className="absolute top-10 right-6 h-7 w-7 rotate-[10deg] opacity-90"
        />
        <img
          src="https://placehold.co/28x28"
          alt=""
          className="absolute top-1 left-1/2 h-7 w-7 -translate-x-1/2 opacity-90"
        />

        <div className="mx-auto flex h-full flex-col items-center justify-center px-5 pt-[3.7rem] text-center">
          <div>
            <div className="flex items-center justify-center gap-[0.6rem]">
              <span className="body3">오늘</span>
              <span className="relative px-1">
                <Icon
                  name="logo-title"
                  className="text-primary relative z-[1]"
                  width={7.8}
                />
              </span>
              <span className="body3">에서</span>
            </div>

            <div className="flex-row-center gap-[0.2rem]">
              <span className="text-primary head1">28</span>
              <span className="body3">
                <span className="text-primary">명</span>
                <span>의 사용자가</span>
              </span>
            </div>

            <div className="flex-row-center gap-[0.2rem]">
              <span className="text-primary head1">1,506</span>
              <span className="body4">
                <span className="text-primary">g</span>
                <span>의 음식물류 폐기물을 절약했어요!</span>
              </span>
            </div>
          </div>
          <div className="flex-col-center">
            <div className="flex-row-center gap-[0.6rem]">
              <span className="caption1 text-gray-300">이는</span>
              <span className="text-primary head3">1.4</span>
              <span className="caption1 text-gray-300">
                개 식당에서 평균적으로 나오는 음식물류 폐기물 양이에요
              </span>
            </div>
            <div className="caption4 w-full text-end text-gray-500">
              (종사자 수 기준 매장당 1일 2,191g, 환경부, 2021)
            </div>
          </div>

          <div
            className="mt-auto"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <Indicator
              total={2}
              index={0}
              onSelect={() => {}}
              className="bg-transparent"
            />
          </div>
        </div>
      </div>

      <PromoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
