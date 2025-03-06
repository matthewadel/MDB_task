import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICategory, ICategoryReducer } from '@/types';

const initialState: ICategoryReducer = {
  categories: [
    {
      id: 1,
      label: 'general',
    },
  ],
};

const CategorySlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<Partial<ICategory>>) {
      if (action.payload.label)
        state.categories.push({
          id: Math.random(),
          label: action.payload.label,
        });
    },
    deleteCategory(state, action: PayloadAction<{ id: number }>) {
      state.categories = state.categories.filter(
        (item) => item.id !== action.payload.id,
      );
    },
  },
});

export const { addCategory, deleteCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
