import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-dvh flex-col">
      {/* 헤더 */}
      <main className="mx-auto flex-1">
        <Outlet />
      </main>
      {/* 푸터 */}
    </div>
  );
}
