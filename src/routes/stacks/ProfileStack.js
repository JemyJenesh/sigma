import React, {useContext} from 'react';
import {View} from 'react-native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {
  LoginScreen,
  SignUpScreen,
  ProfileScreen,
  NotificationScreen,
  PasswordEmailScreen,
  ChangePasswordScreen,
  EditProfileScreen,
} from '../../screens';
import {HeaderLeftIcon, HeaderIcon} from '../../components/Header';
import {authContext} from '../../context/AuthContext';

const Stack = createStackNavigator();

const ProfileStack = ({navigation}) => {
  const {state} = useContext(authContext);
  return (
    <Stack.Navigator
      initialRouteName="UserProfile"
      screenOptions={{
        headerRight: () => <View />,
        headerTitle: () => <HeaderIcon />,
      }}>
      {!state.isLoggedIn && (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: 'Login',
              headerLeft: () => (
                <HeaderBackButton
                  onPress={() => navigation.navigate('UserProfile')}
                />
              ),
            }}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="PasswordEmail" component={PasswordEmailScreen} />
        </>
      )}
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{headerLeft: () => <HeaderLeftIcon />}}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{headerTitle: 'Notifications'}}
      />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
