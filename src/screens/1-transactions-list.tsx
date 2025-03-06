// import { BottomSheet as RNBottomSheet } from '@gorhom/bottom-sheet';
import RNBottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import {
  FilterModal,
  SortFIlter,
  SortModal,
  TransactionCard,
} from '@/components';
import { IRootState, ITransaction, TransactionType } from '@/types';
import {
  BottomSheet,
  COLORS,
  DatePicker,
  FlatList,
  ICONS,
  ScreenContainer,
  VectorIcons,
} from '@/ui';
import { formatDate } from '@/utils';

const TransactionList = () => {
  const Navigation = useNavigation<any>();
  const SortBottomSheetRef = useRef<RNBottomSheet>(null);
  const FilterBottomSheetRef = useRef<RNBottomSheet>(null);
  const SortModalRef = useRef<{ resetOptions: Function }>(null);
  const FilterModalRef = useRef<{ resetOptions: Function }>(null);
  const DatePickerRef = useRef<{ openModal: () => void }>(null);
  const [dateFilter, setDateFilter] = useState<string>();

  const { transactions }: { transactions?: ITransaction[] } = useSelector(
    (state: IRootState) => ({
      transactions: state.Transactions.transactions,
    }),
  );
  const [data, setData] = useState(transactions);

  const renderTransaction = useCallback(
    ({ item, index }: { item: ITransaction; index: number }) => {
      return (
        <TransactionCard
          showDate={!index || item.date !== data[index - 1].date}
          transaction={item}
          key={item.id}
        />
      );
    },
    [data],
  );

  const onSort = (orderBy: 'Descending' | 'Ascending') => {
    setData(
      orderBy === 'Descending'
        ? [...transactions]
        : [...transactions].reverse(),
    );

    SortBottomSheetRef.current?.collapse();
    FilterModalRef.current?.resetOptions();
  };

  const onFIlter = (filterType: 'Date' | 'Type', filterBy: TransactionType) => {
    if (filterType === 'Type') {
      setData([...transactions.filter((item) => item.type === filterBy)]);
    } else if (filterType === 'Date')
      setTimeout(() => {
        DatePickerRef.current?.openModal();
      }, 200);
    else onSort('Descending');

    FilterBottomSheetRef.current?.collapse();
    SortModalRef.current?.resetOptions();
  };

  useEffect(() => {
    if (dateFilter)
      setData([...transactions.filter((item) => item.date === dateFilter)]);
  }, [dateFilter, transactions]);

  return (
    <ScreenContainer screenHeaderProps={{ title: 'Transaction List' }}>
      <SortFIlter
        openSortModal={() => SortBottomSheetRef.current?.expand()}
        openFilterModal={() => FilterBottomSheetRef.current?.expand()}
      />
      <FlatList
        data={data}
        renderItem={renderTransaction}
        style={styles.flatlistStyle}
        contentContainerStyle={{ paddingBottom: vs(60) }}
      />
      <VectorIcons
        icon={ICONS.AntDesign}
        name="pluscircle"
        color={COLORS.Primary}
        onPress={() => Navigation.navigate('AddTransaction')}
        size={s(40)}
        style={styles.plusIconStyle}
      />

      <BottomSheet
        ref={SortBottomSheetRef}
        children={<SortModal ref={SortModalRef} onSort={onSort} />}
      />
      <BottomSheet
        ref={FilterBottomSheetRef}
        children={<FilterModal ref={FilterModalRef} onFIlter={onFIlter} />}
      />

      <DatePicker
        maximumDate={new Date()}
        onPress={(inputDate: Date) => setDateFilter(formatDate(inputDate))}
        ref={DatePickerRef}
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

// popover issue in add expense screen
// test the app in dark mode
// test keyboard
// fading splash screen
// export sort and filter in custom hook
