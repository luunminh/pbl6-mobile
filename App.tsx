import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ONE_HOUR } from './src/appConfig/constants';
import { NativeBaseProvider } from 'native-base';
import { theme } from './src/appConfig/theme';
import AppContainer from './src/containers';
import { useFonts } from 'expo-font';
import createStore from './src/redux/store';
import { Provider } from 'react-redux';
import { VoucherContextProvider } from './src/context';
import { LogBox } from 'react-native';
const { store } = createStore();

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
        console.log(err.message);
        return err;
      },
    },
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Mulish: require('./src/assets/fonts/Mulish-VariableFont_wght.ttf'),
    'Public Sans': require('./src/assets/fonts/PublicSans-VariableFont_wght.ttf'),
  });

  LogBox.ignoreAllLogs();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <VoucherContextProvider>
            <AppContainer />
          </VoucherContextProvider>
        </NativeBaseProvider>
      </Provider>
    </QueryClientProvider>
  );
}
