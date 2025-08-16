import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="mx-auto min-h-0 w-full flex-1">
        <Outlet />
      </main>
      {/* 푸터 */}
    </div>
  );
}
