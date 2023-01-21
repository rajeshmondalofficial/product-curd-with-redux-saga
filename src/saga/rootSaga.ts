import {all} from 'redux-saga/effects';
import {authSaga} from './authSaga';
import {productSaga} from './productSaga';

export function* rootSaga() {
  yield all([authSaga(), productSaga()]);
}
