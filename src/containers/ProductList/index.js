import React from 'react';
import {View, Text} from 'react-native';

const ProductList = ({agencyId}) => {
  return (
    <View>
      <Text>{agencyId}</Text>
    </View>
  );
};

export default ProductList;
