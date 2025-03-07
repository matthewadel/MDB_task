import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';

import { addTransaction } from '@/store';
import {
  deleteTransaction as deleteTransactionFromRedux,
  updateTransaction as updateTransactionInRedux,
} from '@/store';
import { ITransaction } from '@/types';
import { closeAlert, showAlert } from '@/ui';

const useTransactions = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation<any>();

  const createTransaction = (Transaction: ITransaction) => {
    dispatch(addTransaction(Transaction));
    setTimeout(() => {
      showMessage({
        message: 'Transaction Created Successfully',
      });
    }, 100);
  };

  const updateTransaction = ({
    id,
    transaction,
  }: {
    id?: number;
    transaction: ITransaction;
  }) => {
    if (id) {
      dispatch(updateTransactionInRedux({ id, transaction }));
      setTimeout(() => {
        showMessage({
          message: 'Transaction Updated Successfully',
        });
      }, 100);
    }
  };

  const deleteTransaction = (id?: number) => {
    if (id)
      showAlert({
        title: 'Are you sure?',
        message: `This Transaction Will Be Deleted!`,
        alertType: 'warning',
        onPress: () => deleteTransactionByID(id),
      });
  };

  const deleteTransactionByID = (id: number) => {
    dispatch(deleteTransactionFromRedux({ id }));
    Navigation.goBack();
    closeAlert();
    setTimeout(() => {
      showMessage({
        message: 'Transaction Created Successfully',
      });
    }, 100);
  };

  return {
    createTransaction,
    deleteTransaction,
    updateTransaction,
  };
};

export { useTransactions };
