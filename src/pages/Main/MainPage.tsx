import { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
export default function MainPage() {
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => setLoc({ lat: coords.latitude, lng: coords.longitude }),
      console.error,
    );
  }, []);
  const fallback = { lat: 37.5665, lng: 126.978 };
  return (
    <div className="flex h-dvh w-[100%] max-w-[43rem]">
      <MapDiv
        className="flex-1"
        style={{ width: '100%', height: '100dvh' }}
        innerStyle={{ width: '100%', height: '100%' }}
      >
        <NaverMap
          defaultCenter={fallback}
          center={loc ?? fallback}
          defaultZoom={16}
        >
          {loc && <Marker position={loc} />}
        </NaverMap>
      </MapDiv>
    </div>
  );
}
