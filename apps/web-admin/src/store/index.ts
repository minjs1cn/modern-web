import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import authReducer from './authSlice';
import permissionReducer from './permissionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    permission: permissionReducer,
  },
  middleware: get => get().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

export default store;
