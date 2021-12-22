import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {Styles, Color} from '../common';
import {placeComma} from '../utils/commaSeparator';

const statuses = {
  1: 'Pending',
  2: 'Processing',
  3: 'Delivered',
  4: 'Cancelled',
};

const OrderDetailScreen = ({route}) => {
  const {order} = route.params;
  const getStringStatus = (num) => {
    return statuses[num];
  };

  return (
    <ScrollView
      style={Styles.container}
      contentContainerStyle={{paddingVertical: 16}}>
      <View style={styles.tableRow(1)}>
        <Text style={[styles.orderItemCol, styles.boldText]}>Order Items</Text>
        {/* <Text style={[styles.quantityCol, styles.boldText]}>Quantity</Text> */}
        <Text style={[styles.priceCol, styles.boldText]}>Price</Text>
      </View>
      {order.order_products.map((orderProduct) => (
        <View key={orderProduct.id} style={styles.tableRow(0)}>
          <Text numberOfLines={2} style={styles.orderItemCol}>
            {orderProduct.product.title}{' '}
            <Text style={styles.timesQuantityText}>
              x{orderProduct.quantity}
            </Text>
          </Text>
          {/* <Text style={styles.quantityCol}>{orderProduct.quantity}</Text> */}
          <Text style={styles.priceCol}>
            Rs. {placeComma(orderProduct.price * orderProduct.quantity)}
          </Text>
        </View>
      ))}
      <View style={styles.tableFooter}>
        <Text style={[styles.boldText, {flexGrow: 1}]}>Total</Text>
        <Text style={[styles.bigText, {textAlign: 'right'}]}>
          Rs. {placeComma(order.total_amount)}
        </Text>
      </View>
      <List.Item
        title="Status"
        titleStyle={{fontSize: 20}}
        description={getStringStatus(order.order_status_id)}
      />
      {order.user_notes && (
        <List.Item
          title="Order Notes"
          titleStyle={{fontSize: 20}}
          description={order.user_notes}
        />
      )}
      <List.Item title="Details" titleStyle={{fontSize: 20}} />
      <View style={styles.tableRow(1)}>
        <Text style={[{flexBasis: '70%'}, styles.boldText]}>Order Items</Text>
        {/* <Text style={[styles.quantityCol, styles.boldText]}>Quantity</Text> */}
        <Text style={[styles.priceCol, styles.boldText]}>Status</Text>
      </View>
      {order.order_products.map((orderProduct) => {
        const lastItem =
          orderProduct.order_product_statuses[
            orderProduct.order_product_statuses.length - 1
          ];
        const tempStatuses = orderProduct.order_product_statuses.filter(
          (i) => i.created_at === lastItem.created_at,
        );
        return tempStatuses.map((item) => (
          <View key={item.id} style={styles.tableRow(0)}>
            <Text numberOfLines={2} style={{flexBasis: '70%'}}>
              {orderProduct.product.title}{' '}
              <Text style={styles.timesQuantityText}>x{item.quantity}</Text>
            </Text>
            {/* <Text style={styles.quantityCol}>{item.quantity}</Text> */}
            <Text style={styles.priceCol}>
              {getStringStatus(item.order_status_id)}
            </Text>
          </View>
        ));
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableRow: (borderBottomWidth) => ({
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: borderBottomWidth,
    borderBottomColor: Color.DirtyBackground,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  tableFooter: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Color.DirtyBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderItemCol: {flexBasis: '70%'},
  quantityCol: {flexBasis: '20%', textAlign: 'right'},
  priceCol: {flexBasis: '30%', textAlign: 'right'},
  boldText: {
    fontWeight: 'bold',
  },
  bigText: {
    fontSize: 18,
  },
  timesQuantityText: {
    color: Color.primary,
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;
