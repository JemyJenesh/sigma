import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNav from './drawer';
import {authContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';
import Config from 'react-native-config';
import PushNotification from 'react-native-push-notification';
import {navigationRef, navigate} from '../utils/RootNavigatorService';
import {axios} from '../utils/axios';
import useNotificationStore from '../hooks/useNotificationStore';
import useOrderDetailsTitle from '../hooks/useOrderDetailsTitle';
import {useNetInfo} from '@react-native-community/netinfo';
import {NoNetworkScreen} from '../screens';

PushNotification.configure({
  onNotification: function (notification) {
    if (notification.data.type == 'App\\Notifications\\NewProductArrived') {
      let productId = notification.data.product_id;
      axios
        .get('/api/products/show/' + productId)
        .then((res) => {
          if (res.status === 200) {
            navigate('Shop', {
              screen: 'Home',
              initial: false,
              params: {
                screen: 'ProductDetails',
                params: {
                  product: res.data,
                },
              },
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        });
    } else if (
      notification.data.type == 'App\\Notifications\\OrderStatusUpdated'
    ) {
      axios
        .get('/api/orders/show/' + notification.data.order_id)
        .then((res) => {
          if (res.status === 200) {
            const setTitle = useOrderDetailsTitle.getState().setTitle;
            setTitle('Order #' + res.data.id);
            navigate('Shop', {
              screen: 'Orders',
              initial: false,
              params: {
                screen: 'Order Details',
                params: {
                  order: res.data,
                },
              },
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        });
    } else if (
      notification.data.type == 'App\\Notifications\\ManualAdminNotification'
    ) {
      let productId = notification.data.payload.product_id;
      if (productId == undefined) return;
      axios
        .get('/api/products/show/' + productId)
        .then((res) => {
          if (res.status === 200) {
            navigate('Shop', {
              screen: 'Home',
              initial: false,
              params: {
                screen: 'ProductDetails',
                params: {
                  product: res.data,
                },
              },
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        });
    }
    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

const RootNav = () => {
  const {state} = useContext(authContext);
  const netInfo = useNetInfo();
  const incrementCount = useNotificationStore((s) => s.incrementCount);
  let PusherClient = new Pusher(Config.PUSHER_APP_KEY, {
    cluster: Config.PUSHER_APP_CLUSTER,
    authEndpoint: Config.SERVER_URL + '/api/broadcasting/auth',
    auth: {
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
    },
  });

  let echo = new Echo({
    broadcaster: 'pusher',
    client: PusherClient,
  });
  useEffect(() => {
    if (state.isLoggedIn) {
      echo.private('App.User.' + state.user.id).notification((notification) => {
        PushNotification.localNotification({
          // title: 'My Notification Title', // (optional)
          message: notification.message, // (required)
          data: notification,
        });
        incrementCount();
      });
    } else {
      PushNotification.cancelAllLocalNotifications();
      echo.disconnect();
      PusherClient.disconnect();
    }
    return () => {
      echo.disconnect();
      PusherClient.disconnect();
    };
  }, [state.isLoggedIn]);

  if (state.isLoading) {
    return <SplashScreen />;
  }
  if (!netInfo.isConnected) {
    return <NoNetworkScreen />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <DrawerNav />
    </NavigationContainer>
  );
};

export default RootNav;
