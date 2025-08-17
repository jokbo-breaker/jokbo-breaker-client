import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Layout = lazy(() => import('@/shared/layouts/layout.jsx'));
const MainPage = lazy(() => import('@/pages/main/main-page.js'));
const MapPage = lazy(() => import('@/pages/map/map-page'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'map', element: <MapPage /> },
    ],
  },
]);
