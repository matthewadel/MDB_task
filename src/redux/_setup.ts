import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { CategoryReducer, TransactionReducer } from '@/redux';

const rootReducer = combineReducers({
  Transactions: TransactionReducer,
  Categories: CategoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});

export { rootReducer, store };
