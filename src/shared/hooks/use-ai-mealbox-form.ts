import { useCallback, useMemo, useState } from 'react';
import type {
  FoodOption,
  MethodId,
} from '@/pages/recommend/constants/recommend';

export function useAiMealboxForm() {
  const [foods, setFoods] = useState<FoodOption[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [method, setMethod] = useState<MethodId | ''>('');
  const [showLoading, setShowLoading] = useState(false);

  const toggleFood = useCallback((v: FoodOption) => {
    setFoods((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  }, []);

  const canNext1 = foods.length > 0;
  const canNext2 = typeof maxPrice === 'number' && maxPrice > 0;
  const canSubmit = !!method;

  const payload = useMemo(
    () => ({ foods, maxPrice, method }),
    [foods, maxPrice, method],
  );

  return {
    foods,
    toggleFood,
    maxPrice,
    setMaxPrice,
    method,
    setMethod,
    canNext1,
    canNext2,
    canSubmit,
    payload,
    showLoading,
    setShowLoading,
  };
}
