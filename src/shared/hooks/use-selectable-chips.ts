import { useCallback, useState } from 'react';

export default function useSelectableChips<T extends string>(
  initial: T[] = [],
) {
  const [selected, setSelected] = useState<T[]>(initial);

  const toggle = useCallback((v: T) => {
    setSelected((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  return { selected, toggle, clear };
}
