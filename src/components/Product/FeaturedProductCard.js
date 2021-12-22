import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../../common/Color';
import {authContext} from '../../context/AuthContext';

const FeaturedProduct = ({product, index}) => {
  const {title, categories, mrp, offer_price, agency} = product;
  const {state} = useContext(authContext);
  const navigation = useNavigation();
  const goToProductDetail = () => {
    navigation.navigate('ProductDetails', {product});
  };
  return (
    <TouchableOpacity onPress={goToProductDetail}>
      <View style={styles.surface(index)}>
        <Image
          height={80}
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
          style={{flex: 1, height: 100, width: 100}}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={2} style={styles.text}>
            {categories.length > 0 && categories[0].name + ' - '}
            {title}
          </Text>
          <Text style={{color: 'black'}}>{!!agency && agency.name}</Text>
          <Text>
            {state.isLoggedIn && (
              <Text style={[styles.text, {color: Color.primary, fontSize: 16}]}>
                Rs. {offer_price ? offer_price : mrp}
                {'  '}
              </Text>
            )}
            {state.isLoggedIn && offer_price && (
              <Text
                style={[
                  styles.text,
                  {
                    color: 'black',
                    fontWeight: '400',
                    textDecorationLine: 'line-through',
                  },
                ]}>
                Rs. {mrp}
              </Text>
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    padding: 8,
  },
  text: {
    fontWeight: 'bold',
  },
  surface: (index) => ({
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: index % 2 === 0 ? Color.primary : Color.secondary,
    marginHorizontal: 16,
    backgroundColor: 'white',
  }),
});

export default FeaturedProduct;
