import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IScreenContainer } from '@/types';
import { COLORS, CONSTANTS, LoadingScreen, ScreenHeader, View } from '@/ui';

const ScreenContainer = (props: IScreenContainer) => {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScreenHeader {...props.screenHeaderProps} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {props.loading ? (
            <LoadingScreen />
          ) : (
            <View style={{ ...styles.containerStyle, ...props.style }}>
              {props.children}
            </View>
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export { ScreenContainer };

const styles = StyleSheet.create({
  safeArea: { height: '100%', backgroundColor: COLORS.White, width: '100%' },
  containerStyle: {
    flex: 1,
    width: '100%',
    paddingHorizontal: CONSTANTS.PADDING_HORIZONTAL,
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
  },
});
