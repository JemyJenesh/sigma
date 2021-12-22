import {Dimensions, StyleSheet} from 'react-native';
import {Color} from '../../common';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContain: {
    paddingHorizontal: width * 0.1,
    paddingVertical: 32,
    flex: 1,
  },
  loginForm: {
    paddingVertical: 32,
  },
  inputWrap: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
  },
  loginButton: {
    backgroundColor: Color.primary,
    borderRadius: 5,
    elevation: 1,
    paddingVertical: 8,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
