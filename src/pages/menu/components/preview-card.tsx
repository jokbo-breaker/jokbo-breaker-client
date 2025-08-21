import ProductCard from '@/pages/main/components/product/product-card';
import type { Product } from '@/shared/types';

type Props = {
  product: Product;
  onClose: () => void;
};

export default function PreviewCard({ product, onClose }: Props) {
  return (
    <div className="absolute right-0 bottom-[3rem] z-[var(--z-bottom-nav)]" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="pointer-events-auto mx-[2rem] mt-auto mb-[8rem] rounded-[1.2rem] bg-white px-[1rem] shadow-[0_0.4rem_2.0rem_rgba(0,0,0,0.16)] ring-1 ring-gray-200"
      >
        <div className="p-[1.2rem]">
          <ProductCard product={product} variant="wide" />
        </div>
      </div>
    </div>
  );
}
