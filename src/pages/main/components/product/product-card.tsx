import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/shared/types';
import Meta from '@/pages/main/components/product/product-meta';
import Badge from '@/pages/main/components/count-badge';
import { cn } from '@/shared/libs/cn';
import ProductPrice from '@/pages/main/components/product/product-price';

export type ProductCardProps = {
  product: Product;
  variant?: 'compact' | 'wide';
  className?: string;
};

function Block({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('animate-pulse rounded-[4px] bg-gray-100', className)}
    />
  );
}

export function ProductCardSkeleton({
  variant = 'compact',
  className,
}: {
  variant?: 'compact' | 'wide';
  className?: string;
}) {
  if (variant === 'wide') {
    return (
      <article
        className={cn(
          'relative w-full flex-col gap-[1rem] overflow-hidden',
          className,
        )}
      >
        <Block className="aspect-[21/10] w-full" />
        <div className="flex-col gap-[0.6rem]">
          <Block className="h-[1.2rem] w-[30%]" />
          <Block className="h-[1.6rem] w-[60%]" />
          <Block className="h-[1.6rem] w-[40%]" />
          <Block className="h-[1.2rem] w-[50%]" />
        </div>
      </article>
    );
  }

  return (
    <article className={cn('relative w-full overflow-hidden', className)}>
      <Block className="h-[14rem] w-full" />
      <div className="mt-[1rem] flex-col gap-[0.6rem]">
        <Block className="h-[1.0rem] w-[40%]" />
        <Block className="h-[1.2rem] w-[70%]" />
        <Block className="h-[1.6rem] w-[50%]" />
        <Block className="h-[1.0rem] w-[60%]" />
      </div>
    </article>
  );
}

function ProductCard({
  product,
  variant = 'compact',
  className,
}: ProductCardProps) {
  const {
    image,
    store,
    name,
    discount,
    price,
    originalPrice,
    stockLeft,
    hours,
    distanceKm,
  } = product;
  const navigate = useNavigate();

  if (variant === 'wide') {
    return (
      <article
        className={cn(
          'relative w-full cursor-pointer flex-col gap-[1rem] overflow-hidden',
          className,
        )}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="aspect-[21/10] min-h-[16rem] w-full min-w-[35rem] rounded-[4px] object-cover"
          />
          {stockLeft && <Badge>{stockLeft}개 남음</Badge>}
        </div>
        <div className="flex-col gap-[0.2rem]">
          <div className="flex-col">
            <h4 className="caption1 text-black">{store}</h4>
            <h3 className="body3 text-black">{name}</h3>
          </div>
          <ProductPrice
            discount={discount}
            price={price}
            originalPrice={originalPrice}
          />
          <Meta hours={hours} distanceKm={distanceKm} />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'relative w-full cursor-pointer overflow-hidden',
        className,
      )}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-[14rem] w-full rounded-[4px] object-cover"
        />
        {stockLeft && <Badge>{stockLeft}개 남음</Badge>}
      </div>
      <div className="mt-[1rem] flex-col gap-[0.2rem]">
        <div className="flex-col">
          <h4 className="caption3 text-black">{store}</h4>
          <h3 className="caption2 text-black">{name}</h3>
        </div>
        <ProductPrice
          discount={discount}
          price={price}
          originalPrice={originalPrice}
        />
        <Meta hours={hours} distanceKm={distanceKm} />
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
