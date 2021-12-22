import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {Images} from '../../common';
import {authContext} from '../../context/AuthContext';

const UserProfileHeader = () => {
  const {state} = useContext(authContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            state.isLoggedIn && !!state.user.avatar_url
              ? {uri: state.user.avatar_url}
              : Images.defaultAvatar
          }
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.fullName} numberOfLines={2}>
            {!state.isLoggedIn ? 'Guest' : state.user.name}
          </Text>
          {state.isLoggedIn && (
            <Text style={styles.loginText}>
              {state.user.user_detail.store_name}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserProfileHeader;
