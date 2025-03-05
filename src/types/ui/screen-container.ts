import { ViewStyle } from 'react-native';

import { IScreenHeader } from './screen-header';

export interface IScreenContainer {
  screenHeaderProps: IScreenHeader;
  style?: ViewStyle;
  children?: React.ReactNode;
  loading?: boolean;
}
