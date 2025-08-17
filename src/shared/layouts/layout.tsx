import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="scrollbar-hide flex max-h-dvh flex-col overflow-y-auto">
      <main className="mx-auto min-h-dvh w-full flex-1">
        <Outlet />
      </main>
      {/* 푸터 */}
    </div>
  );
}
