import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Styles, Color, Language} from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Caption, Headline, HelperText} from 'react-native-paper';
import {axios} from '../../utils/axios';
import * as Yup from 'yup';
import {useFormik} from 'formik';

const validationSchema = Yup.object().shape({
  token: Yup.number().required('Code is required.'),
  password: Yup.string()
    .required(Language.formError.passwordRequired)
    .min(8, Language.formError.passwordMin),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match.")
    .required('Confirm Password is required'),
});

const PasswordReset = ({email}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      token: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post('/api/password/reset', {
          password: values.password,
          email: email,
          token: values.token,
        })
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            ToastAndroid.show(
              'Your password has been reset successfully.',
              ToastAndroid.LONG,
            );
            goToLogin();
          }
        })
        .catch((err) => {
          if (err.response) {
            setLoading(false);
            ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
          }
        });
    },
    validationSchema,
  });
  const goToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={[Styles.container, {paddingHorizontal: 16, paddingTop: 32}]}>
      <Spinner visible={loading} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        contentContainerStyle={{flex: 1}}>
        <Headline>Create new password</Headline>
        <Caption style={{fontSize: 16, marginBottom: 32}}>
          Enter the code sent to your email and change your password.
        </Caption>
        <View style={styles.inputWrap}>
          <Icon name="barcode" size={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Code"
            keyboardType="numeric"
            onChangeText={formik.handleChange('token')}
            value={formik.values.token}
          />
        </View>
        {formik.touched.token && formik.errors.token && (
          <HelperText type="error">{formik.errors.token}</HelperText>
        )}
        <View style={styles.inputWrap}>
          <Icon name="lock" size={20} style={styles.inputIcon} />
          <TextInput
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="New Password"
            onChangeText={formik.handleChange('password')}
            value={formik.values.password}
          />
        </View>
        {formik.touched.password && formik.errors.password && (
          <HelperText type="error">{formik.errors.password}</HelperText>
        )}
        <View style={styles.inputWrap}>
          <Icon name="lock" size={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            underlineColorAndroid="transparent"
            placeholder="Confirm Password"
            onChangeText={formik.handleChange('confirmPassword')}
            value={formik.values.confirmPassword}
          />
        </View>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <HelperText type="error">{formik.errors.confirmPassword}</HelperText>
        )}
        <TouchableOpacity style={styles.btn} onPress={formik.handleSubmit}>
          <Text style={styles.btnText}>RESET PASSWORD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            borderRadius: 5,
            elevation: 1,
            paddingVertical: 8,
          }}
          onPress={goToLogin}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: Color.primary,
            }}>
            GO TO LOGIN
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.blackDivide,
    borderBottomWidth: 1,
  },
  inputIcon: {
    width: 20,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 0,
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 8,
    flex: 1,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: Color.primary,
    borderRadius: 5,
    elevation: 1,
    paddingVertical: 8,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default PasswordReset;
