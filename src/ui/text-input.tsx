import { digitsArToEn } from '@persian-tools/persian-tools';
import React, { Ref } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { s, vs } from 'react-native-size-matters';

import { ITextInput } from '@/types';
import { COLORS, ShadowStyle, Text } from '@/ui';

const TextInput = React.forwardRef(
  (props?: ITextInput, ref?: Ref<RNTextInput>) => {
    let hasError = props?.showErrors && props?.hasError;

    const onChangeText = (text: string) => {
      if (props?.onChangeText)
        if (
          props.keyboardType === 'number-pad' ||
          props.keyboardType === 'numeric'
        )
          props.onChangeText(digitsArToEn(text || '')?.replace(/\D/g, ''));
        else props.onChangeText(text);
    };
    return (
      <Animatable.View
        animation={props?.showErrors ? 'shake' : ''}
        style={{ ...styles.containerStyle, ...props?.containerStyle }}
      >
        {!!props?.title && (
          <Text
            style={{
              ...styles.titleStyle,
              color: hasError ? COLORS.Error : COLORS.Dark,
            }}
          >
            {props?.title}
          </Text>
        )}
        <RNTextInput
          ref={ref}
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholderTextColor={
            hasError ? COLORS.Error : COLORS.PlaceholderTextColor
          }
          {...props}
          style={[
            styles.textInputStyle,
            props?.style,
            {
              color: hasError ? COLORS.Error : COLORS.Dark,
            },
            hasError ? styles.errorTextInputStyle : {},
          ]}
          onChangeText={onChangeText}
        />

        {hasError && !!props?.errorMessage && (
          <Text style={styles.errorMsg}>*{props?.errorMessage}</Text>
        )}
      </Animatable.View>
    );
  },
);

export { TextInput };

const styles = StyleSheet.create({
  containerStyle: { width: '100%' },
  textInputStyle: {
    paddingHorizontal: s(8),
    fontSize: s(14),
    height: vs(35),
    marginTop: vs(8),
    borderRadius: s(6),
    ...ShadowStyle,
  },
  errorTextInputStyle: { borderColor: COLORS.Error, borderWidth: 1 },
  titleStyle: { fontWeight: 'bold' },
  errorMsg: {
    marginLeft: s(4),
    marginTop: vs(2),
    fontSize: s(12),
    color: COLORS.Error,
  },
});
