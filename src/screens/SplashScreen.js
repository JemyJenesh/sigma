import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Color from '../common/Color';
import Images from '../common/Images';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.Logo} style={{height: 70}} resizeMode="center" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: Color.blackTextPrimary,
  },
});

export default SplashScreen;
