import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { MainStack } from './navigation/main-stack';

const app = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default app;
