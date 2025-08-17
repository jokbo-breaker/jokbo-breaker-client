import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Layout = lazy(() => import('@/shared/layouts/layout'));
const MainPage = lazy(() => import('@/pages/main/main-page'));
const SectionListPage = lazy(
  () => import('@/pages/main/section-list/section-list-page'),
);
const MapPage = lazy(() => import('@/pages/map/map-page'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/main/:section', element: <SectionListPage /> },
      { path: 'map', element: <MapPage /> },
    ],
  },
]);
