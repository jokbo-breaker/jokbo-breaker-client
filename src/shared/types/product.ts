export type Product = {
  id: string;
  image: string;
  store: string;
  name: string;
  discount: number;
  price: number;
  description?: string;
  originalPrice?: number;
  remainingBadge?: string;
  hours: string;
  distanceKm: number;
  address?: string;
  phone?: string;
  pickupPrice?: number;
  teamDeliveryAfter?: string;
};
