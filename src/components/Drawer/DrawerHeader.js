import React, {useContext} from 'react';
import {Card, Avatar} from 'react-native-paper';
import {Images} from '../../common';
import {authContext} from '../../context/AuthContext';

const DrawerHeader = () => {
  const {state} = useContext(authContext);
  return (
    <Card.Title
      title={!state.isLoggedIn ? 'Guest' : state.user.name}
      subtitle={!state.isLoggedIn ? '' : state.user.user_detail.store_name}
      style={{marginVertical: 16}}
      leftStyle={{marginRight: 32}}
      left={() => (
        <Avatar.Image
          size={64}
          source={
            state.isLoggedIn && !!state.user.avatar_url
              ? {uri: state.user.avatar_url}
              : Images.defaultAvatar
          }
        />
      )}
    />
  );
};

export default DrawerHeader;
