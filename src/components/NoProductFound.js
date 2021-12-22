import React from 'react';
import {View, Text} from 'react-native';
import {Styles} from '../common';

const NoProductFound = () => {
  return (
    <View style={Styles.container}>
      <Text style={{marginVertical: 16, textAlign: 'center'}}>
        No product available.
      </Text>
    </View>
  );
};

export default NoProductFound;
