import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screen/Home';

import Splash from '../Screen/Splash';
import Login from '../Screen/Login';
import SignUp from '../Screen/SignUp';

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  contentStyle: {
    backgroundColor: 'white',
  },
};
const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />

      <Stack.Screen name="Home" component={Home} />
  
    </Stack.Navigator>
  );
};

export default Router;
