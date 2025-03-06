import React, { Ref, useState } from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity as RNTouchableOpacity,
  View,
} from 'react-native';

import { ITouchableOpacity } from '@/types';
import { ActivityIndicator, COLORS, Text } from '@/ui';

const TouchableOpacity = React.forwardRef(
  (props: ITouchableOpacity, ref?: Ref<View>) => {
    let { children, style, disabled } = props;

    let [Width, setWidth] = useState(0);
    let [Height, setHeight] = useState(0);

    const onLayout = (event: LayoutChangeEvent) => {
      props?.onLayout?.(event);
      const { height, width } = event.nativeEvent.layout;
      setWidth(width);
      setHeight(height);
    };

    const dynamicOpacity = { opacity: disabled ? 0.7 : 1 };

    return (
      <RNTouchableOpacity
        ref={ref}
        {...props}
        onLayout={(event) => onLayout(event)}
        onPress={(pressProps) => {
          !props.dontClosekeyboard && Keyboard.dismiss();
          props.onPress && props.onPress(pressProps);
        }}
        disabled={!props.onPress || !!props.disabled || !!props.loading}
        style={[
          dynamicOpacity,
          StyleSheet.flatten(style),
          props.loading ? { width: Width, height: Height } : {},
        ]}
      >
        {props.loading ? (
          <ActivityIndicator
            size="small"
            color={props.ActivityIndicatorColor || COLORS.White}
          />
        ) : Array.isArray(children) || children?.type ? (
          children
        ) : (
          <Text
            {...props}
            disabled={!props.onPress || props.disabled || props.loading}
            style={props.textStyle}
          >
            {children}
          </Text>
        )}
      </RNTouchableOpacity>
    );
  },
);
export { TouchableOpacity };
