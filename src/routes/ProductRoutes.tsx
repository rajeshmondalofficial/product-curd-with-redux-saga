import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ProductList from '../features/productList';
import EditProduct from '../features/editProduct';

const Statck = createStackNavigator();

const ProductRoutes = () => {
  return (
    <Statck.Navigator screenOptions={{headerShown: false}}>
      <Statck.Screen name="list" component={ProductList} />
      <Statck.Screen name="edit" component={EditProduct} />
    </Statck.Navigator>
  );
};

export default ProductRoutes;
