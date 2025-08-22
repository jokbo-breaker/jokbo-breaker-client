import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, PanInfo, useMotionValue } from 'framer-motion';

type Props = {
  index: number;
  onChange: (i: number) => void;
  children: React.ReactNode;
  className?: string;
};

/**
 * 모바일 웹 친화적인 좌/우 스와이프 캐러셀
 * - 마우스/터치 모두 지원(Framer Motion pan 제스처)
 * - 가장자리 고무밴드(overscroll) 저항
 * - 인덱스 변경 시 스프링 스냅
 */
export default function OnboardingCarousel({
  index,
  onChange,
  children,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const count = React.Children.count(children);

  // 컨테이너 너비 측정(회전/리사이즈 대응)
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // 인덱스 바뀔 때 스냅 이동
  useEffect(() => {
    animRef.current?.stop();
    const target = -index * width;
    animRef.current = animate(x, target, {
      type: 'spring',
      stiffness: 320,
      damping: 40,
    });
  }, [index, width, x]);

  const canSwipePrev = index > 0;
  const canSwipeNext = index < count - 1;

  const onPanStart = () => {
    animRef.current?.stop();
  };

  const onPan = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    let dx = info.offset.x;
    // 가장자리에서 고무밴드 저항
    if ((dx > 0 && !canSwipePrev) || (dx < 0 && !canSwipeNext)) {
      dx *= 0.35;
    }
    x.set(-index * width + dx);
  };

  const onPanEnd = (
    _: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    const dx = info.offset.x;
    const v = info.velocity.x; // px/s
    const threshold = Math.min(width * 0.28, 180); // 거리 임계치

    let next = index;
    if (dx < -threshold || v < -700) next = Math.min(index + 1, count - 1);
    else if (dx > threshold || v > 700) next = Math.max(index - 1, 0);

    onChange(next);
  };

  return (
    <div
      ref={containerRef}
      className={['relative w-full overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      style={{ touchAction: 'pan-y' }} // 세로 스크롤 허용, 가로 스와이프 인식
    >
      <motion.div
        className="flex"
        style={{ x }}
        onPanStart={onPanStart}
        onPan={onPan}
        onPanEnd={onPanEnd}
      >
        {React.Children.map(children, (child, i) => (
          <div key={i} className="w-full shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
