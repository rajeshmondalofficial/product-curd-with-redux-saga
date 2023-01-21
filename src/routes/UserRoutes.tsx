import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductList from '../features/productList';
import ProductRoutes from './ProductRoutes';
import AddProduct from '../features/addProduct';

const Tab = createBottomTabNavigator();

const UserRoutes = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="product"
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="albums" size={size} color={color} />
          ),
          tabBarLabel: 'Product List',
        }}
        component={ProductRoutes}
      />
      <Tab.Screen
        name="add-product"
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="add-circle" size={size} color={color} />
          ),
          tabBarLabel: 'Add Product',
        }}
        component={AddProduct}
      />
    </Tab.Navigator>
  );
};

export default UserRoutes;
