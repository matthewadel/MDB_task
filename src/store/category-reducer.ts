import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICategory, ICategoryReducer } from '@/types';

const initialState: ICategoryReducer = {
  categories: [
    {
      id: 1,
      title: 'general',
    },
  ],
};

const CategorySlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<ICategory>) {
      // state.notch = action.payload;
    },
    deleteCategory(state, action: PayloadAction<number>) {
      // state.actualHeight = action.payload;
    },
  },
});

export const { addCategory, deleteCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
