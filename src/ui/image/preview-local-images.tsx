import React from 'react';
import { Image as RNImage, StyleSheet } from 'react-native';

import { IImage } from '@/types';
import { View } from '@/ui';

interface IPreviewLocalImages extends IImage {
  onPressImage: Function;
}

const PreviewLocalImages = (props: IPreviewLocalImages) => {
  return (
    <View style={props.style}>
      <RNImage
        {...props}
        // @ts-ignore
        children={null}
        style={{
          resizeMode: StyleSheet.flatten(props.style)?.resizeMode || 'cover',
          ...styles.fillStyle,
        }}
      />
      {props.children}
    </View>
  );
};

export { PreviewLocalImages };

const styles = StyleSheet.create({
  fillStyle: { width: '100%', height: '100%' },
});
