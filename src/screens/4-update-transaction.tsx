import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

import { TransactionInputFields } from '@/components';
import { useTransactions } from '@/hooks';
import { TransactionInputFieldRef } from '@/screens';
import { ITransaction } from '@/types';
import { Button, COLORS, ScreenContainer, View } from '@/ui';

interface IParams extends RouteProp<ParamListBase> {
  params: {
    transaction: ITransaction;
  };
}

const UpdateTransaction = () => {
  const Navigation = useNavigation<any>();
  let { params } = useRoute<IParams>();
  const { deleteTransaction, updateTransaction } = useTransactions();

  const TransactionInputFieldsRef = useRef<TransactionInputFieldRef>(null);

  const updateTransactionByID = () => {
    if (TransactionInputFieldsRef.current?.validateInputs()) {
      updateTransaction({
        id: params.transaction.id,
        transaction: {
          date: TransactionInputFieldsRef.current?.getDate(),
          amount: parseFloat(TransactionInputFieldsRef.current?.getAmount()),
          type: TransactionInputFieldsRef.current?.getTransactionType(),
          category: TransactionInputFieldsRef.current?.getCategory(),
          description: TransactionInputFieldsRef.current?.getDescription(),
        },
      });
      Navigation.goBack();
    }
  };

  return (
    <ScreenContainer
      screenHeaderProps={{ title: 'Update Transaction' }}
      style={styles.containerStyle}
    >
      <TransactionInputFields
        transaction={params.transaction}
        ref={TransactionInputFieldsRef}
      />

      <View style={styles.buttonsContainer}>
        <Button onPress={updateTransactionByID} style={styles.topOffset}>
          Update
        </Button>
        <Button
          onPress={() => deleteTransaction(params.transaction.id)}
          style={[styles.topOffset, styles.deleteButtonStyle]}
        >
          Delete
        </Button>
      </View>
    </ScreenContainer>
  );
};

export { UpdateTransaction };

const styles = StyleSheet.create({
  containerStyle: { alignItems: 'center' },
  topOffset: { marginTop: vs(20) },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  deleteButtonStyle: { backgroundColor: COLORS.Red },
});
