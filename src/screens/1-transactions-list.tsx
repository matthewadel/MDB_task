import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';

import { COLORS, ICONS, NoData, ScreenContainer, VectorIcons } from '@/ui';

const TransactionList = () => {
  const Navigation = useNavigation<any>();
  return (
    <ScreenContainer screenHeaderProps={{ title: 'Transaction List' }}>
      <NoData />
      <VectorIcons
        icon={ICONS.AntDesign}
        name="pluscircle"
        color={COLORS.Primary}
        onPress={() => Navigation.navigate('AddTransaction')}
        size={s(40)}
        style={styles.plusIconStyle}
      />
    </ScreenContainer>
  );
};

export { TransactionList };

const styles = StyleSheet.create({
  plusIconStyle: {
    position: 'absolute',
    bottom: s(20),
    right: s(20),
  },
});

// create expense
// delete expense
// preview all expenses ordered by date
// sort (date, tyoe)
// filter (date, type)
// summary view
// flatlist
// popover issue in add expense screen
// test the app in dark mode
// test keyboard
