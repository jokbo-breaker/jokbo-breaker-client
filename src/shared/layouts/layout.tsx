import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/shared/layouts/scroll-to-top';
import BottomNavigation from '@/shared/layouts/bottom-navbar';

export default function RootLayout() {
  return (
    <div className="scrollbar-hide flex max-h-dvh flex-col">
      <main className="mx-auto min-h-dvh w-full flex-1 overflow-y-auto pb-[6rem]">
        <ScrollToTop />
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
}
