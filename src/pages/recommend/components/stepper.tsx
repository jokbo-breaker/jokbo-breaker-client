import { cn } from '@/shared/libs/cn';
import StepDot from '@/pages/recommend/components/stepper-dot';
import { useStepper } from '@/shared/hooks/use-stepper';
import {
  STEPPER_COLOR,
  STEPPER_SIZE,
} from '@/pages/recommend//constants/stepper';

type StepperProps = {
  total?: number;
  current?: number;
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
  const { states, isConnectorActive } = useStepper(total, current);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center">
        {states.map((state, i) => (
          <div key={i} className="flex flex-1 items-center">
            <StepDot
              index={i}
              state={state}
              stepLabel={stepLabel}
              doneLabel={doneLabel}
            />

            {i < states.length - 1 && (
              <div
                className={cn(
                  'mx-[1.2rem] flex-1 rounded-full',
                  isConnectorActive(i)
                    ? STEPPER_COLOR.line.active
                    : STEPPER_COLOR.line.inactive,
                )}
                style={{ height: STEPPER_SIZE.line }}
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
