import { TextProps, ViewStyle } from 'react-native';

import { ITouchableOpacity } from './touchable-opacity';

export interface IOption {
  id: number;
  label: string;
}

export interface IDropDown extends ITouchableOpacity {
  hasError?: boolean;
  errorMessage?: string;
  choose: Function;
  contentStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  optionTextStyle?: TextProps;
  optionComponent?: Function;
  options: IOption[];
  selectedItem?: any;
  placeHolderComponentstyle?: any;
  placement?: any;
  placeholderTextStyle?: any;
  placeholder?: string;
  label?: string;
  labelStyle?: any;
}
