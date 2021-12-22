import React, {useContext} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CategoriesScreen,
  CategoryProductListScreen,
  ProductDetailScreen,
} from '../../screens';
import {HeaderLeftIcon, HeaderIcon} from '../../components/Header';
import {authContext} from '../../context/AuthContext';

const Stack = createStackNavigator();

const CategoryStack = () => {
  const {state} = useContext(authContext);
  return (
    <Stack.Navigator
      initialRouteName="CategoryList"
      screenOptions={{
        headerRight: () => <View />,
      }}>
      <Stack.Screen
        name="CategoryList"
        component={CategoriesScreen}
        options={{
          headerLeft: () => <HeaderLeftIcon />,
          title: 'Categories',
          // headerTitle: () => <HeaderIcon />,
        }}
      />

      <Stack.Screen
        name="CategoryProductList"
        component={CategoryProductListScreen}
        options={{title: state.categoryTitle}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{
          headerTitle: () => <HeaderIcon />,
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoryStack;
