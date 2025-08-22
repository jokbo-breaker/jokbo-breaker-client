import Icon from '@/shared/components/icon';
import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  PropsWithChildren,
} from 'react';
import { createPortal } from 'react-dom';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'center' | 'start' | 'end';
type Trigger = 'hover' | 'click';

type TooltipProps = PropsWithChildren<{
  content: React.ReactNode;
  side?: Side;
  align?: Align;
  offset?: number;
  showDelay?: number;
  hideDelay?: number;
  maxWidth?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
  trigger?: Trigger;
  lockToTriggerRight?: boolean;
}>;

export default function Tooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  offset = 8,
  showDelay = 120,
  hideDelay = 80,
  maxWidth = 280,
  open,
  onOpenChange,
  disabled = false,
  className = '',
  trigger = 'click',
  lockToTriggerRight = false,
}: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = typeof open === 'boolean';
  const isOpen = isControlled ? (open as boolean) : uncontrolledOpen;

  const setOpen = useCallback(
    (v: boolean) => (isControlled ? onOpenChange?.(v) : setUncontrolledOpen(v)),
    [isControlled, onOpenChange],
  );

  const id = useId();
  const [mounted, setMounted] = useState(false);
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );
  const [arrowPos, setArrowPos] = useState<{ left?: number; top?: number }>({});

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const tipEl = tipRef.current;
    if (!triggerEl || !tipEl) return;

    const tRect = triggerEl.getBoundingClientRect();
    const tipRect = tipEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 8;
    const arrowSize = 8;

    let top = 0;
    let left = 0;
    const centerX = tRect.left + tRect.width / 2;
    const centerY = tRect.top + tRect.height / 2;

    if (side === 'top') {
      top = tRect.top - tipRect.height - offset;
      if (align === 'start') left = tRect.left;
      else if (align === 'end') left = tRect.right - tipRect.width;
      else left = centerX - tipRect.width / 2;
    } else if (side === 'bottom') {
      top = tRect.bottom + offset;
      if (align === 'start') left = tRect.left;
      else if (align === 'end') left = tRect.right - tipRect.width;
      else left = centerX - tipRect.width / 2;
    } else if (side === 'left') {
      left = tRect.left - tipRect.width - offset;
      if (align === 'start') top = tRect.top;
      else if (align === 'end') top = tRect.bottom - tipRect.height;
      else top = centerY - tipRect.height / 2;
    } else {
      left = tRect.right + offset;
      if (align === 'start') top = tRect.top;
      else if (align === 'end') top = tRect.bottom - tipRect.height;
      else top = centerY - tipRect.height / 2;
    }

    if (lockToTriggerRight && (side === 'top' || side === 'bottom')) {
      left = Math.max(tRect.right - tipRect.width, margin); // 오른쪽을 고정, 왼쪽만 마진
    } else {
      left = clamp(left, margin, vw - tipRect.width - margin);
    }
    top = clamp(top, margin, vh - tipRect.height - margin);

    const arrow: { left?: number; top?: number } = {};
    if (side === 'top' || side === 'bottom') {
      const ideal = centerX - left;
      arrow.left = clamp(ideal, arrowSize + 8, tipRect.width - arrowSize - 8);
    } else {
      const ideal = centerY - top;
      arrow.top = clamp(ideal, arrowSize + 8, tipRect.height - arrowSize - 8);
    }

    setCoords({ top, left });
    setArrowPos(arrow);
  }, [align, offset, side, lockToTriggerRight]);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(updatePosition);
    tipRef.current && ro.observe(tipRef.current);
    triggerRef.current && ro.observe(triggerRef.current);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [isOpen, updatePosition]);

  useEffect(() => setMounted(true), []);

  const clearTimers = () => {
    if (showTimer.current) {
      window.clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const scheduleOpen = () => {
    if (disabled) return;
    clearTimers();
    showTimer.current = window.setTimeout(() => setOpen(true), showDelay);
  };
  const scheduleClose = () => {
    clearTimers();
    hideTimer.current = window.setTimeout(() => setOpen(false), hideDelay);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!(isOpen && trigger === 'click')) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || tipRef.current?.contains(t))
        return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
  }, [isOpen, trigger, setOpen]);

  const triggerHandlers =
    trigger === 'click'
      ? {
          onClick: () => setOpen(!isOpen),
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen(!isOpen);
            }
          },
        }
      : {
          onMouseEnter: scheduleOpen,
          onMouseLeave: scheduleClose,
          onFocus: scheduleOpen,
          onBlur: scheduleClose,
        };

  const bubble =
    'relative rounded-[4px] bg-gray-800 text-white px-[1.2rem] py-[0.9rem] caption2 shadow-xl';
  const arrowBase = 'absolute w-2.5 h-2.5 rotate-45 bg-gray-800';

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-block align-middle"
        aria-describedby={isOpen ? id : undefined}
        {...triggerHandlers}
      >
        {children}
      </span>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            id={id}
            role="tooltip"
            className="pointer-events-auto fixed z-[60]"
            style={{
              top: coords?.top ?? -9999,
              left: coords?.left ?? -9999,
              maxWidth,
            }}
            ref={tipRef}
          >
            <div className={`${bubble} ${className}`}>
              {content}
              {side === 'bottom' && (
                <div
                  className={arrowBase}
                  style={{ top: -4, left: arrowPos.left }}
                />
              )}
              {side === 'top' && (
                <div
                  className={arrowBase}
                  style={{ bottom: -4, left: arrowPos.left }}
                />
              )}
              {side === 'left' && (
                <div
                  className={arrowBase}
                  style={{ right: -4, top: arrowPos.top }}
                />
              )}
              {side === 'right' && (
                <div
                  className={arrowBase}
                  style={{ left: -4, top: arrowPos.top }}
                />
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export function InfoTooltipButton({
  text = '구성이 궁금해요',
  content,
  side = 'bottom',
  align = 'end',
  offset = 8,
  maxWidth = 320,
  className = '',
}: {
  text?: string;
  content: React.ReactNode;
  side?: Side;
  align?: Align;
  offset?: number;
  maxWidth?: number;
  className?: string;
}) {
  return (
    <Tooltip
      content={content}
      side={side}
      align={align}
      offset={offset}
      maxWidth={maxWidth}
      trigger="click"
      className={className}
      lockToTriggerRight
    >
      <button
        type="button"
        aria-label={text}
        style={{ touchAction: 'manipulation' }}
        className="caption4 flex cursor-pointer items-center gap-[0.2rem] rounded-[4px] bg-gray-100 py-[0.45rem] pr-[0.6rem] pl-[0.2rem] text-gray-600 hover:bg-gray-200/90"
      >
        <Icon name="info" size={1.6} className="text-gray-500" />
        <span>{text}</span>
      </button>
    </Tooltip>
  );
}
