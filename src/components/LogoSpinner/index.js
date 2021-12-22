import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Color from '../../common/Color';

const LogoSpinner = () => {
  return (
    <View style={styles.container_full_stretch}>
      <ActivityIndicator animating color={Color.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container_full_stretch: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogoSpinner;
