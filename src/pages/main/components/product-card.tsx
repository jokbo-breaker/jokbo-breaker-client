import { Product } from '@/shared/types';
import Icon from '@/shared/components/icon';
import Badge from '@/pages/main/components/count-badge';
import { formatKRW } from '@/shared/utils/format-krw';
import { cn } from '@/shared/libs/cn';
import React from 'react';

type Props = {
  product: Product;
  variant?: 'compact' | 'wide';
  className?: string;
};

function ProductCard({ product, variant = 'compact', className }: Props) {
  const {
    image,
    store,
    name,
    discount,
    price,
    originalPrice,
    remainingBadge,
    hours,
    distanceKm,
  } = product;

  const Price = () => (
    <div className="flex items-center gap-[0.4rem]">
      {discount > 0 && (
        <span className="text-caption1 text-primary">{discount}%</span>
      )}
      <span className="text-body3 text-black">{formatKRW(price)}</span>
      {originalPrice && (
        <span className="text-caption2 text-gray-300">
          {formatKRW(originalPrice)}
        </span>
      )}
    </div>
  );

  const Meta = () => (
    <div className="text-caption4 flex items-center gap-[0.4rem] text-gray-600">
      <span className="flex items-center gap-[0.2rem]">
        <Icon name="cart" size={1.2} />
        {hours}
      </span>
      <span aria-hidden>|</span>
      <span>{distanceKm.toFixed(1)}km</span>
    </div>
  );

  if (variant === 'wide') {
    return (
      <article
        className={cn(
          'relative w-full flex-col gap-[1rem] overflow-hidden',
          className,
        )}
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="h-[16rem] w-full rounded-[4px] object-cover"
          />
          {remainingBadge && <Badge>{remainingBadge}</Badge>}
        </div>
        <div className="flex-col gap-[0.2rem]">
          <div className="flex-col">
            <h4 className="text-caption1 text-black">{store}</h4>
            <h3 className="text-body3 text-black">{name}</h3>
          </div>
          <Price />
          <Meta />
        </div>
      </article>
    );
  }

  // compact
  return (
    <article className={cn('relative w-full overflow-hidden', className)}>
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-[14rem] w-full rounded-[4px] object-cover"
        />
        {remainingBadge && <Badge>{remainingBadge}</Badge>}
      </div>
      <div className="mt-[1rem] flex-col gap-[0.2rem]">
        <div className="flex-col">
          <h4 className="text-caption3 text-black">{store}</h4>
          <h3 className="text-caption2 text-black">{name}</h3>
        </div>
        <Price />
        <Meta />
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
