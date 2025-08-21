import { useEffect, useRef, useState } from 'react';
import Player, { LottieRefCurrentProps } from 'lottie-react';
import loadingLottie from '@/assets/lotties/loading.json';

type Props = {
  /** 외부 제어용 표시 여부 (true가 되는 순간부터 시작) */
  visible: boolean;
  /** 최종 완료 시 1회 호출 */
  onFinish?: () => void;
  /** 세션당 최소 1회는 노출 (시작 후에만 적용) */
  forceOnceInSession?: boolean;
  /** 강제 노출 최소 시간(ms) */
  minOnceMs?: number;
  /** 세션 키 */
  sessionKey?: string;
  /** 라티 loop 여부 */
  loop?: boolean;
  /** 크기 */
  size?: number;
  /** ✅ 최소 재생 루프 수 (기본 2) */
  minLoops?: number;
};

const DEFAULT_KEY = 'recommend_lottie_seen';

export default function RecommendLoading({
  visible,
  onFinish,
  forceOnceInSession = true,
  minOnceMs = 1200,
  sessionKey = DEFAULT_KEY,
  loop = true,
  size = 320,
  minLoops = 2,
}: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const [started, setStarted] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);
  const finishCalledRef = useRef(false);

  useEffect(() => {
    if (visible && !started) {
      setStarted(true);
      setLoopCount(0);
      finishCalledRef.current = false;
      lottieRef.current?.goToAndPlay?.(0, true);
    }
  }, [visible, started]);

  useEffect(() => {
    if (!started || !forceOnceInSession) return;
    const already = sessionStorage.getItem(sessionKey) === '1';
    if (!already) {
      sessionStorage.setItem(sessionKey, '1');
      const until = Date.now() + minOnceMs;
      setLockUntil(until);
      const id = window.setTimeout(() => setLockUntil(0), minOnceMs);
      return () => window.clearTimeout(id);
    }
  }, [started, forceOnceInSession, minOnceMs, sessionKey]);

  const callFinishOnce = () => {
    if (finishCalledRef.current) return;
    finishCalledRef.current = true;
    onFinish?.();
  };

  const handleLoopComplete = () => {
    setLoopCount((prev) => {
      const next = prev + 1;
      if (next >= Math.max(1, minLoops)) callFinishOnce();
      return next;
    });
  };

  const handleCompleteOnce = () => {
    setLoopCount((prev) => {
      const next = prev + 1;
      if (next >= Math.max(1, minLoops)) {
        callFinishOnce();
      } else {
        lottieRef.current?.goToAndPlay?.(0, true);
      }
      return next;
    });
  };

  const now = Date.now();
  const forced = lockUntil > now;

  const loopsLock = loopCount < Math.max(1, minLoops);
  const finalVisible = started && (visible || forced || loopsLock);

  useEffect(() => {
    if (started && !finalVisible) {
      setStarted(false);
      setLoopCount(0);
      finishCalledRef.current = false;
    }
  }, [started, finalVisible]);

  if (!finalVisible) return null;

  return (
    <div className="fixed inset-0 z-[20] grid place-items-center bg-white">
      <div className="flex w-[28rem] max-w-[90vw] flex-col items-center gap-16">
        <Player
          lottieRef={lottieRef}
          autoplay
          loop={loop}
          animationData={loadingLottie}
          style={{ width: size, height: size }}
          className="pointer-events-none"
          onLoopComplete={loop ? handleLoopComplete : undefined}
          onComplete={!loop ? handleCompleteOnce : undefined}
        />
        <p className="body1 text-center text-black">
          AI가 주문 기록을 바탕으로
          <br />
          000님이 좋아하실 만한
          <br />
          상품을 고르고 있어요
        </p>
      </div>
    </div>
  );
}
