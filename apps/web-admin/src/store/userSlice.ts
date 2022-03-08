import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetSystemUserRequest, UserService } from '@/services/userService';

import type { Pagination, User } from '@/services/type';

export * from '@/services/authService';

const ns = 'user';

export type UserSliceState = {
  list: User[];
  pagination: Pagination;
};

export const getSystemUserThunk = createAsyncThunk(
  `${ns}/getSystemPermission`,
  async (req: GetSystemUserRequest) => {
    const { code, data, message } = await UserService.getSystemUser(req);
    if (code === 0) {
      return data;
    } else {
      throw new Error(message);
    }
  },
);

const initialState: UserSliceState = {
  list: [],
  pagination: {
    page: 1,
    size: 10,
  },
};

export const permissionSlice = createSlice({
  name: ns,
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.list = payload;
    },
    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSystemUserThunk.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});

export const { setUsers, setPagination } = permissionSlice.actions;
export default permissionSlice.reducer;
