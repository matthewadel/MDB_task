import {
  StyleProp,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

export interface ITouchableOpacity extends TouchableOpacityProps {
  ActivityIndicatorColor?: string;
  loading?: boolean;
  dontClosekeyboard?: boolean;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
  children?: any;
}
