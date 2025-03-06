import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';

import { TransactionType } from '@/types';
import { Button, COLORS, CONSTANTS, Text, View } from '@/ui';

interface IFilterModal {
  onFIlter: Function;
}

const FilterModal = forwardRef((props: IFilterModal, ref) => {
  const [filterBy, setFilterBy] = useState<'Date' | 'Type'>();
  const [filterType, setFilterType] = useState<TransactionType>();

  const resetOptions = () => {
    setFilterBy(undefined);
    setFilterType(undefined);
  };

  useImperativeHandle(ref, () => {
    resetOptions;
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Filter By</Text>
      <View style={styles.optionsContainer}>
        <Button
          type={filterBy === 'Type' ? 'PRIMARY' : 'SECONDARY'}
          onPress={() => setFilterBy('Type')}
        >
          Type
        </Button>
        <Button
          type={filterBy === 'Date' ? 'PRIMARY' : 'SECONDARY'}
          onPress={() => setFilterBy('Date')}
        >
          Date
        </Button>
      </View>

      <View style={styles.subContainerStyle}>
        {filterBy !== 'Type' && <View style={styles.OverlayView} />}
        <Text style={styles.titleStyle}>Order By</Text>
        <View style={styles.optionsContainer}>
          <Button
            type={
              filterType === TransactionType.EXPENSE ? 'PRIMARY' : 'SECONDARY'
            }
            onPress={() => setFilterType(TransactionType.EXPENSE)}
          >
            {TransactionType.EXPENSE}
          </Button>
          <Button
            type={
              filterType === TransactionType.INCOME ? 'PRIMARY' : 'SECONDARY'
            }
            onPress={() => setFilterType(TransactionType.INCOME)}
          >
            {TransactionType.INCOME}
          </Button>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => props.onFIlter(filterBy, filterType)}
          style={styles.buttonStyle}
        >
          FIlter
        </Button>
        <Button
          onPress={() => {
            resetOptions();
            props.onFIlter();
          }}
          style={styles.buttonStyle}
        >
          Reset
        </Button>
      </View>
    </SafeAreaView>
  );
});

export { FilterModal };

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    paddingHorizontal: CONSTANTS.PADDING_HORIZONTAL,
  },
  subContainerStyle: { width: '100%' },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: vs(10),
  },
  titleStyle: { fontWeight: 'bold', marginTop: vs(10) },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: vs(15),
    paddingHorizontal: s(20),
  },
  OverlayView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS.White,
    zIndex: 1,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
