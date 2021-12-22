import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import {Button, Divider, Paragraph, Title} from 'react-native-paper';
import ProductCarousel from '../../components/Product/ProductCarousel';
import Tab from '../../components/Product/Tab';
import {Color} from '../../common';
import {authContext} from '../../context/AuthContext';
import {axios} from '../../utils/axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {placeComma} from '../../utils/commaSeparator';
import HTMLView from 'react-native-htmlview';

const ProductDetail = ({product}) => {
  const {
    id,
    title,
    mrp,
    offer_price,
    description,
    details,
    discount_percent,
    product_images,
    descriptionHTML,
    detailsHTML,
    agency,
    categories,
  } = product;

  const {state, dispatch} = useContext(authContext);
  const [active, setActive] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const handleActive = (index) => {
    setActive(index);
  };

  const addToCart = () => {
    if (state.isLoggedIn) {
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
    } else {
      ToastAndroid.show('Login to use Cart.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={addingToCart} />
      <ScrollView>
        <View style={styles.carouselContainer}>
          <ProductCarousel images={product_images} />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 32,
            alignItems: 'center',
          }}>
          <Title
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: Color.primary,
            }}>
            {categories[0].name}
          </Title>
          <Title
            style={{
              fontSize: 20,
              textAlign: 'center',
              lineHeight: 26,
              paddingVertical: 4,
            }}>
            {title}
          </Title>
          {state.isLoggedIn && (
            <>
              {!!offer_price && (
                <Paragraph>
                  <Text style={styles.offer(!!offer_price)}>
                    Rs. {placeComma(mrp)}
                  </Text>{' '}
                  {'  -' + discount_percent}%
                </Paragraph>
              )}
              <Paragraph style={styles.offerText}>
                Rs. {!!offer_price ? placeComma(offer_price) : placeComma(mrp)}
              </Paragraph>
            </>
          )}
          {!!agency && (
            <Text style={{paddingVertical: 4}}>Brand: {agency.name}</Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.tabContainer}>
            <Tab
              isActive={active == 0}
              title="Description"
              handlePress={() => handleActive(0)}
            />
            {(!!details || !!detailsHTML) && (
              <Tab
                isActive={active == 1}
                title="Details"
                handlePress={() => handleActive(1)}
              />
            )}
          </View>
          {active == 0 ? (
            <>
              <Paragraph style={styles.paddingHtml}>{description}</Paragraph>
              {!!descriptionHTML && (
                <>
                  <Divider />
                  <HTMLView value={descriptionHTML} stylesheet={htmlStyles} />
                </>
              )}
            </>
          ) : (
            <>
              {!!details && (
                <Paragraph style={styles.paddingHtml}>{details}</Paragraph>
              )}
              {!!details && !!detailsHTML && <Divider />}
              {!!detailsHTML && (
                <HTMLView value={detailsHTML} stylesheet={htmlStyles} />
              )}
            </>
          )}
        </View>
      </ScrollView>
      {state.isLoggedIn && (
        <Button
          icon="cart"
          style={{
            borderRadius: 0,
            backgroundColor: Color.primary,
            paddingVertical: 4,
          }}
          mode="contained"
          onPress={addToCart}>
          Add to cart
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    padding: 16,
  },
  carouselContainer: {
    marginVertical: 16,
  },
  detailsContainer: {
    backgroundColor: Color.lightGrey,
    paddingBottom: 64,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  offer: (offer) => ({
    textDecorationLine: offer ? 'line-through' : 'none',
  }),
  text: {
    textDecorationLine: 'line-through',
  },
  offerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  paddingHtml: {
    padding: 16,
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    padding: 16,
  },
});

export default ProductDetail;
