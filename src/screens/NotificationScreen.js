import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import LogoSpinner from '../components/LogoSpinner';
import {Styles} from '../common';
import {FlatList} from 'react-native-gesture-handler';
import useNotificationStore from '../hooks/useNotificationStore';
import NotificationItem from '../components/NotificationItem';

const NotificationScreen = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications,
  );
  useEffect(() => {
    fetchNotifications();
  }, []);
  if (notifications === null) return <LogoSpinner />;
  if (notifications.length < 1)
    return (
      <View style={[Styles.container, {padding: 16}]}>
        <Text style={{textAlign: 'center'}}>Your notification is empty.</Text>
      </View>
    );
  return (
    <View style={Styles.container}>
      <FlatList
        data={notifications}
        renderItem={({item}) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NotificationScreen;
