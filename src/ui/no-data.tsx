import React from 'react';
import { StyleSheet } from 'react-native';

import { NoDataAsset } from '@/assets';
import { INoData } from '@/types';
import { Image, Text, View } from '@/ui';

const NoData = (props?: INoData) => {
  return (
    <View style={styles.container}>
      <Image source={props?.icon || NoDataAsset} style={styles.imageStyle} />
      <Text>{props?.title || 'No Data Found'}</Text>
    </View>
  );
};

export { NoData };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: '30%',
    width: '50%',
    resizeMode: 'contain',
  },
});
