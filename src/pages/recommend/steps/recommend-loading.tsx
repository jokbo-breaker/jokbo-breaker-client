import { useEffect, useRef, useState } from 'react';
import Player, { LottieRefCurrentProps } from 'lottie-react';
import loadingLottie from '@/assets/lotties/loading.json';

type Props = {
  /** 외부 제어용 표시 여부 */
  visible: boolean;
  /** 애니메이션 완료(첫 완료/첫 루프 완료) 시 1회 호출 */
  onFinish?: () => void;
  /** 세션당 최소 1회는 무조건 노출 */
  forceOnceInSession?: boolean;
  /** 강제 노출 최소 시간(ms) */
  minOnceMs?: number;
  /** 다른 로더와 구분하려면 키 변경 */
  sessionKey?: string;
  /** 라티 반복 재생 여부 */
  loop?: boolean;
  /** 라티 크기 */
  size?: number;
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
}: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [lockUntil, setLockUntil] = useState(0);
  const finishCalledRef = useRef(false);

  useEffect(() => {
    if (!forceOnceInSession) return;
    const already = sessionStorage.getItem(sessionKey) === '1';
    if (!already) {
      sessionStorage.setItem(sessionKey, '1');
      const until = Date.now() + minOnceMs;
      setLockUntil(until);
      const id = window.setTimeout(() => setLockUntil(0), minOnceMs);
      return () => window.clearTimeout(id);
    }
  }, [forceOnceInSession, minOnceMs, sessionKey]);

  const now = Date.now();
  const forced = lockUntil > now;
  const finalVisible = visible || forced;

  const callFinishOnce = () => {
    if (finishCalledRef.current) return;
    finishCalledRef.current = true;
    onFinish?.();
  };

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
          onComplete={!loop ? callFinishOnce : undefined}
          onLoopComplete={loop ? callFinishOnce : undefined}
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
