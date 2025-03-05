import React, { Fragment, useState } from 'react';
import { StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { IVectorIcons } from '@/types';
import { ActivityIndicator } from '@/ui';

export const ICONS = {
  AntDesign,
  Ionicons,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  EvilIcons,
  Octicons,
  Fontisto,
  MaterialIcons,
  SimpleLineIcons,
  Foundation,
};

export const VectorIcons = (props: IVectorIcons) => {
  let Icon = props.icon;

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
    <Fragment>
      {!props.loading && <Icon onLayout={onLayout} {...props} />}
      {!!props.loading && (
        <ActivityIndicator
          size="small"
          style={{
            width: Width,
            height: Height,
            ...styles.activityIndicatorStyle,
          }}
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  activityIndicatorStyle: { justifyContent: 'center', alignItems: 'center' },
});
