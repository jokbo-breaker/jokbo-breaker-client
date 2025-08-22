import StepLayout from './step-layout';
import { ONBOARDING_STEPS } from '@/pages/onboarding/constants/steps';

export default function Step1() {
  const { lines, icon, alt } = ONBOARDING_STEPS[0];
  return <StepLayout lines={lines} icon={icon} alt={alt} />;
}
