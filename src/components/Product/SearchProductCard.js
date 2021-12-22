import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Card,
  Title,
  Subheading,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import Color from '../../common/Color';
import {authContext} from '../../context/AuthContext';
import {axios} from '../../utils/axios';
import {placeComma} from '../../utils/commaSeparator';

const SearchProductCard = ({product}) => {
  const {
    id,
    title,
    agency,
    mrp,
    offer_price,
    categories,
    discount_percent,
  } = product;
  const {state, dispatch} = useContext(authContext);
  const [addingToCart, setAddingToCart] = useState(false);
  const navigation = useNavigation();
  const goToProductDetail = () => {
    navigation.navigate('ProductDetails', {
      product,
    });
  };
  const addToCart = () => {
    setAddingToCart(true);
    axios
      .post('/api/cart', {
        product_id: id,
        quantity: 1,
      })
      .then((res) => {
        setAddingToCart(false);
        if (res.status === 200) {
          ToastAndroid.show('Product added to the cart.', ToastAndroid.SHORT);
          dispatch({
            type: 'CHANGE_CART_COUNT',
            payload: {amount: res.data.count},
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          setAddingToCart(false);
          ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
        }
      });
  };
  return (
    <>
      <Spinner visible={addingToCart} />
      <TouchableOpacity
        style={{
          padding: 8,
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
        }}
        onPress={goToProductDetail}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: !product.primary_image_url.includes(
                'default_primary_image.png',
              )
                ? product.primary_image_url
                : product.categories.length > 0 && product.categories.image_url
                ? product.categories[0].image_url
                : product.agency && product.agency.logo_url
                ? product.agency.logo_url
                : product.primary_image_url,
            }}
            style={{height: 100, width: 100, borderRadius: 16}}
          />
          <Card.Content style={{flexShrink: 1}}>
            <Subheading
              numberOfLines={2}
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                lineHeight: 18,
                marginTop: 8,
              }}>
              {categories.length > 0 && categories[0].name + ' - '}
              {title}
            </Subheading>
            {!!agency && <Text style={{lineHeight: 16}}>{agency.name}</Text>}
            {state.isLoggedIn && (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  {!!offer_price && (
                    <Paragraph>
                      <Text style={styles.offer(!!offer_price)}>
                        Rs. {placeComma(mrp)}
                      </Text>{' '}
                      {'  -' + discount_percent}%
                    </Paragraph>
                  )}
                  <Title style={styles.offerText}>
                    Rs. {placeComma(!!offer_price ? offer_price : mrp)}
                  </Title>
                </View>
                <IconButton
                  icon="cart"
                  color="white"
                  style={{backgroundColor: Color.primary}}
                  onPress={addToCart}
                />
              </View>
            )}
          </Card.Content>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  offer: (offer) => ({
    textDecorationLine: offer ? 'line-through' : 'none',
  }),
  offerText: {
    fontSize: 16,
    lineHeight: 18,
    color: Color.primary,
  },
});

export default SearchProductCard;
