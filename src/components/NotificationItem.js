import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Divider, List} from 'react-native-paper';
import {axios} from '../utils/axios';
import moment from 'moment';
import {Color} from '../common';
import {authContext} from '../context/AuthContext';

const NotificationItem = ({notification}) => {
  const [loading, setLoading] = useState(false);
  const {dispatch} = useContext(authContext);
  const navigation = useNavigation();
  const handleClick = () => {
    if (notification.type == 'App\\Notifications\\NewProductArrived') {
      setLoading(true);
      let productId = notification.data.product_id;
      axios
        .get('/api/products/show/' + productId)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            navigation.navigate('Home', {
              screen: 'ProductDetails',
              params: {
                product: res.data,
              },
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        });
    } else if (notification.type == 'App\\Notifications\\OrderStatusUpdated') {
      setLoading(true);
      axios
        .get('/api/orders/show/' + notification.data.order_id)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            dispatch({
              type: 'CHANGE_ORDER_DETAIL_TITLE',
              payload: {title: 'Order  #' + res.data.id},
            });
            navigation.navigate('Orders', {
              screen: 'Order Details',
              params: {
                order: res.data,
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
      notification.type == 'App\\Notifications\\ManualAdminNotification'
    ) {
      let productId = notification.data.payload.product_id;
      if (productId == undefined) return;
      setLoading(true);
      axios
        .get('/api/products/show/' + productId)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            navigation.navigate('Home', {
              screen: 'ProductDetails',
              params: {
                product: res.data,
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
  };
  return (
    <>
      <Spinner visible={loading} />
      <List.Item
        title={notification.data.message}
        description={moment(notification.created_at).fromNow()}
        left={() => (
          <List.Icon icon="alert-octagram-outline" color={Color.primary} />
        )}
        onPress={handleClick}
      />
      <Divider />
    </>
  );
};

export default NotificationItem;
