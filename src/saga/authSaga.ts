import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  checkForUserLoginPersistance,
  createUserWithUsernameAndPassword,
  loginWithUsernameAndPassword,
} from '../services/auth';
import {
  CHECK_FOR_AUTHENTICATION,
  login,
  REQUEST_LOGIN,
  REQUEST_SIGNUP,
  setError,
} from '../stores/authSlice';
import {LoginCredentialsI, UserI} from '../types';

function* handleLoginRequest(action: PayloadAction<LoginCredentialsI>) {
  try {
    const user: UserI = yield call(
      loginWithUsernameAndPassword,
      action.payload,
    );

    yield put(login(user));
  } catch (e) {
    yield put(setError(e));
  }
}

function* handleSignupRequest(action: PayloadAction<LoginCredentialsI>) {
  try {
    const user: UserI = yield call(
      createUserWithUsernameAndPassword,
      action.payload,
    );
    yield put(login(user));
  } catch (e) {
    yield put(setError(e));
  }
}

function* handleCheckLoginPersistance() {
  try {
    const user: UserI = yield call(checkForUserLoginPersistance);
    yield put(login(user));
  } catch (error) {}
}

export function* authSaga() {
  yield takeLatest(REQUEST_LOGIN, handleLoginRequest);
  yield takeLatest(REQUEST_SIGNUP, handleSignupRequest);
  yield takeLatest(CHECK_FOR_AUTHENTICATION, handleCheckLoginPersistance);
}
