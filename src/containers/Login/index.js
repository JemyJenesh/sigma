import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Images, Language} from '../../common';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {axios, setAuthToken} from '../../utils/axios';
import {authContext} from '../../context/AuthContext';
import {setToken} from '../../utils/tokenHelper';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = ({goToSignUp, goToPasswordEmail}) => {
  const {dispatch} = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleLogin = async () => {
    if (!loading) {
      if (!email || !password) {
        ToastAndroid.show(Language.EMAIL_PASSWORD_EMPTY, ToastAndroid.SHORT);
        return;
      } else if (!validateEmail(email)) {
        ToastAndroid.show(Language.INVALID_EMAIL, ToastAndroid.SHORT);
        return;
      }
      setLoading(true);
      await axios
        .post('api/auth/login', {
          email,
          password,
        })
        .then((res) => {
          dispatch({
            type: 'LOGIN',
            payload: {
              user: res.data.user,
              token: res.data.token,
            },
          });
          ToastAndroid.show('Welcome!', ToastAndroid.SHORT);
          setToken(res.data.token);
          setAuthToken(res.data.token);
        })
        .catch(
          (err) =>
            err.response &&
            ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT),
        );
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <View style={styles.logoWrap}>
          <Image
            source={Images.Logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.subContain}>
          <View style={styles.loginForm}>
            <View style={styles.inputWrap}>
              <Icon name="envelope" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                placeholder={Language.Email}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                returnKeyType="next"
                value={email}
              />
            </View>
            <View style={styles.inputWrap}>
              <Icon name="lock" size={20} style={styles.inputIcon} />
              <TextInput
                type="flat"
                autoCapitalize="none"
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={Language.password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                returnKeyType="go"
                value={password}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>
                {Language.Login.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.signUp}>
              {Language.DontHaveAccount}{' '}
              <Text style={styles.highlight}>{Language.signup}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToPasswordEmail}>
            <Text style={styles.signUp}>
              <Text style={styles.highlight}>{Language.forgotPassword}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
