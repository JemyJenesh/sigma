import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {CartScreen, ProductDetailScreen} from '../../screens';
import {HeaderIcon} from '../../components/Header';

const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{
        headerRight: () => <View />,
        headerTitle: () => <HeaderIcon />,
      }}>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
