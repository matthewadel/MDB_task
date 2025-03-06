import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iTransaction, ITransactionReducer } from '@/types';

const initialState: ITransactionReducer = {
  transactions: [],
};

const TransactionSlice = createSlice({
  name: 'Transactions',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<iTransaction>) {
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
  },
});

export const { addTransaction, deleteTransaction } = TransactionSlice.actions;

export default TransactionSlice.reducer;
