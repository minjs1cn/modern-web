import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  GetSystemPermissionRequest,
  PermissionService,
} from '@/services/permissionService';

import type { Permission } from '@/services/type';

export * from '@/services/authService';

const ns = 'permission';

export const getSystemPermissionThunk = createAsyncThunk(
  `${ns}/getSystemPermission`,
  async (req: GetSystemPermissionRequest) => {
    const { code, data, message } = await PermissionService.getSystemPermission(
      req,
    );
    if (code === 0) {
      return data;
    } else {
      throw new Error(message);
    }
  },
);

export type PermissionSliceState = {
  list: Permission[];
  loading: boolean;
};

const initialState: PermissionSliceState = {
  list: [],
  loading: false,
};

export const permissionSlice = createSlice({
  name: ns,
  initialState,
  reducers: {
    addPermission: (state, { payload }) => {
      state.list.push(payload);
    },
    updatePermission: (state, { payload }) => {
      state.list
        .filter(item => item.id === payload.id)
        .forEach(item => {
          Object.assign(item, payload);
        });
    },
    removePermission: (state, { payload }) => {
      const index = state.list.findIndex(item => item.id === payload.id);
      if (index >= 0) {
        state.list.splice(index, 1);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getSystemPermissionThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getSystemPermissionThunk.fulfilled,
      (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      },
    );
    builder.addCase(getSystemPermissionThunk.rejected, state => {
      state.loading = false;
    });
  },
});

export const { addPermission, updatePermission, removePermission } =
  permissionSlice.actions;
export default permissionSlice.reducer;
