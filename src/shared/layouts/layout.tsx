import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ScrollToTop from '@/shared/layouts/scroll-to-top';
// import BottomNavigation from '@/shared/layouts/bottom-navbar';
import FloatingButton from '@/shared/layouts/floating-button';
import AiMealboxPage from '@/pages/recommend/ai-mealbox-page';

export default function Layout() {
  const [openMealbox, setOpenMealbox] = useState(false);
  const { pathname } = useLocation();

  const isHiddenRoute = /^\/(checkout|menu)(\/|$)/.test(pathname);

  return (
    <div className="flex max-h-dvh flex-col overflow-hidden">
      <main className="scrollbar-hide mx-auto min-h-dvh w-full flex-1 overflow-y-auto">
        <ScrollToTop />
        <Outlet />
      </main>

      {!isHiddenRoute && (
        <div className="pointer-events-none fixed right-[0.5rem] bottom-[1rem] left-1/2 z-[var(--z-floating)] w-full max-w-[43rem] -translate-x-1/2">
          <div className="flex justify-end">
            <div className="pointer-events-auto">
              <FloatingButton onClick={() => setOpenMealbox(true)} />
            </div>
          </div>
        </div>
      )}

      {/* <BottomNavigation /> */}
      {openMealbox && (
        <>
          <div
            className="fixed inset-0 z-[var(--z-bottom-modal)]"
            onClick={() => setOpenMealbox(false)}
          />
          <AiMealboxPage onClose={() => setOpenMealbox(false)} />
        </>
      )}
    </div>
  );
}
