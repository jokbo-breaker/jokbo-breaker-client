import StepLayout from './step-layout';
import { ONBOARDING_STEPS } from '@/pages/onboarding/constants/steps';

export default function Step3() {
  const { lines, icon, alt } = ONBOARDING_STEPS[2];
  return <StepLayout lines={lines} icon={icon} alt={alt} />;
}
