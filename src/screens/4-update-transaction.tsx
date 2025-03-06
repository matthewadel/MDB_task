import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import { TransactionInputFields } from '@/components';
import { TransactionInputFieldRef } from '@/screens';
import { deleteTransaction, updateTransaction } from '@/store';
import { ITransaction } from '@/types';
import {
  Button,
  closeAlert,
  COLORS,
  ScreenContainer,
  showAlert,
  View,
} from '@/ui';

interface IParams extends RouteProp<ParamListBase> {
  params: {
    transaction: ITransaction;
  };
}

const UpdateTransaction = () => {
  const Navigation = useNavigation<any>();
  let { params } = useRoute<IParams>();

  const dispatch = useDispatch();
  const TransactionInputFieldsRef = useRef<TransactionInputFieldRef>(null);

  const updateTransactionByID = () => {
    if (TransactionInputFieldsRef.current?.validateInputs()) {
      dispatch(
        updateTransaction({
          id: params.transaction.id,
          transaction: {
            date: TransactionInputFieldsRef.current?.getDate(),
            amount: parseFloat(TransactionInputFieldsRef.current?.getAmount()),
            type: TransactionInputFieldsRef.current?.getTransactionType(),
            category: TransactionInputFieldsRef.current?.getCategory(),
            description: TransactionInputFieldsRef.current?.getDescription(),
          },
        }),
      );
      setTimeout(() => {
        showMessage({
          message: 'Transaction Updated Successfully',
        });
      }, 100);
      Navigation.goBack();
    }
  };

  const deleteCategoryWarning = () => {
    showAlert({
      title: 'Are you sure?',
      message: `This Transaction Will Be Deleted!`,
      alertType: 'warning',
      onPress: deleteTransactionByID,
    });
  };

  const deleteTransactionByID = () => {
    dispatch(deleteTransaction({ id: params.transaction.id }));
    Navigation.goBack();
    closeAlert();
    setTimeout(() => {
      showMessage({
        message: 'Transaction Created Successfully',
      });
    }, 100);
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
          onPress={deleteCategoryWarning}
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
