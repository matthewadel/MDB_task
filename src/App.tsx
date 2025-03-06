import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { MainStack } from './navigation/main-stack';
import { store } from './store';
import { FlashMessageProvider } from './ui/flash-message';

const app = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <FlashMessageProvider />
          <MainStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default app;
