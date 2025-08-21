import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Layout = lazy(() => import('@/shared/layouts/layout'));
const MainPage = lazy(() => import('@/pages/main/main-page'));
const SectionListPage = lazy(
  () => import('@/pages/main/section-list/section-list-page'),
);
const ProductDetailPage = lazy(
  () => import('@/pages/main/product-detail/product-detail-page'),
);
const MapViewPage = lazy(() => import('@/pages/main/map-view/map-view'));
const SearchPage = lazy(() => import('@/pages/search/search-page'));
const MenuPage = lazy(() => import('@/pages/menu/menu-page'));
const MyPage = lazy(() => import('@/pages/my-page/my-page'));
const OrderPage = lazy(() => import('@/pages/order/order-page'));
const MapPage = lazy(() => import('@/pages/map/map-page'));
const CheckoutPage = lazy(() => import('@/pages/main/checkout/checkout-page'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/main/:section', element: <SectionListPage /> },
      { path: '/product/:id', element: <ProductDetailPage /> },
      { path: '/checkout/:id', element: <CheckoutPage /> },
      { path: '/map-view', element: <MapViewPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/map', element: <MapPage /> },
      { path: '/menu', element: <MenuPage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/orders', element: <OrderPage /> },
    ],
  },
]);
