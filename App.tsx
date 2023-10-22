import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PaperProvider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { theme } from '@appConfig/theme';
import { ONE_HOUR } from '@appConfig/constants';

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
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </QueryClientProvider>
    </PaperProvider>
  );
}
