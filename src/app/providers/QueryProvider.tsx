'use client';

import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export function QueryProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (isAxiosError(error)) {
          /* eslint-disable-next-line no-console */
          console.error(query);
        }
      },
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
