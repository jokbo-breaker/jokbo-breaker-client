import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { useGeolocation } from '@/shared/hooks/use-geolocation';
import TopBar from '@/shared/layouts/top-bar';
import { useNavigate } from 'react-router-dom';
import Icon from '@/shared/components/icon';
import { useMemo } from 'react';
import { renderToString } from 'react-dom/server';

export default function MapViewPage() {
  const { loc, loading, error, request } = useGeolocation({
    immediate: true,
    watch: false,
    options: { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
  });

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
          <Icon name="location" size={2.4} className="text-primary" ariaHidden />
        </div>,
      ),
    }),
    [],
  );

  const restaurantMarkerIcon = useMemo(
    () => ({
      content: renderToString(
        <div style={{ transform: 'translate(-50%, -100%)' }}>
          <Icon name="location" size={2.4} className="text-primary" ariaHidden />
        </div>,
      ),
    }),
    [],
  );

  return (
    <div className="h-dvh w-full">
      <TopBar showBack onBack={() => navigate(-1)} sticky />

      <MapDiv
        style={{ width: '100%', height: '100vh' }}
        fallback={<div className="grid h-full place-items-center">지도 로딩 중…</div>}
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

      {error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded bg-white/90 px-3 py-2 shadow">
          위치 권한/가져오기 실패: {error.message}
          <button className="ml-2 underline" onClick={request} disabled={loading}>
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}
