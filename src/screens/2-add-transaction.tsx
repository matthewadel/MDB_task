import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import { TransactionInputFields } from '@/components';
import { addTransaction } from '@/store';
import { ICategory, TransactionType } from '@/types';
import { Button, ScreenContainer } from '@/ui';

export interface TransactionInputFieldRef {
  validateInputs: () => boolean;
  getAmount: () => string;
  getDescription: () => string;
  getTransactionType: () => TransactionType;
  getCategory: () => ICategory;
  getDate: () => string;
}

const AddTransaction = () => {
  const Navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const TransactionInputFieldsRef = useRef<TransactionInputFieldRef>(null);

  const createTransaction = () => {
    if (TransactionInputFieldsRef.current?.validateInputs()) {
      dispatch(
        addTransaction({
          date: TransactionInputFieldsRef.current?.getDate(),
          amount: parseFloat(TransactionInputFieldsRef.current?.getAmount()),
          type: TransactionInputFieldsRef.current?.getTransactionType(),
          category: TransactionInputFieldsRef.current?.getCategory(),
          description: TransactionInputFieldsRef.current?.getDescription(),
        }),
      );
      setTimeout(() => {
        showMessage({
          message: 'Transaction Created Successfully',
        });
      }, 100);
      Navigation.goBack();
    }
  };

  return (
    <ScreenContainer
      screenHeaderProps={{ title: 'Add Transaction' }}
      style={styles.containerStyle}
    >
      <TransactionInputFields ref={TransactionInputFieldsRef} />

      <Button onPress={createTransaction} style={styles.topOffset}>
        Add Transaction
      </Button>
    </ScreenContainer>
  );
};

export { AddTransaction };

const styles = StyleSheet.create({
  containerStyle: { alignItems: 'center' },
  topOffset: { marginTop: vs(20) },
});
