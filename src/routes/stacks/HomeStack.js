import React, {useContext} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AgencyCategoriesScreen,
  HomeScreen,
  ProductDetailScreen,
  ProductListScreen,
  AgencySubCategoriesScreen,
} from '../../screens';
import {HeaderLeftIcon, HeaderIcon} from '../../components/Header';
import {authContext} from '../../context/AuthContext';

const Stack = createStackNavigator();

const HomeStack = () => {
  const {state} = useContext(authContext);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => <HeaderLeftIcon />,
          headerRight: () => <View />,
          headerTitle: () => <HeaderIcon />,
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          headerShown: false,
          title: state.agencyTitle,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{
          headerRight: () => <View />,
          headerTitle: () => <HeaderIcon />,
        }}
      />
      <Stack.Screen
        name="AgencyCategoriesList"
        component={AgencyCategoriesScreen}
        options={{
          headerShown: false,
          headerRight: () => <View />,
          title: state.agencyTitle,
        }}
      />
      <Stack.Screen
        name="AgencySubCategoriesList"
        component={AgencySubCategoriesScreen}
        options={{
          headerShown: false,
          headerRight: () => <View />,
          title: state.agencyTitle,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
