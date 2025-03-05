import React from 'react';
import { Modal, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';

import { ActivityIndicator, VectorIcons, View } from '@/ui';

interface FullScreenModal {
  setShowModal: Function;
  showModal: boolean;
  imageUrls?: { url: string }[];
  index?: number;
  source: { uri: string };
}
const FullScreenModal = (props: FullScreenModal) => {
  const { height: HEIGHT, width: WIDTH } = useWindowDimensions();

  const renderLoader = () => <ActivityIndicator size="large" />;

  return (
    <Modal
      onRequestClose={() => props.setShowModal(false)}
      visible={props.showModal}
      transparent={true}
    >
      <ImageViewer
        loadingRender={renderLoader}
        renderIndicator={() => <View />}
        renderHeader={() => (
          <SafeAreaView style={styles.safeAreaView} edges={['top']}>
            <VectorIcons
              style={styles.closeButtonStyle}
              icon="Feather"
              name="arrow-left-circle"
              color={'#fff'}
              size={s(30)}
              onPress={() => props.setShowModal(false)}
            />
          </SafeAreaView>
        )}
        index={props.index || 0}
        imageUrls={
          Platform.OS === 'ios'
            ? props.imageUrls
              ? props.imageUrls.map((item) => ({
                  ...item,
                  width: WIDTH,
                  height: HEIGHT,
                }))
              : [{ url: props.source?.uri, width: WIDTH, height: HEIGHT }]
            : props.imageUrls || [{ url: props.source?.uri }]
        }
        renderImage={
          Platform.OS === 'ios'
            ? (inputImage) => (
                <View style={styles.imageInsideImageViewerStyle}>
                  <ActivityIndicator
                    size="large"
                    style={styles.activityIndicatorStyle}
                  />
                  <FastImage
                    {...props}
                    style={styles.fillStyle}
                    source={{
                      uri: inputImage.source.uri,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
              )
            : undefined
        }
        enableSwipeDown={true}
        onSwipeDown={() => props.setShowModal(false)}
      />
    </Modal>
  );
};

export { FullScreenModal };

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  closeButtonStyle: { zIndex: 2, marginTop: vs(10), marginLeft: vs(10) },
  imageInsideImageViewerStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorStyle: { position: 'absolute' },
  fillStyle: { width: '100%', height: '100%' },
});
