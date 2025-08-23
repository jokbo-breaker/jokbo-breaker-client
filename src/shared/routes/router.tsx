import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '@/shared/components/protected-route';
import PublicRoute from '@/shared/components/public-route';

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
const LoginPage = lazy(() => import('@/pages/login/login-page'));
const LoginSucessPage = lazy(() => import('@/pages/login/login-success'));
const CheckoutPage = lazy(() => import('@/pages/main/checkout/checkout-page'));
const OnboardingPage = lazy(() => import('@/pages/onboarding/onboarding-page'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { 
        path: '/login', 
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ) 
      },
      { path: '/onboarding', element: <OnboardingPage /> },
      { path: '/auth/success', element: <LoginSucessPage /> },
      { path: '/main/:section', element: <SectionListPage /> },
      { path: '/product/:id', element: <ProductDetailPage /> },
      { 
        path: '/checkout/:id', 
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ) 
      },
      { path: '/map-view', element: <MapViewPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/menu', element: <MenuPage /> },
      { 
        path: '/mypage', 
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ) 
      },
      { 
        path: '/orders', 
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ) 
      },
    ],
  },
]);
