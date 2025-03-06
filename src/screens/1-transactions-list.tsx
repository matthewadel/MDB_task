import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { TransactionCard } from '@/components';
import { IRootState, ITransaction } from '@/types';
import { COLORS, FlatList, ICONS, ScreenContainer, VectorIcons } from '@/ui';

const TransactionList = () => {
  const Navigation = useNavigation<any>();
  const { transactions }: { transactions?: ITransaction[] } = useSelector(
    (state: IRootState) => ({
      transactions: state.Transactions.transactions,
    }),
  );

  const renderTransaction = useCallback(({ item }: { item: ITransaction }) => {
    return <TransactionCard transaction={item} key={item.id} />;
  }, []);

  return (
    <ScreenContainer screenHeaderProps={{ title: 'Transaction List' }}>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        style={styles.flatlistStyle}
      />
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
  flatlistStyle: {
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    paddingTop: vs(20),
  },
});

// preview all expenses ordered by date
// sort (date, tyoe)
// filter (date, type)
// summary view
// popover issue in add expense screen
// test the app in dark mode
// test keyboard
