import { TextInputProps, ViewStyle } from 'react-native';

export interface ITextInput extends TextInputProps {
  containerStyle?: ViewStyle;
  title?: string;
  hasError?: boolean;
  errorMessage?: string;
}
