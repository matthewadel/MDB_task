import { IScreenHeader } from './screen-header';

export interface IScreenContainer {
  screenHeaderProps: IScreenHeader;
  children?: React.ReactNode;
  loading?: boolean;
}
