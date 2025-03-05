import { ViewStyle } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';

export interface IVectorIcons extends IconProps {
  icon: string;
  name: string;
  loading?: boolean;
  containerStyle?: ViewStyle;
}
