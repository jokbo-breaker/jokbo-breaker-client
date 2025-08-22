import StepLayout from './step-layout';
import { ONBOARDING_STEPS } from '@/pages/onboarding/constants/steps';

export default function Step2() {
  const { lines, icon, alt } = ONBOARDING_STEPS[1];
  return <StepLayout lines={lines} icon={icon} alt={alt} />;
}
