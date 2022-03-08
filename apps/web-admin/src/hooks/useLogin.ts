import { useCallback, useMemo } from 'react';
import Storage from '@utils/storage';
import { message } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from '@modern-js/runtime/router';
import { loginThunk, LoginRequest } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store';

const loginStorage = Storage.new<LoginRequest>('_admin_login');

export function useLogin() {
  const authInfo = useAppSelector(state => state.auth.info);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const login = useCallback(
    async ({ remember, ...values }: LoginRequest & { remember: boolean }) => {
      try {
        const res = await dispatch(loginThunk(values));
        unwrapResult(res);
        history.replace('/');
      } catch (error: any) {
        message.error(error.message);
      }
    },
    [dispatch],
  );

  const loginLocalState = useMemo(
    () => loginStorage.get() || { remember: true },
    [],
  );

  return {
    authInfo,
    login,
    loginLocalState,
    loginStorage,
  };
}
