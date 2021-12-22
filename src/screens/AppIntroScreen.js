import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../common';
import AppIntroSlider from 'react-native-app-intro-slider';

const data = [
  {
    title: 'Sigma',
    text: 'Welcome to Sigma Store!',
    image: Images.introWelcome,
    bg: '#59b2ab',
  },
  {
    title: 'High Performance',
    text: 'Saving your value time and buy product with ease',
    image: Images.introCart,
    bg: '#febe29',
  },
];

export default class AppIntroScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.bg,
        }}>
        <SafeAreaView style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.image}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.text}>{item.text}</Text>
        </SafeAreaView>
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  _keyExtractor = (item) => item.title;

  render() {
    return (
      <AppIntroSlider
        keyExtractor={this._keyExtractor}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        renderItem={this._renderItem}
        onDone={this.props.done}
        data={data}
      />
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 96, // Add padding to offset large buttons and pagination in bottom of page
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 64,
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    paddingHorizontal: 32,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
