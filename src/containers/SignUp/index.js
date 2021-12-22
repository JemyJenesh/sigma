import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {axios} from '../../utils/axios';
import {Language} from '../../common';
import styles from './styles';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, Language.formError.nameMin)
    .required(Language.formError.nameRequired),
  username: Yup.string()
    .min(3, Language.formError.usernameMin)
    .test('no-space', Language.formError.usernameNoSpace, (value) => {
      let re = /^\S+$/g;
      return re.test(value);
    })
    .required(Language.formError.usernameRequired),
  phone: Yup.string()
    .min(6, Language.formError.phoneMin)
    .max(15, Language.formError.phonemax)
    .required(Language.formError.phoneRequired),
  storeName: Yup.string().required(Language.formError.storeNameRequired),
  email: Yup.string()
    .email(Language.formError.emailInvalid)
    .required(Language.formError.emailRequired),
  password: Yup.string()
    .min(8, Language.formError.passwordMin)
    .required(Language.formError.passwordRequired),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      phone: '',
      storeName: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      setLoading(true);
      setEmailError(null);
      setUsernameError(null);
      axios
        .post('/api/auth/register', {
          name: values.name,
          username: values.username,
          phone: values.phone,
          store_name: values.storeName,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.status === 200) {
            ToastAndroid.show(Language.SignUpMessage, ToastAndroid.LONG);
            formik.resetForm();
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.errors['username'])
              setUsernameError(err.response.data.errors['username']);
            if (err.response.data.errors['email'])
              setEmailError(err.response.data.errors['email']);
            ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
          }
        })
        .finally(() => setLoading(false));
    },
    validationSchema,
  });

  useEffect(() => {
    if (emailError) setEmailError(null);
  }, [formik.values.email]);
  useEffect(() => {
    if (usernameError) setUsernameError(null);
  }, [formik.values.username]);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <View style={styles.subContain}>
          <View style={styles.loginForm}>
            <View style={styles.inputWrap}>
              <Icon name="user" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={Language.Name}
                onChangeText={formik.handleChange('name')}
                value={formik.values.name}
              />
            </View>
            {formik.touched.name && formik.errors.name && (
              <HelperText type="error">{formik.errors.name}</HelperText>
            )}
            <View style={styles.inputWrap}>
              <Icon name="user" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={Language.username}
                autoCapitalize="none"
                onChangeText={formik.handleChange('username')}
                value={formik.values.username}
              />
            </View>
            {((formik.touched.username && formik.errors.username) ||
              !!usernameError) && (
              <HelperText type="error">
                {formik.errors.username || usernameError}
              </HelperText>
            )}
            <View style={styles.inputWrap}>
              <Icon name="phone" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={Language.Phone}
                keyboardType="number-pad"
                onChangeText={formik.handleChange('phone')}
                value={formik.values.phone}
              />
            </View>
            {formik.touched.phone && formik.errors.phone && (
              <HelperText type="error">{formik.errors.phone}</HelperText>
            )}
            <View style={styles.inputWrap}>
              <Icon name="store" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Store Name"
                onChangeText={formik.handleChange('storeName')}
                value={formik.values.storeName}
              />
            </View>
            {formik.touched.storeName && formik.errors.storeName && (
              <HelperText type="error">{formik.errors.storeName}</HelperText>
            )}
            <View style={styles.inputWrap}>
              <Icon name="envelope" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={Language.Email}
                keyboardType="email-address"
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
              />
            </View>
            {((formik.touched.email && formik.errors.email) ||
              !!emailError) && (
              <HelperText type="error">
                {formik.errors.email || emailError}
              </HelperText>
            )}
            <View style={styles.inputWrap}>
              <Icon name="lock" size={20} style={styles.inputIcon} />
              <TextInput
                type="flat"
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={Language.password}
                secureTextEntry
                returnKeyType="go"
                autoCapitalize="none"
                onChangeText={formik.handleChange('password')}
                value={formik.values.password}
              />
            </View>
            {formik.touched.password && formik.errors.password && (
              <HelperText type="error">{formik.errors.password}</HelperText>
            )}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={formik.handleSubmit}>
              <Text style={styles.loginButtonText}>
                {Language.signup.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
