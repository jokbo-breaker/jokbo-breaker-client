import { useEffect, useState } from 'react';

type Options = {
  minShowMs?: number;
  autoHide?: boolean;
};

export default function useSplash({
  minShowMs = 900,
  autoHide = true,
}: Options = {}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoHide) return;
    const t = setTimeout(() => setVisible(false), minShowMs);
    return () => clearTimeout(t);
  }, [minShowMs, autoHide]);

  return { visible, hide: () => setVisible(false) };
}
