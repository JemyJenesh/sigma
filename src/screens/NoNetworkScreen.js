import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import Color from '../common/Color';

const NoNetworkScreen = () => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="wifi-off"
        size={32}
        onPress={() => console.log('Pressed')}
      />
      <Text>No network connection</Text>
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

export default NoNetworkScreen;
