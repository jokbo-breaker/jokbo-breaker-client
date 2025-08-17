export type Product = {
  id: string;
  image: string;
  store: string;
  name: string;
  discount: number;
  price: number;
  originalPrice?: number;
  remainingBadge?: string;
  hours: string;
  distanceKm: number;
};
