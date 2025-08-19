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
const MapPage = lazy(() => import('@/pages/map/map-page'));
const AiMealboxPage = lazy(() => import('@/pages/recommend/ai-mealbox-page'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/main/:section', element: <SectionListPage /> },
      { path: '/product/:id', element: <ProductDetailPage /> },
      { path: '/map-view', element: <MapViewPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/map', element: <MapPage /> },
      { path: '/ai-recommend', element: <AiMealboxPage /> },
    ],
  },
]);
