import React, {useContext} from 'react';
import {View} from 'react-native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {MyOrdersScreen, OrderDetailScreen} from '../../screens';
import {HeaderLeftIcon} from '../../components/Header';
import {authContext} from '../../context/AuthContext';
import useOrderDetailsTitle from '../../hooks/useOrderDetailsTitle';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

const OrderStack = () => {
  const navigation = useNavigation();
  const {state} = useContext(authContext);
  const title = useOrderDetailsTitle((state) => state.title);
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <View />,
      }}>
      <Stack.Screen
        name="My Orders"
        component={MyOrdersScreen}
        options={{
          headerLeft: () => <HeaderLeftIcon />,
        }}
      />
      <Stack.Screen
        name="Order Details"
        component={OrderDetailScreen}
        options={{
          title: state.orderDetailTitle || title,
          headerLeft: (props) => <HeaderBackButton {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
