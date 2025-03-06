import React from 'react';
import { FlatList as RNFlatList, StyleSheet } from 'react-native';
import { FlatListProps } from 'react-native';

import { NoData } from '@/ui';

const FlatList = (props: FlatListProps<any>) => {
  return (
    <RNFlatList
      initialNumToRender={10}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<NoData />}
      {...props}
      contentContainerStyle={[
        !props.data?.length ? styles.contentContainerStyle : {},
        props.contentContainerStyle,
      ]}
    />
  );
};

export { FlatList };

const styles = StyleSheet.create({
  contentContainerStyle: { flexGrow: 1 },
});
