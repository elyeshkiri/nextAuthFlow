import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {userSlice} from '../features/auth/authSlice';
const reducers = combineReducers({
  user: userSlice.reducer,           
 });
const persistConfig = {
     key: 'root',
     storage
 };
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
     reducer: persistedReducer,
     devTools: process.env.NODE_ENV !== 'production',
 });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;