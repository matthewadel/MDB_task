import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';

import { Button, COLORS, CONSTANTS, Text } from '@/ui';

interface ISortModal {
  onSort: Function;
}

const SortModal = forwardRef((props: ISortModal, ref) => {
  const [orderBy, setOrderBy] = useState<'Descending' | 'Ascending'>(
    'Descending',
  );

  const resetOptions = () => {
    setOrderBy('Descending');
  };

  useImperativeHandle(ref, () => {
    resetOptions;
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Sort By</Text>
      <View style={styles.optionsContainer}>
        <Button>Date</Button>
      </View>

      <Text style={styles.titleStyle}>Order By</Text>
      <View style={styles.optionsContainer}>
        <Button
          type={orderBy === 'Descending' ? 'PRIMARY' : 'SECONDARY'}
          onPress={() => setOrderBy('Descending')}
        >
          Descending
        </Button>
        <Button
          type={orderBy === 'Ascending' ? 'PRIMARY' : 'SECONDARY'}
          onPress={() => setOrderBy('Ascending')}
        >
          Ascending
        </Button>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => props.onSort(orderBy)}
          style={styles.buttonStyle}
        >
          Sort
        </Button>
        <Button
          onPress={() => {
            resetOptions();
            props.onSort('Descending');
          }}
          style={styles.buttonStyle}
        >
          Reset
        </Button>
      </View>
    </SafeAreaView>
  );
});

export { SortModal };

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    paddingHorizontal: CONSTANTS.PADDING_HORIZONTAL,
  },
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
  subContainerStyle: { width: '100%' },
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
