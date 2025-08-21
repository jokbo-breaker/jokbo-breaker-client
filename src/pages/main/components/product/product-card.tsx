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

function ProductCard({ product, variant = 'compact', className }: ProductCardProps) {
  const { image, store, name, discount, price, originalPrice, remainingBadge, hours, distanceKm } =
    product;
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
            className="aspect-[21/10] w-full rounded-[4px] object-cover"
          />
          {remainingBadge && <Badge>{remainingBadge}</Badge>}
        </div>
        <div className="flex-col gap-[0.2rem]">
          <div className="flex-col">
            <h4 className="caption1 text-black">{store}</h4>
            <h3 className="body3 text-black">{name}</h3>
          </div>
          <ProductPrice discount={discount} price={price} originalPrice={originalPrice} />
          <Meta hours={hours} distanceKm={distanceKm} />
        </div>
      </article>
    );
  }

  // compact
  return (
    <article
      className={cn('relative w-full cursor-pointer overflow-hidden', className)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative">
        <img src={image} alt={name} className="h-[14rem] w-full rounded-[4px] object-cover" />
        {remainingBadge && <Badge>{remainingBadge}</Badge>}
      </div>
      <div className="mt-[1rem] flex-col gap-[0.2rem]">
        <div className="flex-col">
          <h4 className="caption3 text-black">{store}</h4>
          <h3 className="caption2 text-black">{name}</h3>
        </div>
        <ProductPrice discount={discount} price={price} originalPrice={originalPrice} />
        <Meta hours={hours} distanceKm={distanceKm} />
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
