import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color} from '../common';
import ProfileStack from './stacks/ProfileStack';
import HomeStack from './stacks/HomeStack';
import SearchStack from './stacks/SearchStack';
import CategoryStack from './stacks/CategoryStack';
import CartStack from './stacks/CartStack';
import {authContext} from '../context/AuthContext';
import OrderStack from './stacks/OrdersStack';
import useNotificationStore from '../hooks/useNotificationStore';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const {
    state: {isLoggedIn, user},
  } = useContext(authContext);
  const unreadnotificationsCount = useNotificationStore(
    (state) => state.unreadnotificationsCount,
  );
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          if (route.name == 'Home') {
            return <AntDesignIcons name="home" size={20} color={color} />;
          } else if (route.name == 'Profile') {
            return <Ionicons name="person-outline" size={20} color={color} />;
          } else if (route.name == 'Search') {
            return <Ionicons name="search" size={20} color={color} />;
          } else if (route.name == 'Cart') {
            return (
              <MaterialCommunityIcons
                name="cart-outline"
                size={20}
                color={color}
              />
            );
          } else if (route.name == 'Categories') {
            return <FeatherIcon name="grid" size={20} color={color} />;
          } else if (route.name == 'Orders') {
            return <FeatherIcon name="shopping-bag" size={20} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Color.primary,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeStack} options={{title: 'Shop'}} />
      <Tab.Screen name="Categories" component={CategoryStack} />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{unmountOnBlur: true}}
      />
      {isLoggedIn && (
        <Tab.Screen
          name="Cart"
          component={CartStack}
          options={{
            tabBarBadge:
              isLoggedIn && user.carts_count > 0 ? user.carts_count : null,
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          unmountOnBlur: true,
          tabBarBadge: isLoggedIn && unreadnotificationsCount > 0 ? '' : null,
        }}
      />
      {isLoggedIn && (
        <Tab.Screen
          name="Orders"
          component={OrderStack}
          options={{unmountOnBlur: true}}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabNav;
