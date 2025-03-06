export interface IFlashMsg {
  msg: {
    message: {
      onPress?: Function;
      type?: FlashMessagesType;
      message: string;
    };
  };
}

export enum FlashMessagesType {
  WARNING = 'warning',
  DANGER = 'danger',
  SUCCESS = 'success',
}
