import React from 'react';
import { StyleSheet } from 'react-native';

import { IScreenHeader } from '@/types';
import { Text, View } from '@/ui';

const ScreenHeader = (props: IScreenHeader) => {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
    </View>
  );
};

export { ScreenHeader };

const styles = StyleSheet.create({
  container: { width: '100%', justifyContent: 'center', alignItems: 'center' },
});
