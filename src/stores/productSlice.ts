import {createSlice} from '@reduxjs/toolkit';
import {ProductInitialStateI} from '../types/product';

const initialState: ProductInitialStateI = {
  products: [],
  isEditing: false,
  isAdding: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.isAddedSuccessfully = true;
      state.isAdding = !state.isAdding;
    },
    loadProduct: (state, action) => {
      state.products = action.payload;
    },
    toggleAdding: state => {
      state.isAdding = !state.isAdding;
    },
    toggleEditing: state => {
      state.isEditing = !state.isEditing;
    },
    successEdit: state => {
      state.isEditedSuccessfully = true;
    },
    resetSuccessEdit: state => {
      state.isEditedSuccessfully = false;
    },
  },
});

export const {
  addProduct,
  loadProduct,
  toggleAdding,
  toggleEditing,
  successEdit,
  resetSuccessEdit,
} = productSlice.actions;
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const PRODUCT_DELETE = 'PRODUCT_DELETE';
export const EDIT_PRODUCT_WITH_IMAGE = 'EDIT_PRODUCT_WITH_IMAGE';
export const EDIT_PRODUCT_WITHOUT_IMAGE = 'EDIT_PRODUCT_WITHOUT_IMAGE';

export default productSlice.reducer;
