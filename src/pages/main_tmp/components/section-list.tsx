import React from 'react';
import SectionHeader from '@/pages/main_tmp/components/section-header';
import { cn } from '@/shared/libs/cn';

type Props = {
  title: string;
  children: React.ReactNode;
  itemWidthClass?: string;
  className?: string;
  listClassName?: string;
};

function Section({
  title,
  children,
  itemWidthClass,
  className,
  listClassName,
}: Props) {
  const items = React.Children.toArray(children);

  return (
    <section className={cn('flex-col gap-[1.2rem]', className)}>
      <SectionHeader
        title={title}
        onMoreClick={() => alert(`${title} 더보기 클릭!`)}
      />

      <div
        className={cn(
          'scrollbar-hide flex gap-[1.2rem] overflow-x-auto',
          listClassName,
        )}
        role="list"
        aria-label={`${title} 목록`}
      >
        {items.map((child, i) => (
          <div
            key={i}
            role="listitem"
            className={cn('shrink-0 snap-start', itemWidthClass)}
          >
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Section;
