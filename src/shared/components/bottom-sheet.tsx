import { useRef, useState, useEffect, useCallback } from 'react';

type BottomSheetProps = {
  children: React.ReactNode;
  height?: number;
  minHeight?: number;
};

export default function BottomSheet({
  children,
  height = 80,
  minHeight = 70,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const translateYRef = useRef(0);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const vh = window.innerHeight;
    const calculatedHeight = (vh * height) / 100;
    const initialTranslateY = calculatedHeight - minHeight;
    setSheetHeight(calculatedHeight);
    setTranslateY(initialTranslateY);
    translateYRef.current = initialTranslateY;
  }, [height, minHeight]);

  useEffect(() => {
    translateYRef.current = translateY;
  }, [translateY]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartY(e.clientY);
    setIsDragging(true);
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || dragStartY === null) return;
      const delta = e.clientY - dragStartY;
      const newY = Math.min(
        Math.max(translateYRef.current + delta, 0),
        sheetHeight - minHeight,
      );
      setTranslateY(newY);
      translateYRef.current = newY;
      setDragStartY(e.clientY);
    },
    [isDragging, dragStartY, sheetHeight, minHeight],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = (sheetHeight - minHeight) / 2;
    setTranslateY((prev) => (prev < threshold ? 0 : sheetHeight - minHeight));
  }, [isDragging, sheetHeight, minHeight]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
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
      onPointerDown={handlePointerDown}
      className="fixed bottom-4 left-1/2 z-10 w-full max-w-[43rem] touch-none rounded-t-[3rem] bg-white shadow-lg transition-transform duration-300"
      style={{
        transform: `translate(-50%, ${translateY}px)`,
        height: `${sheetHeight}px`,
        touchAction: 'none',
      }}
    >
      <div className="mx-auto my-3 h-[0.3rem] w-[5rem] rounded-[10px] bg-gray-200" />
      <div className="max-h-[calc(100%-40px)] overflow-y-auto px-4">
        {children}
      </div>
    </div>
  );
}
