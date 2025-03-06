import React from 'react';
import { StyleSheet } from 'react-native';
import CustomisableAlert from 'react-native-customisable-alert';

const Alert = () => {
  return (
    <CustomisableAlert
      defaultLeftBtnLabel="NO"
      defaultRightBtnLabel="YES"
      dismissable={true}
      titleStyle={styles.titleStyle}
    />
  );
};

export { Alert };

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
