import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { IVectorIcons } from '@/types';
import { ActivityIndicator, View } from '@/ui';

export const VectorIcons = (props: IVectorIcons) => {
  let components: { [key: string]: typeof AntDesign } = {
    AntDesign,
    Ionicons,
    Entypo,
    Feather,
    FontAwesome,
    MaterialCommunityIcons,
    EvilIcons,
    Octicons,
    Fontisto,
    MaterialIcons,
    SimpleLineIcons,
    Foundation,
  };

  let Icon = components[props.icon];

  let [Width, setWidth] = useState(0);
  let [Height, setHeight] = useState(0);

  const onLayout = (event: {
    nativeEvent: { layout: { width: number; height: number } };
  }) => {
    const { height, width } = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };

  return (
    <View
      {...props}
      onLayout={(event) => onLayout(event)}
      style={[
        styles.container,
        StyleSheet.flatten(props.containerStyle),
        props.loading ? { width: Width, height: Height } : {},
      ]}
    >
      {!props.loading && <Icon {...props} />}
      {!!props.loading && (
        <ActivityIndicator size="small" style={styles.loadingStyle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 0, justifyContent: 'center', alignItems: 'center' },
  loadingStyle: { position: 'absolute' },
});
