import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const HeaderRightIcon = () => {
  const navigation = useNavigation();
  const toggleDrawer = () => navigation.toggleDrawer();
  return (
    <Icon
      name="menu"
      size={28}
      style={{marginLeft: 16}}
      onPress={toggleDrawer}
    />
  );
};

export default HeaderRightIcon;
