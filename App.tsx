import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import { QueryClient, QueryClientProvider } from 'react-query';
export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 60 * 60 * 1000,
        onError(err: unknown | Error) {
          // if ((err as Error)?.message === ErrorService.MESSAGES.forbidden) {
          //   return ErrorService.handler({
          //     message: 'You do not have permission to access this data.',
          //   });
          // }
          // ErrorService.handler(err);
          return err;
        },
      },
      mutations: {
        onError(err: any) {
          // if ((err as Error)?.message === ErrorService.MESSAGES.forbidden) {
          //   return ErrorService.handler({
          //     message: 'You do not have permission to trigger this action.',
          //   });
          // }
          // ErrorService.handler(err);
          return err;
        },
      },
    },
  });

  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <Box backgroundColor={'#fff'}>Hello world</Box>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
