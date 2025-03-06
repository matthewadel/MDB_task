import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { MainStack } from '@/navigation/main-stack';
import { persistor, store } from '@/store';
import { AlertProvider, FlashMessageProvider } from '@/ui';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <NavigationContainer>
              <FlashMessageProvider />
              <AlertProvider />
              <MainStack />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
