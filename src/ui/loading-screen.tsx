import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { ILoadingScreen } from '@/types';
import { COLORS, View } from '@/ui';

const LoadingScreen = (props?: ILoadingScreen) => {
  return (
    <View style={{ ...styles.container, ...props?.style }}>
      <ActivityIndicator size="large" color={props?.color || COLORS.Dark} />
    </View>
  );
};

export { LoadingScreen };

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
});
