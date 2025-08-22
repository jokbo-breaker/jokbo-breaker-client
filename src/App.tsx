import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import LoopLoading from '@/shared/components/loop-loading';
import queryClient from '@/shared/libs/query-client';
import { router } from '@/shared/routes/router';
import useSplash from '@/shared/hooks/use-splash';
import Splash from '@/shared/components/splash/splash';

export default function App() {
  const { visible, hide } = useSplash({ minShowMs: 1000 });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <Suspense fallback={<LoopLoading />}>
          <RouterProvider router={router} />
        </Suspense>

        {visible && <Splash onFinish={hide} />}
      </div>
    </QueryClientProvider>
  );
}
