import React from 'react';
import { StyleSheet } from 'react-native';
import CustomisableAlert, {
  closeAlert,
  showAlert,
} from 'react-native-customisable-alert';

const AlertProvider = () => {
  return (
    <CustomisableAlert
      defaultLeftBtnLabel="NO"
      defaultRightBtnLabel="YES"
      dismissable={true}
      titleStyle={styles.titleStyle}
    />
  );
};

export { AlertProvider, closeAlert, showAlert };

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
