import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiUser } from '@services/login';
import { login as apiLogin } from '@/services/login';

type UserSliceState = {
  info: null | ApiUser;
};

const initialState: UserSliceState = {
  info: null,
};

export const login = createAsyncThunk('user/login', apiLogin);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: { payload: ApiUser }) => {
      state.info = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      const data = payload;
      if (data) {
        state.info = data;
      }
    });
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
