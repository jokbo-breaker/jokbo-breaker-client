export type Product = {
  id: string;
  storeId?: string;
  image: string;
  images?: string[];
  store: string;
  name: string;
  discount: number;
  price: number;
  description?: string;
  originalPrice?: number;
  stockLeft?: number;
  hours: string;
  distanceKm: number;
  address?: string;
  phone?: string;
  pickupPrice?: number;
  teamDeliveryAfter?: string;
};
