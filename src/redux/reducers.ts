import { createSlice } from '@reduxjs/toolkit';

import { ICategoryReducer, ITransactionReducer } from '@/types';

const initialCategoryState: ICategoryReducer = {
  categories: [],
};

const initialTransactionState: ITransactionReducer = {
  transactions: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState: initialCategoryState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: initialTransactionState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export const { setTransactions } = transactionSlice.actions;

export const CategoryReducer = categorySlice.reducer;
export const TransactionReducer = transactionSlice.reducer;
