import { useRef, useState, useEffect, useCallback } from 'react';

type BottomSheetProps = {
  children: React.ReactNode;
  maxHeightRem?: number;
  minHeightRem?: number;
  minHeight?: number;
  height?: number;
  onOverExpand?: () => void;
  overThresholdRem?: number;
  dragAreaRem?: number;
  initialVisiblePx?: number;
  initialVisibleRem?: number;
  initialVisibleVH?: number;
  initialVisibleRatio?: number;
};

export default function BottomSheet({
  children,
  maxHeightRem = 80,
  minHeightRem = 10,
  minHeight,
  height = 80,
  onOverExpand,
  overThresholdRem = 2.4,
  dragAreaRem = 4,
  initialVisiblePx,
  initialVisibleRem,
  initialVisibleVH,
  initialVisibleRatio,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  const [sheetHeight, setSheetHeight] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const translateYRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const dragEnabledRef = useRef(false);
  const lastClientYRef = useRef<number | null>(null);
  const overPullUpRef = useRef(0);

  const remToPx = useCallback((rem: number) => {
    const base = parseFloat(getComputedStyle(document.documentElement).fontSize || '10px');
    return rem * base;
  }, []);

  const getMinVisiblePx = useCallback(() => {
    return minHeight != null ? minHeight : remToPx(minHeightRem);
  }, [minHeight, minHeightRem, remToPx]);

  useEffect(() => {
    const vh = window.innerHeight;
    const maxPx = remToPx(maxHeightRem);
    const percentPx = (vh * height) / 100;
    const calculatedHeight = Math.min(vh, maxPx, percentPx);

    const minVisiblePx = getMinVisiblePx();

    // ✅ 초기 보이는 높이 계산 (우선순위: px > rem > vh > ratio > min)
    let initialVisible = minVisiblePx;
    if (typeof initialVisibleRatio === 'number') {
      initialVisible = calculatedHeight * initialVisibleRatio;
    }
    if (typeof initialVisibleVH === 'number') {
      initialVisible = (vh * initialVisibleVH) / 100;
    }
    if (typeof initialVisibleRem === 'number') {
      initialVisible = remToPx(initialVisibleRem);
    }
    if (typeof initialVisiblePx === 'number') {
      initialVisible = initialVisiblePx;
    }

    initialVisible = Math.max(0, Math.min(initialVisible, calculatedHeight));

    const initialTranslateY = Math.max(calculatedHeight - initialVisible, 0);

    setSheetHeight(calculatedHeight);
    setTranslateY(initialTranslateY);
    translateYRef.current = initialTranslateY;
  }, [
    height,
    maxHeightRem,
    remToPx,
    getMinVisiblePx,
    initialVisiblePx,
    initialVisibleRem,
    initialVisibleVH,
    initialVisibleRatio,
  ]);

  useEffect(() => {
    translateYRef.current = translateY;
  }, [translateY]);

  const startDragIfInDragZone = (e: React.PointerEvent) => {
    if (!sheetRef.current) return;

    const target = e.target as HTMLElement;
    const isHandle = target?.dataset?.dragHandle === 'true';

    const rect = sheetRef.current.getBoundingClientRect();
    const yInSheet = e.clientY - rect.top;
    const dragZone = remToPx(dragAreaRem);

    if (isHandle || yInSheet <= dragZone) {
      dragEnabledRef.current = true;
      setIsDragging(true);
      lastClientYRef.current = e.clientY;
      overPullUpRef.current = 0;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      e.preventDefault();
    } else {
      dragEnabledRef.current = false;
    }
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || !dragEnabledRef.current) return;
      if (lastClientYRef.current == null) {
        lastClientYRef.current = e.clientY;
        return;
      }

      const delta = e.clientY - lastClientYRef.current;
      let next = translateYRef.current + delta;

      if (next < 0) {
        overPullUpRef.current += -next;
        next = 0;
      }

      const bottom = Math.max(sheetHeight - getMinVisiblePx(), 0);
      if (next > bottom) next = bottom;

      setTranslateY(next);
      translateYRef.current = next;
      lastClientYRef.current = e.clientY;
    },
    [isDragging, sheetHeight, getMinVisiblePx],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    dragEnabledRef.current = false;

    const bottom = Math.max(sheetHeight - getMinVisiblePx(), 0);
    const threshold = bottom / 2;

    setTranslateY((prev) => (prev < threshold ? 0 : bottom));

    const overThresholdPx = remToPx(overThresholdRem);
    if (overPullUpRef.current >= overThresholdPx && onOverExpand) {
      onOverExpand();
    }

    overPullUpRef.current = 0;
    lastClientYRef.current = null;
  }, [isDragging, sheetHeight, getMinVisiblePx, onOverExpand, overThresholdRem, remToPx]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove, {
        passive: false,
      });
      window.addEventListener('pointerup', handlePointerUp);
    } else {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={sheetRef}
      onPointerDown={startDragIfInDragZone}
      className="fixed bottom-0 left-1/2 z-[var(--z-bottom-nav)] w-full max-w-[var(--max-width)] rounded-t-[3rem] bg-white px-[2rem] pt-[1.4rem] shadow-lg"
      style={{
        transform: `translateX(-50%) translateY(${translateY}px)`,
        height: `${sheetHeight}px`,
        touchAction: 'none',
        pointerEvents: 'auto',
      }}
    >
      <div
        data-drag-handle="true"
        className="mx-auto mb-[1.4rem] h-[0.3rem] w-[5rem] cursor-grab rounded-[10px] bg-gray-200 active:cursor-grabbing"
        aria-label="시트 드래그 핸들"
      />
      <div className="scrollbar-hide max-h-[calc(100%-4rem)] overflow-y-auto px-4">{children}</div>
    </div>
  );
}
