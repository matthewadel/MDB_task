import { ImageProps, TouchableOpacityProps } from 'react-native';

export interface IImage extends ImageProps, TouchableOpacityProps {
  style?: any;
  hideLoader?: boolean;
  openImage?: boolean;
  source: any;
  imageUrls?: { url: string }[];
  index?: number;
  defaultSource?: any;
  onLoad?: any;
}
