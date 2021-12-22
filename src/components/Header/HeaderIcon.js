import React from 'react';
import {Image, View} from 'react-native';
import {Images} from '../../common';

const HeaderIcon = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={Images.Logo} style={{width: 120}} resizeMode="contain" />
    </View>
  );
};

export default HeaderIcon;
