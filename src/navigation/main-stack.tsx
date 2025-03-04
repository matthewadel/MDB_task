import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import * as Screens from '@/screens';

export const MainStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
      initialRouteName="TransactionList"
    >
      <Stack.Screen
        name="TransactionList"
        component={Screens.TransactionList}
      />
      <Stack.Screen name="AddTransaction" component={Screens.AddTransaction} />
      <Stack.Screen
        name="TransactionsSummary"
        component={Screens.TransactionsSummary}
      />
    </Stack.Navigator>
  );
};
