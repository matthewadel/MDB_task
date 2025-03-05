import { Platform } from 'react-native';

import { COLORS } from '@/ui';

export const ShadowStyle: any = {
  backgroundColor: '#fff',
  overflow: 'visible',
  shadowColor: Platform.OS === 'ios' ? COLORS.BorderColor : COLORS.Dark,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 4.58,
  shadowRadius: 10,
  elevation: 10,
};
