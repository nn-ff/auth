import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/types';

interface userState {
  user: IUser[];
  isAuth: boolean;
  current: IUser | null;
}

const initialState: userState = {
  user: [
    {
      login: 'frost333',
      email: 'daybi@mail.ru',
      pw: '123456',
      pwRepeat: '123456',
      token: 125125125,
    },
  ],
  isAuth: false,
  current: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    regUser: (state, action: PayloadAction<IUser>) => {
      state.user = [...state.user, action.payload];
      state.current = action.payload;
    },
    Auth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    Exit: (state) => {
      state.current = null;
      state.isAuth = false;
    },
    FindUser: (state, action: PayloadAction<{ pw: string; login: string }>) => {
      let currentuser = state.user.find(
        (obj) => obj.login === action.payload.login && obj.pw === action.payload.pw,
      );
      state.current = currentuser === undefined ? null : currentuser;
    },
  },
});

export const { regUser, Auth, FindUser, Exit } = userSlice.actions;

export default userSlice.reducer;
