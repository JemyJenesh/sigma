import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import WebView from 'react-native-webview';
import {Color} from '../common';

const PageScreen = ({page}) => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <View style={{flex: 1}}>
      <Appbar.Header theme={{colors: {primary: 'white'}}}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={page.title} />
      </Appbar.Header>
      <WebView
        startInLoadingState
        renderLoading={() => (
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '100%',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={Color.primary} />
          </View>
        )}
        source={{
          uri: 'https://sigmaautonepal.com/page/' + page.slug.substring(2),
        }}
      />
    </View>
  );
};

export default PageScreen;
