import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Main = lazy(() => import('@/pages/Main/MainPage.jsx'));

export const router = createBrowserRouter([{ path: '/', element: <Main /> }]);
