import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import LoopLoading from '@/shared/components/loop-loading';
import queryClient from '@/shared/libs/query-client';
import { router } from '@/shared/routes/router';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoopLoading />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}
