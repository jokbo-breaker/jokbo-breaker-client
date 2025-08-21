import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '@/pages/main/components/section-header';
import { cn } from '@/shared/libs/cn';
import type { SectionKey } from '@/shared/constants/sections';

type Props = {
  title: string;
  sectionKey: SectionKey;
  children: React.ReactNode;
  itemWidthClass?: string;
  className?: string;
  listClassName?: string;
  mode?: 'delivery' | 'pickup';
};

export default function Section({
  title,
  sectionKey,
  children,
  itemWidthClass,
  className,
  listClassName,
  mode = 'delivery',
}: Props) {
  const items = React.Children.toArray(children);
  const navigate = useNavigate();

  return (
    <section className={cn('flex-col gap-[1.2rem]', className)}>
      <SectionHeader
        title={title}
        onMoreClick={() => navigate(`/main/${sectionKey}?mode=${mode}`)}
      />
      <div
        className={cn('scrollbar-hide flex gap-[1.2rem] overflow-x-auto', listClassName)}
        role="list"
        aria-label={`${title} 목록`}
      >
        {items.map((child, i) => (
          <div key={i} role="listitem" className={cn('shrink-0', itemWidthClass)}>
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}
