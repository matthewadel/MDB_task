import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { DateSection } from '@/components';
import { store } from '@/store';
import { ICategory, IRootState, TransactionType } from '@/types';
import {
  Button,
  COLORS,
  DropDown,
  ScreenContainer,
  TextInput,
  TouchableOpacity,
  View,
} from '@/ui';

const transactionTypes = [
  { id: 1, label: TransactionType.EXPENSE },
  { id: 2, label: TransactionType.INCOME },
];

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const Navigation = useNavigation<any>();

  const { Categories }: { Categories?: ICategory[] } = useSelector(
    (state: IRootState) => ({
      Categories: state.Categories,
    }),
  );
  console.log(store.getState());
  const validateInputs = () => {
    return false;
  };

  const addTransaction = () => {
    setShowErrors(false);
    if (validateInputs()) Navigation.goBack();
    else
      setTimeout(() => {
        setShowErrors(true);
      }, 100);
  };

  return (
    <ScreenContainer
      screenHeaderProps={{ title: 'Add Transaction' }}
      style={styles.containerStyle}
    >
      <DropDown
        hasError={true}
        showErrors={showErrors}
        label={'Transaction Type'}
        placeholder={'Transaction Type'}
        options={transactionTypes}
        choose={() => null}
        style={styles.topOffset}
        // selectedItem={{
        //   label: time
        //     ? `${(time as ITime)?.time_from} - ${(time as ITime)?.time_to}`
        //     : undefined,
        // }}
      />

      <TextInput
        hasError={!amount}
        errorMessage={'Amount Is Required'}
        showErrors={showErrors}
        title="Amount"
        value={amount}
        onChangeText={setAmount}
        placeholder="Add Amount"
        containerStyle={styles.topOffset}
      />

      <View style={{ ...styles.topOffset, ...styles.categoryContainer }}>
        <TouchableOpacity
          onPress={() => Navigation.navigate('CreateCategory')}
          style={styles.createCategoryButton}
          textStyle={styles.createCategoryText}
        >
          Create
        </TouchableOpacity>
        <DropDown
          hasError={true}
          showErrors={showErrors}
          label={'Category'}
          placeholder={'Choose Category'}
          options={[]}
          choose={() => null}
          // selectedItem={{
          //   label: time
          //     ? `${(time as ITime)?.time_from} - ${(time as ITime)?.time_to}`
          //     : undefined,
          // }}
        />
      </View>

      <DateSection />

      <TextInput
        title="Description (optional)"
        value={description}
        onChangeText={setDescription}
        placeholder="Write A Description"
        style={styles.decriptionInputStyle}
        containerStyle={styles.topOffset}
      />

      <Button onPress={addTransaction} style={styles.topOffset}>
        Add Transaction
      </Button>
    </ScreenContainer>
  );
};

export { AddTransaction };

const styles = StyleSheet.create({
  containerStyle: { alignItems: 'center' },
  topOffset: { marginTop: vs(20) },
  decriptionInputStyle: { height: vs(80) },
  categoryContainer: { width: '100%' },
  createCategoryButton: {
    position: 'absolute',
    top: 0,
    right: s(10),
    zIndex: 2,
  },
  createCategoryText: {
    color: COLORS.Primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
