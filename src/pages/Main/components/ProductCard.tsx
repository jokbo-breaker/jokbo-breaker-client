import { Product } from '@/shared/types';
import Icon from '@/shared/components/icon';
import Ribbon from '@/pages/Main/components/Ribbon';
import { formatKRW } from '@/shared/utils/format-krw';

function ProductCard({
  product,
  variant = 'compact',
}: {
  product: Product;
  variant?: 'compact' | 'wide';
}) {
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
    <div className="mt-1 flex items-baseline gap-1">
      {discount > 0 && (
        <span className="text-sm font-bold text-rose-600">{discount}%</span>
      )}
      <span className="text-lg font-bold">{formatKRW(price)}</span>
      {originalPrice && (
        <span className="text-sm text-neutral-400 line-through">
          {formatKRW(originalPrice)}
        </span>
      )}
    </div>
  );

  const Meta = () => (
    <div className="mt-2 flex items-center gap-2 text-[12px] text-neutral-600">
      <Icon name="cart" size={1.2} />
      <span>
        {hours}
        <span className="mx-1">|</span>
        {distanceKm.toFixed(1)}km
      </span>
    </div>
  );

  if (variant === 'wide') {
    return (
      <article className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {remainingBadge && <Ribbon>{remainingBadge}</Ribbon>}
        </div>
        <div className="px-4 pt-3 pb-4">
          <h4 className="text-[13px] text-neutral-700">{store}</h4>
          <h3 className="mt-0.5 line-clamp-1 text-[15px] font-semibold">
            {name}
          </h3>
          <Price />
          <Meta />
        </div>
      </article>
    );
  }

  // compact
  return (
    <article className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {remainingBadge && <Ribbon>{remainingBadge}</Ribbon>}
      </div>
      <div className="px-3 pt-2 pb-3">
        <h4 className="text-[12px] text-neutral-700">{store}</h4>
        <h3 className="mt-0.5 line-clamp-1 text-[14px] font-semibold">
          {name}
        </h3>
        <Price />
        <Meta />
      </div>
    </article>
  );
}

export default ProductCard;
