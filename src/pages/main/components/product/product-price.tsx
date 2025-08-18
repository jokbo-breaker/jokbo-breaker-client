import { formatKRW } from '@/shared/utils/format-krw';

type ProductPriceProps = {
  discount: number;
  price: number;
  originalPrice?: number;
};

export default function ProductPrice({ discount, price, originalPrice }: ProductPriceProps) {
  return (
    <div className="flex items-center gap-[0.4rem]">
      {discount > 0 && <span className="text-caption1 text-primary">{discount}%</span>}
      <span className="text-body3 text-black">{formatKRW(price)}</span>
      {originalPrice && (
        <span className="text-caption2 text-gray-300">{formatKRW(originalPrice)}</span>
      )}
    </div>
  );
}
