// src/pages/main/components/banner-contents.tsx
import React from 'react';
import PromoModal from '@/pages/main/components/banner';
import Indicator from '@/pages/main/product-detail/components/indicator';
import Icon from '@/shared/components/icon';

const formatGram = (n: number) => `${n.toLocaleString()}g`;

export default function BannerContents() {
  const [open, setOpen] = React.useState(false);
  const [slide, setSlide] = React.useState(0);

  const wrapRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef({ active: false, startX: 0, dx: 0 });
  const suppressClickRef = React.useRef(false);
  const [, force] = React.useReducer((c) => c + 1, 0);

  const openModal = React.useCallback(() => setOpen(true), []);
  const onKeyOpen = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  }, []);

  // 공통 드래그 유틸
  const startDrag = (clientX: number) => {
    dragRef.current.active = true;
    dragRef.current.startX = clientX;
    dragRef.current.dx = 0;
    // 포인터 캡처는 PointerEvent에서만 가능
  };
  const moveDrag = (clientX: number) => {
    if (!dragRef.current.active) return;
    dragRef.current.dx = clientX - dragRef.current.startX;
    force();
  };
  const endDrag = () => {
    if (!dragRef.current.active) return;
    const dx = dragRef.current.dx;
    const w = wrapRef.current?.clientWidth ?? 1;
    const threshold = Math.max(28, w * 0.08);

    let next = slide;
    if (Math.abs(dx) > threshold) {
      if (dx < 0 && slide < 1) next = slide + 1;
      if (dx > 0 && slide > 0) next = slide - 1;
    }
    setSlide(next);

    if (Math.abs(dx) > 5) suppressClickRef.current = true;

    dragRef.current.active = false;
    dragRef.current.startX = 0;
    dragRef.current.dx = 0;
    force();
  };

  // Pointer 이벤트
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    startDrag(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => moveDrag(e.clientX);
  const onPointerUp = () => endDrag();
  const onPointerCancel = () => endDrag();
  const onPointerLeave = () => endDrag();

  // ★ 터치 폴백 (iOS/구형 안드 지원)
  const onTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => moveDrag(e.touches[0].clientX);
  const onTouchEnd = () => endDrag();

  const onClickCapture = (e: React.SyntheticEvent) => {
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClickRef.current = false;
    }
  };

  const base = slide === 0 ? 0 : -50;
  const w = wrapRef.current?.clientWidth ?? 1;
  const dragPercent = dragRef.current.active
    ? (dragRef.current.dx / w) * 50
    : 0;
  const transform = `translateX(calc(${base}% + ${dragPercent}%))`;

  const stopBubble = (e: React.SyntheticEvent) => e.stopPropagation();

  // 샘플 데이터
  const current = 642;
  const reference = 1148;
  const percent = Math.min(100, (current / reference) * 100);

  return (
    <>
      <div
        ref={wrapRef}
        role="button"
        tabIndex={0}
        onClick={openModal}
        onKeyDown={onKeyOpen}
        onClickCapture={onClickCapture}
        // 드래그 핸들러: Pointer + Touch 폴백 모두 부착
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-label="오늘 절약 성과 안내 배너"
        className="relative h-[20rem] w-full touch-pan-y overflow-hidden bg-gray-900 text-gray-50 select-none"
      >
        <div
          className="absolute inset-0 flex w-[200%] transition-transform duration-300"
          style={{
            transform,
            transitionDuration: dragRef.current.active ? '0ms' : undefined,
          }}
        >
          {/* ===== 배너 #1 (기존) ===== */}
          <div className="relative h-full w-1/2">
            <img
              src="/food1.svg"
              alt=""
              aria-hidden
              draggable={false}
              className="absolute top-[1.8rem] left-[3rem] -rotate-12 opacity-90"
            />
            <img
              src="/food5.svg"
              alt=""
              aria-hidden
              draggable={false}
              className="absolute bottom-[1.7rem] left-[1.6rem] opacity-90"
            />
            <img
              src="/food3.svg"
              alt=""
              aria-hidden
              draggable={false}
              className="absolute top-[3.5rem] right-[3rem] rotate-[10deg] opacity-90"
            />
            <img
              src="/food4.svg"
              alt=""
              aria-hidden
              draggable={false}
              className="absolute top-[9rem] right-[2.1rem] rotate-5 opacity-90"
            />
            <img
              src="/food2.svg"
              alt=""
              aria-hidden
              draggable={false}
              className="absolute top-[0.25rem] right-[14rem] opacity-90"
            />

            <div className="mx-auto flex h-full flex-col items-center justify-center px-5 pt-[2rem] text-center">
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
                  <span className="head1 text-primary">28</span>
                  <span className="body3">
                    <span className="text-primary">명</span>의 사용자가
                  </span>
                </div>

                <div className="flex-row-center gap-[0.2rem]">
                  <span className="head1 text-primary">1,506</span>
                  <span className="body4">
                    <span className="text-primary">g</span>의 음식물류 폐기물을
                    절약했어요!
                  </span>
                </div>
              </div>

              <div className="flex-col-center">
                <div className="flex-row-center gap-[0.6rem] whitespace-nowrap">
                  <span className="caption1 text-gray-300">이는</span>
                  <span className="head3 text-primary">1.4</span>
                  <span className="caption1 text-gray-300">
                    개 식당에서 평균적으로 나오는 음식물류 폐기물 양이에요
                  </span>
                </div>
                <div className="caption4 w-full text-end text-gray-500">
                  (종사자 수 기준 매장당 1일 2.191kg, 환경부, 2021)
                </div>
              </div>
            </div>
          </div>

          {/* === 배너 #2 === */}
          <div className="relative h-full w-1/2 bg-gray-900">
            {/* ... 기존 내용 그대로 ... */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[1.6rem] px-[2.4rem] text-center">
              <div className="flex items-center gap-[0.3rem]">
                <span className="body1 text-gray-50">
                  이번주 나의 따뜻한 발걸음
                </span>
                <Icon name="walk" size={2.8} />
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
            </div>
          </div>
        </div>

        {/* 페이지 인디케이터 */}
        <div
          className="absolute inset-x-0 bottom-3 z-[var(--z-tooltip)] flex justify-center"
          onPointerDown={stopBubble}
          onClick={stopBubble}
          onTouchStart={stopBubble}
          onMouseDown={stopBubble}
        >
          <Indicator
            total={2}
            index={slide}
            onSelect={setSlide}
            className="bg-transparent"
          />
        </div>
      </div>

      <PromoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
