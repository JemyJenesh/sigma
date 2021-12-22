import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Language, Images, Color} from '../../common';
import {useNavigation} from '@react-navigation/native';

const CartEmpty = () => {
  const navigation = useNavigation();
  const goToShop = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.contentEmpty}>
      <View>
        <Image
          source={Images.IconCart}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{Language.ShoppingCartIsEmpty}</Text>
      <Button
        onPress={goToShop}
        mode="contained"
        style={{
          marginTop: 16,
          paddingHorizontal: 32,
          paddingVertical: 4,
          backgroundColor: Color.primary,
        }}>
        Go to Shop
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  contentEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: 'gray',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    fontFamily: 'Baloo',
  },
});

export default CartEmpty;
