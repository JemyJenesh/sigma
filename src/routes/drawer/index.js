import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import TabNav from '../TabNav';
import {PageScreen} from '../../screens';
import usePagesStore from '../../hooks/usePagesStore';
import Color from '../../common/Color';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const pages = usePagesStore((state) => state.pages);
  return (
    <Drawer.Navigator
      initialRouteName="Shop"
      drawerContentOptions={{
        activeTintColor: Color.primary,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Shop"
        component={TabNav}
        options={{
          drawerIcon: ({focused, size}) => (
            <AntDesignIcons
              name="home"
              size={size}
              color={focused ? Color.primary : 'gray'}
            />
          ),
        }}
      />
      {pages &&
        pages.map((page) => (
          <Drawer.Screen
            key={page.id}
            name={page.title}
            options={{
              drawerIcon: ({focused, size}) => (
                <SimpleLineIcons
                  name="globe"
                  size={size}
                  color={focused ? Color.primary : 'gray'}
                />
              ),
            }}>
            {(props) => <PageScreen {...props} page={page} />}
          </Drawer.Screen>
        ))}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
