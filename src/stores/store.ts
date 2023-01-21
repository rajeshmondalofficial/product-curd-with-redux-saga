import createSagaMiddleware from '@redux-saga/core';
import {configureStore} from '@reduxjs/toolkit';
import {rootSaga} from '../saga/rootSaga';
import authSlice from './authSlice';
import productSlice from './productSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice
  },
  middleware: [sagaMiddleware],
});

export type RootStateI = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
