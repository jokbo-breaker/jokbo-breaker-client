import { useCallback, useEffect, useRef, useState } from 'react';

export type LatLng = { lat: number; lng: number };

type Opts = {
  watch?: boolean;
  options?: PositionOptions;
  immediate?: boolean;
};

export function useGeolocation({
  watch = false,
  options,
  immediate = true,
}: Opts = {}) {
  const [loc, setLoc] = useState<LatLng | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [loading, setLoading] = useState(false);
  const optsRef = useRef(options);

  const request = useCallback(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setError({
        name: 'GeolocationUnsupported',
        message: '이 브라우저는 위치를 지원하지 않습니다.',
        code: 0,
      } as any);
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      optsRef.current,
    );
  }, []);

  useEffect(() => {
    if (!immediate) return;
    if (watch) {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setError(null);
        },
        (err) => setError(err),
        optsRef.current,
      );
      return () => navigator.geolocation.clearWatch(id);
    } else {
      request();
    }
  }, [watch, immediate, request]);

  return { loc, error, loading, request };
}
