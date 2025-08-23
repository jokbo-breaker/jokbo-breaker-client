import { useCallback, useState } from 'react';

type Options = { onFinish?: () => void };

export function useOnboarding(total: number, opts?: Options) {
  const [index, setIndex] = useState(0);
  const isLast = index >= total - 1;

  const select = useCallback(
    (i: number) => {
      setIndex(Math.max(0, Math.min(total - 1, i)));
    },
    [total],
  );

  const next = useCallback(() => {
    if (isLast) return opts?.onFinish?.();
    setIndex((i) => Math.min(total - 1, i + 1));
  }, [isLast, opts, total]);

  return { index, isLast, select, next };
}
