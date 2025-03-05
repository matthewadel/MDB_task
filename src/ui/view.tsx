import React from 'react';
import { View as RNView, ViewProps } from 'react-native';

import { COLORS } from '@/ui';

const View = (props: ViewProps) => {
  return <RNView style={{ backgroundColor: COLORS.White }} {...props} />;
};

export { View };
