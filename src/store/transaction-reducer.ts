import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITransaction, ITransactionReducer } from '@/types';

const initialState: ITransactionReducer = {
  transactions: [],
};

const TransactionSlice = createSlice({
  name: 'Transactions',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<ITransaction>) {
      state.transactions.push({
        ...action.payload,
        id: (state.transactions[state.transactions.length - 1]?.id || 0) + 1,
      });
    },
    deleteTransaction(state, action: PayloadAction<{ id?: number }>) {
      if (action.payload.id)
        state.transactions = state.transactions.filter(
          (item) => item.id !== action.payload.id,
        );
    },
    updateTransaction(
      state,
      action: PayloadAction<{ id?: number; transaction: ITransaction }>,
    ) {
      if (action.payload.id)
        state.transactions = state.transactions.map((item) => {
          if (item.id === action.payload.id)
            return { ...item, ...action.payload.transaction };
          else return item;
        });
    },
  },
});

export const { addTransaction, deleteTransaction, updateTransaction } =
  TransactionSlice.actions;

export default TransactionSlice.reducer;
