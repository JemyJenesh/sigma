import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Button, List, Title} from 'react-native-paper';
import {Color, Styles} from '../../common';
import CartItemCard from '../../components/Cart/CartItemCard';
import LogoSpinner from '../../components/LogoSpinner';
import {axios} from '../../utils/axios';
import CartEmpty from '../../components/Cart/CartEmpty';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {placeComma} from '../../utils/commaSeparator';
import {authContext} from '../../context/AuthContext';

const Cart = () => {
  const {state, dispatch} = useContext(authContext);
  const navigation = useNavigation();
  const [cart, setCart] = useState(null);
  const [cartChanged, setCartChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [placingOrder, setPlacingOrder] = useState(false);

  const fetchCart = async () => {
    await axios
      .get('/api/cart')
      .then((res) => {
        if (res.status === 200) {
          setCart(res.data);
        }
      })
      .catch((err) => err.response && console.log(err.response));
    setLoading(false);
  };

  const confirmPlaceOrder = () => {
    Alert.alert(
      'Order Confirmation',
      'Are you sure you want to place the order?',
      [
        {
          text: 'Cancel',
        },
        {text: 'Yes', onPress: placeOrder},
      ],
    );
  };
  const placeOrder = async () => {
    setPlacingOrder(true);

    axios
      .get('/api/cart/order')
      .then((res) => {
        if (res.status === 200) {
          setCart([]);
          ToastAndroid.show('Your order has been placed.', ToastAndroid.LONG);
          dispatch({
            type: 'CHANGE_CART_COUNT',
            payload: {amount: null},
          });
        }
      })
      .catch((err) => err.response && console.log(err.response))
      .finally(() => setPlacingOrder(false));
  };

  const deleteCartItem = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
    dispatch({
      type: 'CHANGE_CART_COUNT',
      payload: {amount: state.user.carts_count - 1},
    });
  };

  const updateCartItem = (id, quantity) => {
    setCartChanged(true);
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id ? {...cartItem, quantity} : cartItem,
      ),
    );
  };

  const updateCart = () => {
    setPlacingOrder(true);

    axios
      .put('api/cart', {
        cart_items: cart.map((c) => ({id: c.id, quantity: c.quantity})),
      })
      .then((res) => {
        if (res.status === 200) {
          ToastAndroid.show('Your cart has been updated.', ToastAndroid.SHORT);
        }
      })
      .catch((err) => err.response && console.log(err.response.data))
      .finally(() => {
        setPlacingOrder(false);
        setCartChanged(false);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setCartChanged(false);
      await fetchCart();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (cart !== null && cart.length > 0) {
      let total = 0;
      cart.forEach((c) => {
        if (!!c.product.offer_price)
          total += c.product.offer_price * c.quantity;
        else total += c.product.mrp * c.quantity;
      });
      setCartTotalPrice(total);
    }
  }, [cart]);

  if (loading) {
    return <LogoSpinner />;
  }
  if (cart && cart.length < 1) {
    return <CartEmpty />;
  }
  return (
    <View style={Styles.container}>
      <Spinner visible={placingOrder} />
      <List.Item
        style={{borderBottomWidth: 1, borderBottomColor: 'lightgray'}}
        title="Total Price"
        right={() => (
          <Title style={{textAlignVertical: 'center'}}>
            Rs {placeComma(cartTotalPrice)}
          </Title>
        )}
      />
      <ScrollView>
        {cart &&
          cart.map((cart) => (
            <CartItemCard
              cart={cart}
              deleteCartItem={deleteCartItem}
              updateCartItem={updateCartItem}
            />
          ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: -2}, // change this for more shadow
          shadowOpacity: 1,
          marginTop: 19,
        }}>
        <Button
          mode="text"
          color={Color.primary}
          onPress={updateCart}
          labelStyle={{color: Color.primary}}
          style={styles.updateBtn}>
          Update Cart
        </Button>
        <Button
          mode="contained"
          onPress={confirmPlaceOrder}
          style={styles.placeOrderBtn}>
          Place Order
        </Button>
      </View>
      {cartChanged && (
        <Text
          style={{
            paddingVertical: 4,
            textAlign: 'center',
            color: Color.primary,
          }}>
          Press UPDATE CART to update your cart.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  updateBtn: {
    borderRadius: 0,
    backgroundColor: Color.lightGrey,
    paddingVertical: 4,
    flex: 1,
  },
  placeOrderBtn: {
    borderRadius: 0,
    backgroundColor: Color.primary,
    paddingVertical: 4,
    flex: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default Cart;
