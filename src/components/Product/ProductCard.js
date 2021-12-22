import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Button, Card, Paragraph, Subheading, Title} from 'react-native-paper';
import Color from '../../common/Color';
import {authContext} from '../../context/AuthContext';
import {axios} from '../../utils/axios';
import {placeComma} from '../../utils/commaSeparator';

const ProductCard = ({product}) => {
  const {state, dispatch} = useContext(authContext);
  const [addingToCart, setAddingToCart] = useState(false);

  const {
    id,
    title,
    mrp,
    offer_price,
    discount_percent,
    agency,
    categories,
  } = product;
  const navigation = useNavigation();
  const goToProductDetail = () => {
    navigation.navigate('ProductDetails', {product});
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
      <Card
        style={{marginBottom: 16, width: '48%'}}
        onPress={goToProductDetail}>
        <Card.Cover
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
        />
        <Card.Content
          style={{flex: 1, marginHorizontal: -8, marginVertical: -4}}>
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
          {!!agency && <Text>{agency.name}</Text>}
          {state.isLoggedIn && (
            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {!!offer_price && (
                  <Paragraph>
                    <Text style={styles.offer(!!offer_price)}>
                      Rs. {placeComma(mrp)}
                    </Text>{' '}
                    {'  -' + discount_percent}%
                  </Paragraph>
                )}
                <Title style={styles.offerText}>
                  Rs.{' '}
                  {!!offer_price ? placeComma(offer_price) : placeComma(mrp)}
                </Title>
              </View>

              <Button
                mode="contained"
                icon="cart"
                color={Color.primary}
                style={{marginTop: 8}}
                labelStyle={{fontSize: 12}}
                onPress={addToCart}>
                Add to Cart
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  offer: (offer) => ({
    textDecorationLine: offer ? 'line-through' : 'none',
  }),
  text: {
    textDecorationLine: 'line-through',
  },
  offerText: {
    fontSize: 16,
    lineHeight: 18,
    color: Color.primary,
  },
});

export default ProductCard;
