import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  SECTION_META,
  SECTION_KEYS,
  type SectionKey,
} from '@/shared/constants/sections';
import ProductCard from '@/pages/main/components/product-card';
import { mockDeliveryProducts, mockPickupProducts } from '@/shared/mocks';
import TopBar from '@/shared/layouts/top-bar';

export default function SectionListPage() {
  const { section } = useParams<{ section: SectionKey }>();
  const [sp] = useSearchParams();
  const navigate = useNavigate();

  const mode = (sp.get('mode') ?? 'delivery') as 'delivery' | 'pickup';

  if (!section || !SECTION_KEYS.includes(section)) {
    return <div className="p-6">존재하지 않는 섹션입니다.</div>;
  }

  const rawTitle = SECTION_META[section].title;
  const title = typeof rawTitle === 'string' ? rawTitle : rawTitle[mode];

  const data = mode === 'delivery' ? mockDeliveryProducts : mockPickupProducts;

  return (
    <div className="pb-8">
      <TopBar title={title} showBack onBack={() => navigate(-1)} sticky />

      <div className="flex-col gap-[2rem] px-[2rem] pt-[0.8rem]">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} variant="wide" />
        ))}
      </div>
    </div>
  );
}
