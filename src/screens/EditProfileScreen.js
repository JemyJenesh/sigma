import React, {useContext, useState} from 'react';
import {View, StyleSheet, ToastAndroid, Image} from 'react-native';
import {Appbar, Button, HelperText, List, TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {authContext} from '../context/AuthContext';
import {Images, Language} from '../common';
import {useFormik} from 'formik';

import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {axios} from '../utils/axios';
import Spinner from 'react-native-loading-spinner-overlay';
import countries from '../common/countries.json';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import ImagePicker from 'react-native-image-picker';
import Color from '../common/Color';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, Language.formError.nameMin)
    .required(Language.formError.nameRequired),
  phone: Yup.string()
    .min(6, Language.formError.phoneMin)
    .max(15, Language.formError.phonemax)
    .required(Language.formError.phoneRequired),
  storeName: Yup.string().required(Language.formError.storeNameRequired),
  houseNo: Yup.string().required('House number is required.'),
  streetAddress: Yup.string().required('Street address is required.'),
  city: Yup.string().required('City is required.'),
  countryId: Yup.string().required('Country is required.'),
  postalCode: Yup.string().required('Postal code is required.'),
});

const EditProfileScreen = () => {
  const {state, dispatch} = useContext(authContext);
  const options = {
    noData: true,
  };
  const [loading, setLoading] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      username: state.user.username,
      email: state.user.email,
      name: state.user.name,
      phone: state.user.user_detail.phone,
      isBanned: false,
      storeName: state.user.user_detail.store_name,
      houseNo: state.user.user_detail.geolocation
        ? state.user.user_detail.geolocation.house_no
        : '',
      streetAddress: state.user.user_detail.geolocation
        ? state.user.user_detail.geolocation.street_address
        : '',
      city: state.user.user_detail.geolocation
        ? state.user.user_detail.geolocation.city
        : '',
      countryId: state.user.user_detail.geolocation
        ? state.user.user_detail.geolocation.country_id.toString()
        : 156,
      postalCode: state.user.user_detail.geolocation
        ? state.user.user_detail.geolocation.postal_code
        : '',
    },
    onSubmit: (values) => {
      const body = {
        username: values.username,
        email: values.email,
        name: values.name,
        phone: values.phone,
        is_banned: values.isBanned,
        store_name: values.storeName,
        house_no: values.houseNo,
        street_address: values.streetAddress,
        city: values.city,
        postal_code: values.postalCode,
        country_id: values.countryId,
      };
      let formData = new FormData();
      if (uploadPhoto) {
        formData.append('avatar', {
          uri: uploadPhoto.uri,
          type: uploadPhoto.type,
          name: uploadPhoto.fileName,
        });
      }
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      setLoading(true);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios
        .post(`api/users/update-vendor/${state.user.id}`, formData, config)
        .then((res) => {
          if (res.status === 200) {
            dispatch({type: 'UPDATE_USER', payload: res.data});
            ToastAndroid.show(
              'Your profile has been updated.',
              ToastAndroid.LONG,
            );
          }
        })
        .catch((err) => {
          err.response && console.log(err.response.data);
          ToastAndroid.show('Error updating your profile.', ToastAndroid.LONG);
        })
        .finally(() => setLoading(false));
    },
    validationSchema,
  });
  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else {
        setUploadPhoto(response);
      }
    });
  };
  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <Appbar theme={{colors: {primary: 'white'}}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Edit profile" />
        <Appbar.Action icon="check" size={30} onPress={formik.handleSubmit} />
      </Appbar>
      <KeyboardAwareScrollView style={styles.keyboardContainer}>
        <Image
          source={
            !uploadPhoto
              ? state.user.avatar_url
                ? {
                    uri: state.user.avatar_url,
                  }
                : Images.defaultAvatar
              : {uri: uploadPhoto.uri}
          }
          style={{height: 200, width: '100%', marginVertical: 16}}
          resizeMode="contain"
        />
        <Button
          icon="camera"
          mode="outlined"
          color={Color.primary}
          style={{marginVertical: 8}}
          onPress={handleChoosePhoto}>
          Choose photo
        </Button>
        <TextInput
          theme={{colors: {primary: Color.primary}}}
          label="Name"
          onChangeText={formik.handleChange('name')}
          value={formik.values.name}
          style={styles.input}
        />
        {formik.touched.name && formik.errors.name && (
          <HelperText type="error">{formik.errors.name}</HelperText>
        )}
        <TextInput
          theme={{colors: {primary: Color.primary}}}
          label="Store Name"
          onChangeText={formik.handleChange('storeName')}
          value={formik.values.storeName}
          style={styles.input}
        />
        {formik.touched.storeName && formik.errors.storeName && (
          <HelperText type="error">{formik.errors.storeName}</HelperText>
        )}
        <TextInput
          theme={{colors: {primary: Color.primary}}}
          label="Phone"
          keyboardType="number-pad"
          onChangeText={formik.handleChange('phone')}
          value={formik.values.phone}
          style={styles.input}
        />
        {formik.touched.phone && formik.errors.phone && (
          <HelperText type="error">{formik.errors.phone}</HelperText>
        )}
        <TextInput
          theme={{colors: {primary: Color.primary}}}
          label="House no."
          onChangeText={formik.handleChange('houseNo')}
          value={formik.values.houseNo}
          style={styles.input}
        />
        {formik.touched.houseNo && formik.errors.houseNo && (
          <HelperText type="error">{formik.errors.houseNo}</HelperText>
        )}
        <TextInput
          theme={{colors: {primary: Color.primary}}}
          label="Street address"
          onChangeText={formik.handleChange('streetAddress')}
          value={formik.values.streetAddress}
          style={styles.input}
        />
        {formik.touched.streetAddress && formik.errors.streetAddress && (
          <HelperText type="error">{formik.errors.streetAddress}</HelperText>
        )}
        <TextInput
          theme={{colors: {primary: Color.primary}}}
          label="City"
          onChangeText={formik.handleChange('city')}
          value={formik.values.city}
          style={styles.input}
        />
        {formik.touched.city && formik.errors.city && (
          <HelperText type="error">{formik.errors.city}</HelperText>
        )}
        <TextInput
          theme={{colors: {primary: Color.primary}}}
          label="Postal code"
          keyboardType="number-pad"
          onChangeText={formik.handleChange('postalCode')}
          value={formik.values.postalCode}
          style={styles.input}
        />
        {formik.touched.postalCode && formik.errors.postalCode && (
          <HelperText type="error">{formik.errors.postalCode}</HelperText>
        )}
        <List.Item
          title="Select country"
          description={
            formik.values.countryId &&
            countries.countries.find((c) => c.key == formik.values.countryId)
              .label
          }
          onPress={() => setShowCountries(true)}
        />
        {formik.touched.countryId && formik.errors.countryId && (
          <HelperText type="error">{formik.errors.countryId}</HelperText>
        )}
        <ModalFilterPicker
          overlayStyle={{flex: 1}}
          listContainerStyle={{flex: 1}}
          cancelContainerStyle={{display: 'none'}}
          visible={showCountries}
          onSelect={(data) => {
            formik.setFieldValue('countryId', data.key);
            setShowCountries(false);
          }}
          onCancel={() => setShowCountries(false)}
          options={countries.countries}
        />
        <View style={{height: 32}} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: 'white',
    // marginBottom: 16,
  },
});

export default EditProfileScreen;
