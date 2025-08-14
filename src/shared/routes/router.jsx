import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Layout = lazy(() => import('@/shared/layouts/layout.jsx'));
const Main = lazy(() => import('@/pages/Main/MainPage.jsx'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ index: true, element: <Main /> }],
  },
]);
