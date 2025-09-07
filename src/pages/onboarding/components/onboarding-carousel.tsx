import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, PanInfo, useMotionValue } from 'framer-motion';

type Props = {
  index: number;
  onChange: (i: number) => void;
  children: React.ReactNode;
  className?: string;
};

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

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

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
    const v = info.velocity.x;
    const threshold = Math.min(width * 0.28, 180);

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
      style={{ touchAction: 'pan-y' }}
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
