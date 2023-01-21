import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../features/login';
import Signup from '../features/signup';

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
