import { cn } from '@/shared/libs/cn';
import {
  STEPPER_COLOR,
  STEPPER_SIZE,
  StepState,
} from '@/pages/recommend/constants/stepper';

type Props = {
  index: number;
  state: StepState;
  stepLabel?: string; // '단계'
  doneLabel?: string; // '완료'
};

export default function StepDot({
  index,
  state,
  stepLabel = '단계',
  doneLabel = '완료',
}: Props) {
  const isDone = state === 'done';
  const isCurrent = state === 'current';
  const number = index + 1;

  return (
    <div className="caption1 flex-col-center">
      <div
        className={cn(
          'grid place-items-center rounded-full',
          STEPPER_COLOR.dot[state],
        )}
        style={{ width: STEPPER_SIZE.dot, height: STEPPER_SIZE.dot }}
        aria-current={isCurrent ? 'step' : undefined}
        aria-label={`${number} ${isDone ? doneLabel : stepLabel}`}
      >
        {isDone ? <CheckIcon /> : <span className="caption1">{number}</span>}
      </div>

      <span
        className={cn(
          'caption1 mt-[0.8rem]',
          isDone ? STEPPER_COLOR.label.dim : STEPPER_COLOR.label.default,
        )}
      >
        {isDone ? doneLabel : stepLabel}
      </span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      aria-hidden
      className="block"
    >
      <path
        d="M5 10.5l3.2 3.2L15 7.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
