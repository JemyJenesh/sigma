import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductDetailScreen, SearchScreen} from '../../screens';
import {HeaderIcon} from '../../components/Header';
import {View} from 'react-native';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerRight: () => <View />,
        headerTitle: () => <HeaderIcon />,
      }}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
