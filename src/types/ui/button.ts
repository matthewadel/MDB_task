import { ITouchableOpacity } from './touchable-opacity';

export interface IButton extends ITouchableOpacity {
  type?: 'PRIMARY' | 'SECONDARY';
}
