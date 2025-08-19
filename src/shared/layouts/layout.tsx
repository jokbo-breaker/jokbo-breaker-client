import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/shared/layouts/scroll-to-top';
import BottomNavigation from '@/shared/layouts/bottom-navbar';

export default function RootLayout() {
  return (
    <div className="max-h-dvh flex-col overflow-hidden">
      <main className="scrollbar-hide mx-auto min-h-dvh w-full flex-1 overflow-y-auto">
        <ScrollToTop />
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
}
