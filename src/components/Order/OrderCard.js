import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Button,
  Caption,
  DataTable,
  Subheading,
  Title,
} from 'react-native-paper';
import {Color} from '../../common';
import {placeComma} from '../../utils/commaSeparator';
import {authContext} from '../../context/AuthContext';

const statuses = {
  1: 'Pending',
  2: 'Processing',
  3: 'Delivered',
  4: 'Cancelled',
};

const OrderCard = ({order}) => {
  const navigation = useNavigation();
  const {dispatch} = useContext(authContext);
  const getStringStatus = (num) => {
    return statuses[num];
  };
  const goToOrderDetails = () => {
    navigation.navigate('Order Details', {
      order,
    });
    dispatch({
      type: 'CHANGE_ORDER_DETAIL_TITLE',
      payload: {title: 'Order  #' + order.id},
    });
  };
  return (
    <TouchableOpacity
      onPress={goToOrderDetails}
      style={{
        margin: 16,
        borderWidth: 1,
        borderColor: Color.DirtyBackground,
        borderRadius: 8,
      }}>
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title>
            <Subheading>#{order.id}</Subheading>
          </DataTable.Title>
          {/* <DataTable.Cell numeric>
            <Button
              mode="text"
              compact
              color={Color.primary}
              onPress={goToOrderDetails}>
              Show Details
            </Button>
          </DataTable.Cell> */}
        </DataTable.Header>

        <DataTable.Row style={styles.tableRow}>
          <DataTable.Cell>
            <Caption>Order Date</Caption>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Caption>{order.created_at.slice(0, 10)}</Caption>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.tableRow}>
          <DataTable.Cell>
            <Caption>Status</Caption>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Caption>{getStringStatus(order.order_status_id)}</Caption>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.tableRow}>
          <DataTable.Cell>
            <Caption>Total</Caption>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Title style={{fontSize: 18}}>
              Rs. {placeComma(order.total_amount)}
            </Title>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.DirtyBackground,
    borderBottomWidth: 0,
    borderTopEndRadius: 8,
  },
  tableRow: {
    borderBottomWidth: 0,
    minHeight: 0,
    paddingVertical: 6,
  },
});

export default OrderCard;
