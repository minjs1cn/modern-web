import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginRequest, AuthService } from '@/services/authService';

import type { User, Permission } from '@/services/type';

export * from '@/services/authService';

const ns = 'auth';

export type AuthSliceState = {
  info: null | User;
  permissions: Permission[];
};

export const loginThunk = createAsyncThunk(
  `${ns}/login`,
  async (req: LoginRequest) => {
    const { code, data, message } = await AuthService.login(req);
    if (code === 0) {
      return data;
    } else {
      throw new Error(message);
    }
  },
);

export const isLoginThunk = createAsyncThunk(`${ns}/isLogin`, async () => {
  const { code, data, message } = await AuthService.isLogin();
  if (code === 0) {
    return data;
  } else {
    throw new Error(message);
  }
});

const initialState: AuthSliceState = {
  info: null,
  permissions: [],
};

export const authSlice = createSlice({
  name: ns,
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.info = payload;
    },
    setUserPermissions: (state, { payload }) => {
      state.permissions = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.info = payload.info;
      state.permissions = payload.permissions;
    });
    builder.addCase(isLoginThunk.fulfilled, (state, { payload }) => {
      state.info = payload.info;
      state.permissions = payload.permissions;
    });
  },
});

export const { setUserInfo, setUserPermissions } = authSlice.actions;
export default authSlice.reducer;
