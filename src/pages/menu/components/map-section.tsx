import { useEffect, useMemo, useRef, useState } from 'react';
import { Container as MapDiv, Marker, NaverMap } from 'react-naver-maps';
import type { Product } from '@/shared/types';
import { getMapInstance } from '@/pages/menu/utils/naver-map';
import { makeLocationPinHtml } from '@/pages/menu/utils/make-pin';

type Restaurant = { id: number; name: string; lat: number; lng: number };

type Props = {
  center: { lat: number; lng: number };
  defaultCenter: { lat: number; lng: number };
  restaurants: Restaurant[];
  products: Product[];
  focusedStoreName?: string | null;
  onPickPreview: (p: Product) => void;
  onMapTap: () => void;
  onStoreFocus: (storeName: string) => void;
};

export default function MapSection({
  center,
  defaultCenter,
  restaurants,
  products,
  focusedStoreName,
  onPickPreview,
  onMapTap,
  onStoreFocus,
}: Props) {
  const mapRef = useRef<any>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);

  const myMarkerIcon = useMemo(() => makeLocationPinHtml('text-primary'), []);
  const markerIcon = useMemo(() => makeLocationPinHtml('text-primary'), []);
  const focusedMarkerIcon = useMemo(
    () => makeLocationPinHtml('text-black'),
    [],
  );

  const handleMapRef = (node: any) => {
    mapRef.current = node;
    const inst = getMapInstance(node);
    if (inst) setMapInstance(inst);
  };

  useEffect(() => {
    const n = (window as any).naver;
    if (!n?.maps || !mapInstance) return;

    const off: any[] = [];
    off.push(n.maps.Event.addListener(mapInstance, 'click', onMapTap));
    off.push(n.maps.Event.addListener(mapInstance, 'tap', onMapTap));
    return () => off.forEach((h) => n.maps.Event.removeListener(h));
  }, [mapInstance, onMapTap]);

  // focusedStoreName이 바뀌면 해당 매장 좌표로 부드럽게 이동(옵션)
  useEffect(() => {
    const n = (window as any).naver;
    if (!n?.maps || !mapInstance || !focusedStoreName) return;
    const target = restaurants.find((r) => r.name === focusedStoreName);
    if (target) {
      mapInstance.panTo(new n.maps.LatLng(target.lat, target.lng));
    }
  }, [focusedStoreName, mapInstance, restaurants]);

  const handleMarkerClick = (r: Restaurant) => {
    // 매장명으로 해당 상품 찾기 → 없으면 첫 상품 폴백
    const hit = products.find((p) => p.store === r.name) || products[0];
    onStoreFocus(r.name);
    if (hit) onPickPreview(hit);
  };

  return (
    <MapDiv
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      fallback={
        <div className="grid h-full place-items-center">지도 로딩 중…</div>
      }
    >
      <NaverMap
        defaultCenter={defaultCenter}
        center={center}
        defaultZoom={16}
        ref={handleMapRef}
      >
        <Marker position={center} icon={myMarkerIcon as any} />

        {restaurants.map((r) => {
          const isFocused = !!focusedStoreName && r.name === focusedStoreName;
          return (
            <Marker
              key={r.id}
              position={{ lat: r.lat, lng: r.lng }}
              icon={(isFocused ? focusedMarkerIcon : markerIcon) as any}
              zIndex={isFocused ? 1000 : 0}
              onClick={() => handleMarkerClick(r)}
            />
          );
        })}
      </NaverMap>
    </MapDiv>
  );
}
