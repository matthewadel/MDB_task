import React from 'react';
import { ActivityIndicator as RNActivityIndicator } from 'react-native';
import { ActivityIndicatorProps } from 'react-native';

const ActivityIndicator = (props?: ActivityIndicatorProps) => {
  return <RNActivityIndicator {...props} />;
};

export { ActivityIndicator };
