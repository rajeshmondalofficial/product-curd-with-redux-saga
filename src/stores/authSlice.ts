import {createSlice} from '@reduxjs/toolkit';
import {InitialAuthstate} from '../types';

const initialState: InitialAuthstate = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {login, setError} = authSlice.actions;

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const CHECK_FOR_AUTHENTICATION = 'CHECK_FOR_AUTHENTICATION';

export default authSlice.reducer;
