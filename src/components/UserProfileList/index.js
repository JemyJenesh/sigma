import React, {useContext, useState} from 'react';
import {ToastAndroid, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Badge, Divider, List} from 'react-native-paper';
import useNotificationStore from '../../hooks/useNotificationStore';
import {axios} from '../../utils/axios';
import Spinner from 'react-native-loading-spinner-overlay';
import RNRestart from 'react-native-restart';
import PushNotification from 'react-native-push-notification';
import {authContext} from '../../context/AuthContext';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const UserProfileList = () => {
  const {dispatch} = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const notifications = useNotificationStore(
    (state) => state.unreadnotificationsCount,
  );
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  const navigation = useNavigation();
  const goToNotifications = () => {
    if (notifications > 0) {
      axios.get('/api/notifications/markAllAsRead').then((res) => {
        if (res.status === 200) {
          // console.log('Mark all read');
          markAllAsRead();
        }
      });
    }
    navigation.navigate('Notifications');
  };
  const goToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };
  const goToEditProfile = () => {
    navigation.navigate('Edit Profile');
  };
  const logout = () => {
    setLoading(true);
    axios
      .post('/api/auth/logout')
      .then((res) => {
        if (res.status == 200) {
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
    <View>
      <Spinner visible={loading} />
      <List.Item
        left={({color}) => (
          <View style={styles.leftIcon}>
            <SimpleLineIcons color={color} size={20} name="bell" />
          </View>
        )}
        title="Notification"
        right={() => notifications > 0 && <Badge></Badge>}
        onPress={goToNotifications}
      />
      <Divider />
      <List.Item
        left={({color}) => (
          <View style={styles.leftIcon}>
            <SimpleLineIcons color={color} size={20} name="user" />
          </View>
        )}
        title="Edit Profile"
        onPress={goToEditProfile}
      />
      <Divider />
      <List.Item
        left={({color}) => (
          <View style={styles.leftIcon}>
            <SimpleLineIcons color={color} size={20} name="lock" />
          </View>
        )}
        title="Change Password"
        onPress={goToChangePassword}
      />
      <Divider />
      <List.Item
        left={({color}) => (
          <View style={styles.leftIcon}>
            <SimpleLineIcons color={color} size={20} name="logout" />
          </View>
        )}
        title="Logout"
        onPress={logout}
      />
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserProfileList;
