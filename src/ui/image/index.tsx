import React, { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  GestureResponderEvent,
  Image as RNImage,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SvgUri } from 'react-native-svg';

import { IImage } from '@/types';

import { FullScreenModal } from './full-screen-modal';
import { PreviewLocalImages } from './preview-local-images';
import { PreviewRemoteImages } from './preview-remote-images';

const Image = (props: IImage) => {
  const [showModal, setShowModal] = useState(false);

  const onPressImage = (args: GestureResponderEvent) => {
    if (props.onPress) props.onPress(args);
    else if (props.openImage) setShowModal(true);
  };

  const onBackPress = useCallback(() => {
    if (showModal) {
      setShowModal(false);
      return true;
    }
    return false;
  }, [showModal]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => subscription.remove();
  }, [onBackPress]);

  useEffect(() => {
    if (props.imageUrls) {
      FastImage.preload(props.imageUrls.map((item) => ({ uri: item.url })));
    } else if (props.source.uri && props.source.uri.startsWith('http')) {
      RNImage.prefetch(props.source.uri);
      FastImage.preload([{ uri: props.source.uri }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!!props.openImage && (
        <FullScreenModal
          source={props.source}
          showModal={showModal}
          setShowModal={setShowModal}
          imageUrls={props.imageUrls}
          index={props.index}
        />
      )}

      {props.source.uri?.endsWith('.svg') ? (
        <SvgUri
          width={props.style?.width}
          height={props.style?.height}
          style={StyleSheet.flatten(props.style)}
          uri={props.source.uri}
        />
      ) : props.source.uri && !props.source.uri.startsWith('data') ? (
        <PreviewRemoteImages onPressImage={onPressImage} {...props} />
      ) : (
        <PreviewLocalImages onPressImage={onPressImage} {...props} />
      )}
    </>
  );
};

export { Image };
