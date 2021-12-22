import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Image,
  Text,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/Feather';
import {axios} from '../../utils/axios';
import {placeComma} from '../../utils/commaSeparator';
import Color from '../../common/Color';

const CartItemCard = ({cart, deleteCartItem, updateCartItem}) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(cart.quantity);
  const [deletingCartItem, setDeletingCartItem] = useState(false);
  const confirmDelete = () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete the cart item?',
      [
        {
          text: 'Cancel',
        },
        {text: 'Yes', onPress: handleDelete},
      ],
    );
  };
  const handleDelete = () => {
    setDeletingCartItem(true);
    axios.delete(`api/cart/${cart.id}`).then((res) => {
      if (res.status === 200) {
        deleteCartItem(cart.id);
        ToastAndroid.show(
          'The item has been deleted from the cart.',
          ToastAndroid.SHORT,
        );
        setDeletingCartItem(false);
      }
    });
  };

  const handleUpdate = (value) => {
    setQuantity(value);
    updateCartItem(cart.id, value);
  };

  const goToProductDetails = () => {
    navigation.navigate('ProductDetails', {
      product: cart.product,
    });
  };

  useEffect(() => {
    setQuantity(cart.quantity);
  }, [cart]);

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
      }}>
      <Spinner visible={deletingCartItem} />
      <TouchableOpacity
        style={{overflow: 'hidden', borderRadius: 16}}
        onPress={goToProductDetails}>
        <Image
          style={{height: 100, width: 95}}
          source={{
            uri: !cart.product.primary_image_url.includes(
              'default_primary_image.png',
            )
              ? cart.product.primary_image_url
              : cart.product.categories.length > 0 &&
                cart.product.categories.image_url
              ? cart.product.categories[0].image_url
              : cart.product.agency && cart.product.agency.logo_url
              ? cart.product.agency.logo_url
              : cart.product.primary_image_url,
          }}
        />
      </TouchableOpacity>
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <Text numberOfLines={2} style={{fontSize: 14, fontWeight: 'bold'}}>
          {cart.product.categories.length > 0 &&
            cart.product.categories[0].name + ' - '}
          {cart.product.title}
        </Text>
        <Text style={{color: Color.primary, fontWeight: 'bold'}}>
          Rs.{' '}
          {!!cart.product.offer_price
            ? placeComma(cart.product.offer_price * cart.quantity)
            : placeComma(cart.product.mrp * cart.quantity)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <NumericInput
            rounded
            totalHeight={32}
            editable={false}
            initValue={cart.quantity}
            value={quantity}
            minValue={1}
            maxValue={cart.product.maximum_quantity_per_order}
            onChange={(value) => handleUpdate(value)}
            leftButtonBackgroundColor={quantity === 1 ? 'lightgray' : 'white'}
            rightButtonBackgroundColor={
              quantity === cart.product.maximum_quantity_per_order
                ? 'lightgray'
                : 'white'
            }
            containerStyle={{marginTop: 8}}
          />
          <Icon
            name="trash-2"
            size={20}
            style={{color: 'gray'}}
            onPress={confirmDelete}
          />
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;
