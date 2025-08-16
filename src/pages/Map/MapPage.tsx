import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { useGeolocation } from '@/shared/hooks/useGeolocation';

export default function MapPage() {
  const { loc, loading, error, request } = useGeolocation({
    immediate: true,
    watch: false,
    options: { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
  });

  const fallback = { lat: 37.5665, lng: 126.978 };

  return (
    <div className="h-dvh w-full">
      <MapDiv
        style={{ width: '100%', height: '100vh' }}
        fallback={<div className="grid h-full place-items-center">지도 로딩 중…</div>}
      >
        <NaverMap defaultCenter={fallback} center={loc ?? fallback} defaultZoom={16}>
          {loc && <Marker position={loc} />}
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
