import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  createProductInFirestore,
  deleteProduct,
  editProductWithImage,
  editProductWithoutImage,
  getAllProducts,
} from '../services/product';
import {
  addProduct,
  CREATE_PRODUCT,
  EDIT_PRODUCT_WITHOUT_IMAGE,
  EDIT_PRODUCT_WITH_IMAGE,
  loadProduct,
  LOAD_PRODUCTS,
  PRODUCT_DELETE,
  successEdit,
  toggleAdding,
  toggleEditing,
} from '../stores/productSlice';
import {ProductsI} from '../types/product';

function* handleCreateProduct(action: PayloadAction<ProductsI>) {
  try {
    yield put(toggleAdding());
    const product: ProductsI = yield call(
      createProductInFirestore,
      action.payload,
    );
    yield put(addProduct(product));
  } catch (error) {
    console.log('Product Saga Error', error);
  }
}

function* handleLoadProduct() {
  try {
    const products: ProductsI[] = yield call(getAllProducts);
    yield put(loadProduct(products));
  } catch (error) {}
}

function* handleProductDelete(action: PayloadAction<string>) {
  try {
    const response: string = yield call(deleteProduct, action.payload);
    const products: ProductsI[] = yield call(getAllProducts);
    yield put(loadProduct(products));
  } catch (error) {}
}

function* handleEditProductWithImage(action: PayloadAction<ProductsI>) {
  try {
    yield put(toggleEditing());
    const product: ProductsI = yield call(editProductWithImage, action.payload);
    const products: ProductsI[] = yield call(getAllProducts);
    yield put(loadProduct(products));
    yield put(toggleEditing());
    yield put(successEdit());
  } catch (error) {}
}

function* handleEditProductWithoutImage(action: PayloadAction<ProductsI>) {
  try {
    yield put(toggleEditing());
    const product: ProductsI = yield call(
      editProductWithoutImage,
      action.payload,
    );
    const products: ProductsI[] = yield call(getAllProducts);
    yield put(loadProduct(products));
    yield put(toggleEditing());
    yield put(successEdit());
  } catch (error) {}
}

export function* productSaga() {
  yield takeLatest(CREATE_PRODUCT, handleCreateProduct);
  yield takeLatest(LOAD_PRODUCTS, handleLoadProduct);
  yield takeLatest(PRODUCT_DELETE, handleProductDelete);
  yield takeLatest(EDIT_PRODUCT_WITHOUT_IMAGE, handleEditProductWithoutImage);
  yield takeLatest(EDIT_PRODUCT_WITH_IMAGE, handleEditProductWithImage);
}
