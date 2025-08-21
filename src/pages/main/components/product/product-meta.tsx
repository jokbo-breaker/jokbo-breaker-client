import Icon from '@/shared/components/icon';
import type { Product } from '@/shared/types';

type MetaProps = Pick<Product, 'hours' | 'distanceKm'>;

const Meta = ({ hours, distanceKm }: MetaProps) => (
  <div className="caption4 flex items-center gap-[0.4rem] text-gray-600">
    <span className="flex items-center gap-[0.2rem]">
      <Icon name="cart" size={1.2} />
      {hours}
    </span>
    <span aria-hidden>|</span>
    <span>{distanceKm.toFixed(1)}km</span>
  </div>
);

export default Meta;
