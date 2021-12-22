import React from 'react';
import Login from '../containers/Login';

const LoginScreen = ({navigation}) => {
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };
  const goToPasswordEmail = () => {
    navigation.navigate('PasswordEmail');
  };
  return (
    <Login goToSignUp={goToSignUp} goToPasswordEmail={goToPasswordEmail} />
  );
};

export default LoginScreen;
