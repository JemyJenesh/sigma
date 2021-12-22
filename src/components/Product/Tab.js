import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {Color} from '../../common';

const Tab = ({isActive, handlePress, title}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.container(isActive)}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (active) => ({
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: active ? Color.primary : 'transparent',
    fontSize: 16,
  }),
});

export default Tab;
