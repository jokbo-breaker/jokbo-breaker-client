import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  PropsWithChildren,
} from 'react';
import { createPortal } from 'react-dom';

export type Side = 'top' | 'bottom' | 'left' | 'right';
export type Align = 'center' | 'start' | 'end';
export type Trigger = 'hover' | 'click';

export type TooltipProps = PropsWithChildren<{
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
      left = Math.max(tRect.right - tipRect.width, margin);
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
    const ro = new (window as any).ResizeObserver(updatePosition);
    tipRef.current && ro.observe(tipRef.current);
    triggerRef.current && ro.observe(triggerRef.current);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      ro.disconnect?.();
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

  useEffect(() => {
    const el = tipRef.current;
    if (!el) return;
    const top = coords?.top ?? -9999;
    const left = coords?.left ?? -9999;
    el.style.setProperty('--tt-top', `${top}px`);
    el.style.setProperty('--tt-left', `${left}px`);
    el.style.setProperty('--tt-max-w', `${maxWidth}px`);
  }, [coords, maxWidth, isOpen]);

  useEffect(() => {
    const el = tipRef.current;
    if (!el) return;
    if (side === 'top' || side === 'bottom') {
      el.style.setProperty('--tt-arrow-left', `${arrowPos.left ?? 0}px`);
      el.style.removeProperty('--tt-arrow-top');
    } else {
      el.style.setProperty('--tt-arrow-top', `${arrowPos.top ?? 0}px`);
      el.style.removeProperty('--tt-arrow-left');
    }
  }, [arrowPos, side]);

  const bubble =
    'relative rounded-[4px] bg-gray-800 text-white px-[1.2rem] py-[0.9rem] caption2 shadow-xl';
  const arrowBase = 'tooltip-arrow w-2.5 h-2.5 rotate-45 bg-gray-800';

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
            ref={tipRef}
            className="tooltip-root pointer-events-auto fixed z-[60]"
          >
            <div className={`${bubble} ${className}`}>
              {content}
              {side === 'bottom' && (
                <div className={`${arrowBase} tooltip-arrow--bottom`} />
              )}
              {side === 'top' && (
                <div className={`${arrowBase} tooltip-arrow--top`} />
              )}
              {side === 'left' && (
                <div className={`${arrowBase} tooltip-arrow--left`} />
              )}
              {side === 'right' && (
                <div className={`${arrowBase} tooltip-arrow--right`} />
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
