import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/shared/layouts/scroll-to-top';

export default function RootLayout() {
  return (
    <div className="scrollbar-hide flex max-h-dvh flex-col overflow-y-auto">
      <main className="mx-auto min-h-dvh w-full flex-1">
        <ScrollToTop />
        <Outlet />
      </main>
      {/* 푸터 */}
    </div>
  );
}
