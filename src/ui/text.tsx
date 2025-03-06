import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { s } from 'react-native-size-matters';

import { COLORS } from '@/ui';

const Text = (props: TextProps) => {
  return (
    <RNText
      ellipsizeMode="tail"
      numberOfLines={1}
      adjustsFontSizeToFit
      allowFontScaling={false}
      style={styles.textStyle}
      {...props}
    />
  );
};

export { Text };

const styles = StyleSheet.create({
  textStyle: { color: COLORS.Dark, fontSize: s(14) },
});
