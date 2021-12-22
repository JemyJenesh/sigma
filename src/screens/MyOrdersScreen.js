import React, {useEffect} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {Styles} from '../common';
import LogoSpinner from '../components/LogoSpinner';
import OrderCard from '../components/Order/OrderCard';
import useOrders from '../hooks/useOrders';

const MyOrdersScreen = () => {
  const {data, isLoading, isFetching} = useOrders();
  useEffect(() => {
    if (data) {
      let array = Object.keys(data).map((key) => ({
        ...data[key][0],
      }));
    }
  }, [data]);

  if (isLoading) return <LogoSpinner />;

  if (
    Object.keys(data).map((key) => ({
      ...data[key][0],
    })).length < 1
  )
    return (
      <View style={Styles.container}>
        <Text style={{marginVertical: 16, textAlign: 'center'}}>
          You have no orders.
        </Text>
      </View>
    );
  return (
    <FlatList
      style={Styles.container}
      data={Object.keys(data).map((key) => ({
        ...data[key][0],
      }))}
      keyExtractor={(item) => item.created_at}
      renderItem={({item}) => <OrderCard order={item} />}
      refreshControl={
        <RefreshControl refreshing={!isLoading && isFetching} enabled={false} />
      }
    />
  );
};

export default MyOrdersScreen;
