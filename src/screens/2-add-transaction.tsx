import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

import { TransactionInputFields } from '@/components';
import { useTransactions } from '@/hooks';
import { ICategory, TransactionType } from '@/types';
import { Button, ScreenContainer } from '@/ui';
import { formatDate } from '@/utils';

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
  const TransactionInputFieldsRef = useRef<TransactionInputFieldRef>(null);
  const { createTransaction: createTransactionHook } = useTransactions();

  const createTransaction = () => {
    if (TransactionInputFieldsRef.current?.validateInputs()) {
      createTransactionHook({
        date: TransactionInputFieldsRef.current?.getDate(),
        amount: parseFloat(TransactionInputFieldsRef.current?.getAmount()),
        type: TransactionInputFieldsRef.current?.getTransactionType(),
        category: TransactionInputFieldsRef.current?.getCategory(),
        description: TransactionInputFieldsRef.current?.getDescription(),
      });
      Navigation.goBack();
    }
  };

  return (
    <ScreenContainer
      screenHeaderProps={{ title: 'Add Transaction' }}
      style={styles.containerStyle}
    >
      <TransactionInputFields
        transaction={{ date: formatDate(new Date()) }}
        ref={TransactionInputFieldsRef}
      />

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
