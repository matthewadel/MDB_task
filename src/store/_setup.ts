import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';

// import { CategoryReducer, TransactionReducer } from '@/store';
import CategoryReducer from './category-reducer';
import TransactionReducer from './transaction-reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  Transactions: TransactionReducer,
  Categories: CategoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(logger),
  devTools: true,
});

const persistor = persistStore(store);

export { persistor, rootReducer, store };
