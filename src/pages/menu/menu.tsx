import { useMemo, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { useGeolocation } from '@/shared/hooks/use-geolocation';
import { useNavigate } from 'react-router-dom';
import Icon from '@/shared/components/icon';
import { renderToString } from 'react-dom/server';
import SearchTextField from '@/shared/components/text-field/search-text-field';
import BottomSheet from '@/shared/components/bottom-sheet';

export default function MenuPage() {
  const { loc, loading, error, request } = useGeolocation({
    immediate: true,
    watch: false,
    options: { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
  });

  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');

  const soongsilBase = { lat: 37.4963, lng: 126.9575 };
  const center = loc ?? soongsilBase;

  const navigate = useNavigate();

  const testRestaurants = [
    {
      id: 1,
      name: '정문돈까스',
      lat: soongsilBase.lat + 0.0018,
      lng: soongsilBase.lng - 0.0012,
    },
    {
      id: 2,
      name: '상도라멘',
      lat: soongsilBase.lat + 0.001,
      lng: soongsilBase.lng + 0.001,
    },
    {
      id: 3,
      name: '숭실카레집',
      lat: soongsilBase.lat - 0.0012,
      lng: soongsilBase.lng + 0.0008,
    },
    {
      id: 4,
      name: '상도불백',
      lat: soongsilBase.lat - 0.0018,
      lng: soongsilBase.lng - 0.001,
    },
    {
      id: 5,
      name: '홍콩반점 숭실',
      lat: soongsilBase.lat + 0.0006,
      lng: soongsilBase.lng - 0.0015,
    },
    {
      id: 6,
      name: '밥버거 숭실',
      lat: soongsilBase.lat - 0.0005,
      lng: soongsilBase.lng + 0.0016,
    },
  ];

  const myMarkerIcon = useMemo(
    () => ({
      content: renderToString(
        <div style={{ transform: 'translate(-50%, -100%)' }}>
          <Icon
            name="location"
            size={2.4}
            className="text-primary"
            ariaHidden
          />
        </div>,
      ),
    }),
    [],
  );

  const restaurantMarkerIcon = useMemo(
    () => ({
      content: renderToString(
        <div style={{ transform: 'translate(-50%, -100%)' }}>
          <Icon
            name="location"
            size={2.4}
            className="text-primary"
            ariaHidden
          />
        </div>,
      ),
    }),
    [],
  );

  // 바텀시트 임시 데이터(이미 구현 완료되면 제거)
  const STORES = [
    {
      id: 'a1',
      image: 'https://picsum.photos/seed/a1/960/540',
      title: '스타벅스 숭실대입구역점',
      distance: '1.8km',
      date: '00:00 ~ 17:00',
      place: '숭실대입구',
    },
    {
      id: 'a2',
      image: 'https://picsum.photos/seed/a2/960/540',
      title: '시크릿 런치 밀박스',
      distance: '1.2km',
      date: '10:00 ~ 19:00',
      place: '상도',
    },
  ];

  return (
    <div className="h-dvh w-full">
      <SearchTextField
        value={query}
        onChange={setQuery}
        onSubmit={(v) => setSubmitted(v)}
        onBack={() => navigate(-1)}
        onClear={() => setQuery('')}
        autoFocus={false}
        showBackButton
        showSearchIcon
        className="sticky top-0 z-[var(--z-header)] bg-white"
        placeholder="검색어를 입력해주세요."
      />

      <MapDiv
        style={{ width: '100%', height: '100dvh' }}
        fallback={
          <div className="grid h-full place-items-center">지도 로딩 중…</div>
        }
      >
        <NaverMap defaultCenter={soongsilBase} center={center} defaultZoom={16}>
          <Marker position={center} icon={myMarkerIcon as any} />
          {testRestaurants.map((p) => (
            <Marker
              key={p.id}
              position={{ lat: p.lat, lng: p.lng }}
              icon={restaurantMarkerIcon as any}
            />
          ))}
        </NaverMap>
      </MapDiv>

      <BottomSheet height={80} minHeight={82}>
        <div className="px-[1.6rem] py-[1.2rem] select-none">
          <h2 className="text-body1 mb-[1.2rem] font-bold text-black">
            주변 전시 리스트
          </h2>
          {STORES.map((exhibition) => (
            <div key={exhibition.id} className="mb-[1.6rem]">
              <img
                src={exhibition.image}
                alt={exhibition.title}
                className="h-[14rem] w-full rounded-[0.6rem] object-cover"
              />
              <div className="mt-[0.8rem] flex items-center justify-between">
                <h3 className="text-body3 font-semibold text-black">
                  {exhibition.title}
                </h3>
                <span className="text-caption2 font-semibold text-red-500">
                  {exhibition.distance}
                </span>
              </div>
              <div className="text-caption3 mt-[0.6rem] flex items-center justify-between text-gray-500">
                <p>{exhibition.date}</p>
                <div className="flex items-center gap-[0.4rem] text-gray-600">
                  <Icon
                    name="location"
                    size={1.6}
                    className="text-primary"
                    ariaHidden
                  />
                  <span className="cursor-pointer hover:underline">
                    {exhibition.place}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </BottomSheet>

      {error && (
        <div className="absolute top-[1.2rem] left-1/2 -translate-x-1/2 rounded bg-white/90 px-[1.2rem] py-[0.8rem] shadow">
          위치 권한/가져오기 실패: {error.message}
          <button
            className="ml-[0.8rem] underline"
            onClick={request}
            disabled={loading}
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}
