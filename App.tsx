import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ONE_HOUR } from '@appConfig/constants';
import { NativeBaseProvider, Box } from 'native-base';
import { theme } from '@appConfig/theme';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: ONE_HOUR,
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
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box bg={'primary.200'}>Hello world</Box>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
