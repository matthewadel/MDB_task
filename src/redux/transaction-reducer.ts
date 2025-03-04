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
      // state.notch = action.payload;
    },
    deleteTransaction(state, action: PayloadAction<number>) {
      // state.actualHeight = action.payload;
    },
  },
});

export const { addTransaction, deleteTransaction } = TransactionSlice.actions;

export const TransactionReducer = TransactionSlice.reducer;
