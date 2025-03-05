import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { vs } from 'react-native-size-matters';

import { IImage } from '@/types';
import { ActivityIndicator, COLORS, TouchableOpacity, VectorIcons } from '@/ui';

interface IPreviewRemoteImages extends IImage {
  onPressImage: Function;
}

const PreviewRemoteImages = (props: IPreviewRemoteImages) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <FastImage
      {...props}
      onError={() => setError(true)}
      onLoadEnd={() => setLoading(false)}
      style={props.style}
      resizeMode={
        StyleSheet.flatten(props.style)?.resizeMode
          ? FastImage.resizeMode[StyleSheet.flatten(props.style)?.resizeMode]
          : FastImage.resizeMode.cover
      }
      source={{
        ...props.source,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
    >
      <TouchableOpacity
        disabled={props.disabled}
        activeOpacity={1}
        onPress={
          props.onPress || props.openImage
            ? (args) => props.onPressImage(args)
            : undefined
        }
        style={[styles.fillStyle, loading || error ? styles.imageStyle : {}]}
      >
        {loading ? (
          <ActivityIndicator />
        ) : error ? (
          <VectorIcons
            icon="AntDesign"
            name="exclamationcircle"
            size={vs(20)}
            color={COLORS.Red}
          />
        ) : (
          props.children
        )}
      </TouchableOpacity>
    </FastImage>
  );
};

export { PreviewRemoteImages };

const styles = StyleSheet.create({
  fillStyle: { width: '100%', height: '100%' },
  imageStyle: {
    backgroundColor: COLORS.Dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
