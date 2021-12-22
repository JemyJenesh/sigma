import React, {useContext, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import DrawerHeader from '../../components/Drawer/DrawerHeader';
import {authContext} from '../../context/AuthContext';
import {Caption, Divider, Subheading} from 'react-native-paper';
import {ToastAndroid, View} from 'react-native';
import Color from '../../common/Color';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import {axios} from '../../utils/axios';
import PushNotification from 'react-native-push-notification';
import RNRestart from 'react-native-restart';

function DrawerContent(props) {
  const {state, dispatch} = useContext(authContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    axios
      .post('/api/auth/logout')
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          dispatch({type: 'LOGOUT'});
          PushNotification.cancelAllLocalNotifications();
          ToastAndroid.show('Logged out succesfully!', ToastAndroid.SHORT);
          RNRestart.Restart();
        }
      })
      .catch((err) => err.response && console.log('err: ' + err.response.data))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Spinner visible={loading} />
      <DrawerHeader />
      <Divider />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {!state.isLoggedIn ? (
          <DrawerItem
            label="Login"
            icon={({focused, size}) => (
              <SimpleLineIcons
                name="login"
                size={size}
                color={focused ? Color.primary : 'gray'}
              />
            )}
            onPress={() =>
              props.navigation.navigate('Shop', {
                screen: 'Profile',
                params: {
                  screen: 'Login',
                },
              })
            }
          />
        ) : (
          <>
            <DrawerItem
              label="Profile"
              icon={({focused, size}) => (
                <SimpleLineIcons
                  name="user"
                  size={size}
                  color={focused ? Color.primary : 'gray'}
                />
              )}
              onPress={() =>
                props.navigation.navigate('Shop', {
                  screen: 'Profile',
                  params: {
                    screen: 'Edit Profile',
                  },
                })
              }
            />
            <DrawerItem
              label="Notification"
              icon={({focused, size}) => (
                <SimpleLineIcons
                  name="bell"
                  size={size}
                  color={focused ? Color.primary : 'gray'}
                />
              )}
              onPress={() =>
                props.navigation.navigate('Shop', {
                  screen: 'Profile',
                  params: {
                    screen: 'Notifications',
                  },
                })
              }
            />
            <DrawerItem
              label="Logout"
              icon={({size}) => (
                <SimpleLineIcons name="logout" size={size} color={'gray'} />
              )}
              onPress={handleLogout}
            />
          </>
        )}
      </DrawerContentScrollView>
      <Divider />
      <View style={styles.infoContainer}>
        <Subheading style={[styles.textCenter, styles.ln16]}>
          Softweb Developers
        </Subheading>
        <Caption style={[styles.textCenter, styles.ln12]}>v 1.0.1</Caption>
      </View>
    </>
  );
}

const styles = {
  infoContainer: {
    padding: 8,
  },
  textCenter: {
    textAlign: 'center',
    margin: 0,
    padding: 0,
  },
  ln16: {
    lineHeight: 16,
  },
  ln12: {
    lineHeight: 12,
  },
};

export default DrawerContent;
