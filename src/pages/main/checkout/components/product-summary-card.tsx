import type { Product } from '@/shared/types';
import QtyStepper from '@/pages/main/checkout/components/qty-stepper';

type Props = {
  product: Product;
  qty: number;
  onQtyChange: (v: number) => void;
};

export default function ProductSummaryCard({
  product,
  qty,
  onQtyChange,
}: Props) {
  return (
    <section className="flex items-center justify-between gap-[1.2rem]">
      <div className="flex items-center gap-[1.2rem]">
        <img
          src={product.image}
          alt={product.name}
          className="h-[6.4rem] w-[6.4rem] rounded-[1.2rem] object-cover ring-1 ring-gray-200"
        />
        <div className="flex-col gap-[0.4rem]">
          <p className="body3 text-black">{product.store}</p>
          <h2 className="body2 text-black">{product.name}</h2>
        </div>
      </div>

      <QtyStepper value={qty} onChange={onQtyChange} />
    </section>
  );
}
