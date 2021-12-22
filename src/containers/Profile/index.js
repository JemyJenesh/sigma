import React, {Fragment, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {Styles} from '../../common';
import UserProfileHeader from '../../components/UserProfileHeader';
import UserProfileList from '../../components/UserProfileList';
import {authContext} from '../../context/AuthContext';
import usePagesStore from '../../hooks/usePagesStore';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Profile = () => {
  const {state} = useContext(authContext);
  const pages = usePagesStore((state) => state.pages);

  const navigation = useNavigation();
  const goToScreen = (name) => navigation.navigate(name);
  return (
    <ScrollView style={Styles.container}>
      <UserProfileHeader />
      <Divider />
      {pages &&
        pages.map((page) => (
          <Fragment key={page.id}>
            <List.Item
              left={({color}) => (
                <View style={styles.leftIcon}>
                  <SimpleLineIcons color={color} size={20} name="globe" />
                </View>
              )}
              title={page.title}
              onPress={() => goToScreen(page.title)}
            />
            <Divider />
          </Fragment>
        ))}
      {!state.isLoggedIn && (
        <>
          <List.Item
            left={({color}) => (
              <View style={styles.leftIcon}>
                <SimpleLineIcons color={color} size={20} name="login" />
              </View>
            )}
            title="Login"
            onPress={() => goToScreen('Login')}
          />
          <Divider />
        </>
      )}
      {state.isLoggedIn && <UserProfileList />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
