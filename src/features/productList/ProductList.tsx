import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {AppDispatch, RootStateI} from '../../stores';
import {ProductInitialStateI} from '../../types/product';
import ProductItem from '../../components/ProductItem';
import {
  LOAD_PRODUCTS,
  PRODUCT_DELETE,
  resetSuccessEdit,
} from '../../stores/productSlice';

interface ProductListPropsI {
  product: ProductInitialStateI;
  load: () => void;
  deleteProduct: (payload: string) => void;
  navigation: any;
  resetEdit: () => void;
}

const ProductList: React.FC<ProductListPropsI> = props => {
  const {product, load, deleteProduct, navigation, resetEdit} = props;
  
  useEffect(() => {
    load();
  }, []);

  return (
    <FlatList
      ListEmptyComponent={
        <Text style={{textAlign: 'center', padding: 12}}>
          No products found
        </Text>
      }
      data={product.products}
      renderItem={({item}) => (
        <ProductItem
          item={item}
          deleteItem={deleteProduct}
          navigation={navigation}
          resetEdit={resetEdit}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const mapStateToProps = (state: RootStateI) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    load: () => dispatch({type: LOAD_PRODUCTS}),
    deleteProduct: (payload: string) =>
      dispatch({type: PRODUCT_DELETE, payload}),
    resetEdit: () => dispatch(resetSuccessEdit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
