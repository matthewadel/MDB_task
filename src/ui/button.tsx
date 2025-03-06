import React from 'react';
import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';

import { IButton } from '@/types';
import { COLORS, TouchableOpacity } from '@/ui';

const Button = (props?: IButton) => {
  return (
    <TouchableOpacity
      {...props}
      textStyle={[
        props?.type === 'SECONDARY'
          ? { color: COLORS.Primary }
          : { color: COLORS.White },
        styles.textStyle,
        props?.textStyle,
      ]}
      style={[
        props?.type === 'SECONDARY'
          ? {
              backgroundColor: COLORS.White,
              borderWidth: 1,
              borderColor: COLORS.Primary,
            }
          : { backgroundColor: COLORS.Primary },
        styles.buttonStyle,
        props?.style,
      ]}
    />
  );
};

export { Button };

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: s(13),
    borderRadius: s(7),
    paddingVertical: vs(10),
  },
  textStyle: { fontWeight: 'bold' },
});
