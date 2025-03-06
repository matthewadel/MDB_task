import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

// import { CategoryReducer, TransactionReducer } from '@/store';
import CategoryReducer from './category-reducer';
import TransactionReducer from './transaction-reducer';

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
