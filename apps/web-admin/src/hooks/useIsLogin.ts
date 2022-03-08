import { useCallback, useEffect } from 'react';
import { message } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from '@modern-js/runtime/router';
import { isLoginThunk } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store';

export function useIsLogin() {
  const authInfo = useAppSelector(state => state.auth.info);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isLogin = useCallback(async () => {
    try {
      const res = await dispatch(isLoginThunk());
      unwrapResult(res);
    } catch (error: any) {
      message.error(error.message);
      history.push('/login');
    }
  }, [dispatch]);

  useEffect(() => {
    if (!authInfo) {
      isLogin();
    }
  }, [authInfo]);

  return {
    authInfo,
    isLogin,
  };
}
