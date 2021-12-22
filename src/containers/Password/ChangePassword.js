import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {axios} from '../../utils/axios';
import {Language} from '../../common';
import styles from './styles';
import Theme from '../../common/Theme';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Required.'),
  newPassword: Yup.string()
    .min(8, Language.formError.passwordMin)
    .required('Required.'),
  confirmPassword: Yup.string()
    .required('Required.')
    .oneOf([Yup.ref('newPassword'), null], "Passwords don't match."),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      setLoading(true);
      axios
        .put('/api/profile/changePassword', {
          current_password: values.currentPassword,
          new_password: values.newPassword,
          new_password_confirmation: values.confirmPassword,
        })
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            ToastAndroid.show(
              Language.passwordChangeMessage,
              ToastAndroid.LONG,
            );
            formik.resetForm();
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

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <View style={styles.subContain}>
          <View style={styles.inputWrap}>
            <TextInput
              theme={Theme.light}
              mode="outlined"
              dense
              style={styles.input}
              underlineColorAndroid="transparent"
              label="Current Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={formik.handleChange('currentPassword')}
              value={formik.values.currentPassword}
            />
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <HelperText type="error">
                  {formik.errors.currentPassword}
                </HelperText>
              )}
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              theme={Theme.light}
              mode="outlined"
              dense
              style={styles.input}
              underlineColorAndroid="transparent"
              label="New Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={formik.handleChange('newPassword')}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <HelperText type="error">{formik.errors.newPassword}</HelperText>
            )}
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              theme={Theme.light}
              mode="outlined"
              dense
              style={styles.input}
              underlineColorAndroid="transparent"
              label="Confirm Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={formik.handleChange('confirmPassword')}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <HelperText type="error">
                  {formik.errors.confirmPassword}
                </HelperText>
              )}
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={formik.handleSubmit}>
            <Text style={styles.loginButtonText}>CHANGE PASSWORD</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
