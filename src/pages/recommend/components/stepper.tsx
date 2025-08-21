import { cn } from '@/shared/libs/cn';
import StepDot from '@/pages/recommend/components/stepper-dot';
import { useStepper } from '@/shared/hooks/use-stepper';
import { STEPPER_COLOR, STEPPER_SIZE } from '@/pages/recommend/constants/stepper';

type StepperProps = {
  total?: number;
  current?: number; // 1-based
  className?: string;
  stepLabel?: string;
  doneLabel?: string;
};

export default function Stepper({
  total = 3,
  current = 1,
  className,
  stepLabel,
  doneLabel,
}: StepperProps) {
  const { states } = useStepper(total, current);

  // 선 위치/여백
  const top = `calc(${STEPPER_SIZE.dot} / 2 - ${STEPPER_SIZE.line} / 2)`;
  const sidePad = `calc(${STEPPER_SIZE.dot} / 2)`;

  // 진행도 (1단계 완료 → current=2 라고 가정)
  const clamped = Math.max(1, Math.min(total, current));
  const progress = total > 1 ? (clamped - 1) / (total - 1) : 0;

  // 활성 트랙 실제 너비 (도트 중심 간 거리 = 100% - dot)
  const progressWidth = `calc((100% - ${STEPPER_SIZE.dot}) * ${progress})`;

  return (
    <div className={cn('relative w-full', className)}>
      {/* 배경 트랙 */}
      <div
        className={cn('absolute inset-x-0 rounded-full', STEPPER_COLOR.line.inactive)}
        style={{
          top,
          height: STEPPER_SIZE.line,
          marginLeft: sidePad,
          marginRight: sidePad,
        }}
        aria-hidden
      />

      {/* 활성 트랙 */}
      <div
        className={cn('absolute rounded-full', STEPPER_COLOR.line.active)}
        style={{
          top,
          height: STEPPER_SIZE.line,
          left: sidePad,
          width: progressWidth, // ← 핵심
        }}
        aria-hidden
      />

      {/* 도트 + 라벨 */}
      <div
        className="relative z-[1] flex items-start justify-between"
        style={{ paddingLeft: sidePad, paddingRight: sidePad }}
      >
        {states.map((state, i) => (
          <StepDot key={i} index={i} state={state} stepLabel={stepLabel} doneLabel={doneLabel} />
        ))}
      </div>
    </div>
  );
}
