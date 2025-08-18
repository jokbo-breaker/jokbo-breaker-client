import type { Product } from '@/shared/types';

export const mockDeliveryProducts: Product[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1880&auto=format&fit=crop',
    store: '스타벅스 숭실대입구역점',
    name: '시크릿 런치 밀박스',
    discount: 20,
    price: 10800,
    originalPrice: 13500,
    remainingBadge: '9개 남음',
    hours: '00:00 ~ 17:00',
    distanceKm: 1.8,
    address: '서울시 동작구 사당로 4 1-2층',
    phone: '010-1111-3333',
    pickupPrice: 9800,
    teamDeliveryAfter: '오후 5시 15분 이후',
    description:
      '레스토랑 루미에르의 스페셜 디너 밀키트로 특별한 미식을 만나보세요. 신선한 재료로 정성껏 준비한 트러플 크림 파스타, 깊은 풍미의 허브그릴 스테이크, 그리고 계절 재료를 활용한 시트러스 해산물 샐러드를 최대 50% 할인된 가격에 제공합니다...',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1880&auto=format&fit=crop',
    store: '케이크팜',
    name: '스페셜 디저트박스',
    discount: 20,
    price: 10800,
    originalPrice: 13500,
    remainingBadge: '7개 남음',
    hours: '10:00 ~ 20:00',
    distanceKm: 2.1,
    address: '서울시 동작구 상도로 12',
    phone: '010-2222-3333',
    pickupPrice: 9500,
    teamDeliveryAfter: '오후 6시 이후',
    description:
      '레스토랑 루미에르의 스페셜 디너 밀키트로 특별한 미식을 만나보세요. 신선한 재료로 정성껏 준비한 트러플 크림 파스타, 깊은 풍미의 허브그릴 스테이크, 그리고 계절 재료를 활용한 시트러스 해산물 샐러드를 최대 50% 할인된 가격에 제공합니다...',
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1880&auto=format&fit=crop',
    store: '스타벅스 숭실대입구역점',
    name: '모닝 샌드위치 세트',
    discount: 15,
    price: 9200,
    originalPrice: 10800,
    remainingBadge: '5개 남음',
    hours: '07:30 ~ 11:00',
    distanceKm: 1.4,
    address: '서울시 동작구 사당로 4 1-2층',
    phone: '010-1111-3333',
    pickupPrice: 8500,
    teamDeliveryAfter: '오전 11시 이후',
    description:
      '레스토랑 루미에르의 스페셜 디너 밀키트로 특별한 미식을 만나보세요. 신선한 재료로 정성껏 준비한 트러플 크림 파스타, 깊은 풍미의 허브그릴 스테이크, 그리고 계절 재료를 활용한 시트러스 해산물 샐러드를 최대 50% 할인된 가격에 제공합니다...',
  },
];

export const mockPickupProducts: Product[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1880&auto=format&fit=crop',
    store: '스타벅스 숭실대입구역점',
    name: '시크릿 런치 밀박스',
    discount: 20,
    price: 10800,
    originalPrice: 13500,
    remainingBadge: '9개 남음',
    hours: '00:00 ~ 17:00',
    distanceKm: 1.8,
    address: '서울시 동작구 사당로 4 1-2층',
    phone: '010-1111-3333',
    pickupPrice: 9800,
    teamDeliveryAfter: '오후 5시 15분 이후',
    description:
      '레스토랑 루미에르의 스페셜 디너 밀키트로 특별한 미식을 만나보세요. 신선한 재료로 정성껏 준비한 트러플 크림 파스타, 깊은 풍미의 허브그릴 스테이크, 그리고 계절 재료를 활용한 시트러스 해산물 샐러드를 최대 50% 할인된 가격에 제공합니다...',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1880&auto=format&fit=crop',
    store: '케이크팜',
    name: '스페셜 디저트박스',
    discount: 20,
    price: 10800,
    originalPrice: 13500,
    remainingBadge: '6개 남음',
    hours: '10:00 ~ 20:00',
    distanceKm: 2.1,
    address: '서울시 동작구 상도로 12',
    phone: '010-2222-3333',
    pickupPrice: 9500,
    teamDeliveryAfter: '오후 6시 이후',
    description:
      '레스토랑 루미에르의 스페셜 디너 밀키트로 특별한 미식을 만나보세요. 신선한 재료로 정성껏 준비한 트러플 크림 파스타, 깊은 풍미의 허브그릴 스테이크, 그리고 계절 재료를 활용한 시트러스 해산물 샐러드를 최대 50% 할인된 가격에 제공합니다...',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1880&auto=format&fit=crop',
    store: '빵굽는집',
    name: '크로와상 & 아메리카노',
    discount: 10,
    price: 6300,
    originalPrice: 7000,
    remainingBadge: '4개 남음',
    hours: '08:00 ~ 19:00',
    distanceKm: 1.2,
    address: '서울시 동작구 대방천로 8',
    phone: '010-3333-4444',
    pickupPrice: 5900,
    teamDeliveryAfter: '오후 4시 이후',
    description:
      '레스토랑 루미에르의 스페셜 디너 밀키트로 특별한 미식을 만나보세요. 신선한 재료로 정성껏 준비한 트러플 크림 파스타, 깊은 풍미의 허브그릴 스테이크, 그리고 계절 재료를 활용한 시트러스 해산물 샐러드를 최대 50% 할인된 가격에 제공합니다...',
  },
];
