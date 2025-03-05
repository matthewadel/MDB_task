import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IScreenContainer } from '@/types';
import { COLORS, CONSTANTS, LoadingScreen, ScreenHeader, View } from '@/ui';

const ScreenContainer = (props: IScreenContainer) => {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScreenHeader {...props.screenHeaderProps} />
      {props.loading ? (
        <LoadingScreen />
      ) : (
        <View style={{ ...styles.containerStyle, ...props.style }}>
          {props.children}
        </View>
      )}
    </SafeAreaView>
  );
};

export { ScreenContainer };

const styles = StyleSheet.create({
  safeArea: { height: '100%', backgroundColor: COLORS.White },
  containerStyle: {
    flex: 1,
    width: '100%',
    paddingHorizontal: CONSTANTS.PADDING_HORIZONTAL,
  },
});
