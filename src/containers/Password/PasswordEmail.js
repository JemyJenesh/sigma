import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Spinner from 'react-native-loading-spinner-overlay';
import {Styles, Language, Color} from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Caption, Headline, HelperText} from 'react-native-paper';
import {axios} from '../../utils/axios';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import PasswordReset from './PasswordReset';
import Modal from 'react-native-modalbox';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(Language.formError.emailInvalid)
    .required(Language.formError.emailRequired),
});
const PasswordEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post('/api/password/email', values)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            ToastAndroid.show(res.data.message, ToastAndroid.LONG);
            setOpen(true);
          }
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.data.message);
            setLoading(false);
          }
        });
    },
    validationSchema,
  });
  useEffect(() => {
    setError(null);
  }, [formik.values.email]);
  return (
    <View style={Styles.container}>
      <Modal
        coverScreen
        swipeToClose={false}
        isOpen={open}
        useNativeDriver={false}
        style={Styles.container}>
        <PasswordReset email={formik.values.email} />
      </Modal>

      <Spinner visible={loading} />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          Styles.container,
          {padding: 16, paddingTop: 32},
        ]}
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Headline>Reset password</Headline>
        <Caption style={{fontSize: 16, marginBottom: 32}}>
          Enter the email associated with your account and we'll send an email
          with a code to reset your password.
        </Caption>
        <View style={styles.inputWrap}>
          <Icon name="envelope" size={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            placeholder={Language.Email}
            keyboardType="email-address"
            onChangeText={formik.handleChange('email')}
            value={formik.values.email}
          />
        </View>
        {(!!error || (formik.touched.email && formik.errors.email)) && (
          <HelperText type="error">{formik.errors.email || error}</HelperText>
        )}
        <TouchableOpacity style={styles.btn} onPress={formik.handleSubmit}>
          <Text style={styles.btnText}>SEND RESET CODE</Text>
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

export default PasswordEmail;
