import type { ReactNode } from 'react';
import Icon from '@/shared/components/icon';
import type { OnboardingIllustration } from '@/pages/onboarding/constants/icons';

type Props = {
  lines: ReadonlyArray<string>;
  icon: OnboardingIllustration;
  alt: string;
  extra?: ReactNode;
};

export default function StepLayout({ lines, icon, alt, extra }: Props) {
  return (
    <div className="flex-col-center w-full">
      <div className="head2 text-center text-black">
        {lines.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>

      <span role="img" aria-label={alt} className="mb-[0] flex select-none">
        <Icon name={icon} width={20} height={30} />
      </span>

      {extra}
    </div>
  );
}
