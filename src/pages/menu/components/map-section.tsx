import { useEffect, useMemo, useRef, useState } from 'react';
import { Container as MapDiv, Marker, NaverMap } from 'react-naver-maps';
import type { Product } from '@/shared/types';
import { getMapInstance } from '@/pages/menu/utils/naver-map';
import { makeLocationPinHtml } from '@/pages/menu/utils/make-pin';

type Restaurant = { id: number; lat: number; lng: number };

type Props = {
  center: { lat: number; lng: number };
  defaultCenter: { lat: number; lng: number };
  restaurants: Restaurant[];
  products: Product[];
  onPickPreview: (p: Product) => void;
  onMapTap: () => void;
};

export default function MapSection({
  center,
  defaultCenter,
  restaurants,
  products,
  onPickPreview,
  onMapTap,
}: Props) {
  const mapRef = useRef<any>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);

  const myMarkerIcon = useMemo(() => makeLocationPinHtml('text-primary'), []);
  const restaurantMarkerIcon = useMemo(() => makeLocationPinHtml('text-primary'), []);

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

  return (
    <MapDiv
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
      fallback={<div className="grid h-full place-items-center">지도 로딩 중…</div>}
    >
      <NaverMap defaultCenter={defaultCenter} center={center} defaultZoom={16} ref={handleMapRef}>
        <Marker position={center} icon={myMarkerIcon as any} />
        {restaurants.map((r, idx) => (
          <Marker
            key={r.id}
            position={{ lat: r.lat, lng: r.lng }}
            icon={restaurantMarkerIcon as any}
            onClick={() => onPickPreview(products[idx % products.length])}
          />
        ))}
      </NaverMap>
    </MapDiv>
  );
}
